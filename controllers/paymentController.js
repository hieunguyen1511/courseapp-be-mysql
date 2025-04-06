const { Course, Enrollment } = require('../models');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createPayment(req, res) {
  const { userId } = req.userData;
  const { courseId } = req.body;

  const course = await Course.findByPk(courseId);
  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }

  const existEnrollment = await Enrollment.findOne({
    where: {
      user_id: userId,
      course_id: courseId,
    },
  });
  if (existEnrollment) {
    return res
      .status(400)
      .json({ error: 'You have already enrolled in this course' });
  }

  const priceInVND = course.price;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    metadata: {
      user_id: userId,
      course_id: courseId,
    },
    amount: priceInVND,
    currency: 'vnd',
  });

  res
    .send({
      clientSecret: paymentIntent.client_secret,
    })
    .status(200);
}

async function processPayment(req, res) {
  const { paymentIntentId } = req.body;
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
    expand: ['payment_method'],
  });

  if (paymentIntent.status !== 'succeeded') {
    return res.status(400).json({ error: 'Payment failed' });
  }

  const { metadata } = paymentIntent;
  const { user_id, course_id } = metadata;

  const existEnrollment = await Enrollment.findOne({
    where: {
      user_id,
      course_id,
    },
  });
  if (existEnrollment) {
    return res.status(200).json({
      message: 'Enrollment had been created',
      enrollment: existEnrollment,
    });
  }

  const enrollment = await Enrollment.create({
    user_id,
    course_id,
  });

  res
    .send({
      message: 'Enrollment created successfully',
      enrollment,
    })
    .status(201);
}

module.exports = {
  createPayment,
  processPayment,
};
