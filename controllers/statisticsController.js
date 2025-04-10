const Validator = require('fastest-validator');
const { resource } = require('../app');
const models = require('../models');
const { Op } = require('sequelize');

async function getAdminStats(req, res) {
  try {
    const [totalCourses, totalUsers, totalEnrollments, totalRevenue] =
      await Promise.all([
        models.Course.count(),
        models.User.count(),
        models.Enrollment.count(),
        models.Enrollment.sum('price'),
      ]);

    const formattedCategoryStats = await models.Category.findAll().then(
      async (categories) => {
        return Promise.all(
          categories.map(async (category) => {
            const courseIds = await models.Course.findAll({
              where: { category_id: category.id },
              attributes: ['id'],
              raw: true,
            });

            const courseIdList = courseIds.map((c) => c.id);

            const count = courseIdList.length;
            const revenue = await models.Enrollment.sum('price', {
              where: { course_id: { [Op.in]: courseIdList } },
            });

            return {
              name: category.name,
              count,
              revenue: revenue || 0,
            };
          }),
        );
      },
    );

    return res.status(200).json({
      totalCourses,
      totalUsers,
      totalEnrollments,
      totalRevenue,
      categoryStats: formattedCategoryStats,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Error fetching stats', error: error.message });
  }
}

async function getTimeRangeStats(req, res) {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Thiếu startDate hoặc endDate' });
    }

    const whereClause = {
      createdAt: {
        [Op.gte]: new Date(startDate),
        [Op.lte]: new Date(endDate),
      },
    };

    const [enrollments, users, revenue] = await Promise.all([
      models.Enrollment.count({ where: whereClause }),
      models.User.count({ where: whereClause }),
      models.Enrollment.sum('price', { where: whereClause }),
    ]);

    const stats = {
      enrollments,
      users,
      revenue: revenue || 0,
    };

    return res.status(200).json(stats);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Lỗi khi lấy thống kê theo khoảng thời gian',
      error: error.message,
    });
  }
}

module.exports = {
  getAdminStats,
  getTimeRangeStats,
};
