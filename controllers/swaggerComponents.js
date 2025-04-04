/**
 * @openapi
 * components:
 *   schemas:
 *     Answer:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         question_id:
 *           type: integer
 *         content:
 *           type: string
 *         is_correct:
 *           type: boolean
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *     AnswerInput:
 *       type: object
 *       required: ['question_id', 'content']
 *       properties:
 *         question_id:
 *           type: integer
 *           description: ID of the question this answer belongs to
 *         content:
 *           type: string
 *           description: Content of the answer
 *         is_correct:
 *           type: boolean
 *           description: Whether this answer is correct
 *           default: false
 *     Question:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         lesson_id:
 *           type: integer
 *         content:
 *           type: string
 *         type:
 *           type: string
 *           enum: ['multiple_choice', 'true_false', 'short_answer']
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *     QuestionInput:
 *       type: object
 *       required: ['lesson_id', 'content', 'type']
 *       properties:
 *         lesson_id:
 *           type: integer
 *           description: ID of the lesson this question belongs to
 *         content:
 *           type: string
 *           description: Content of the question
 *         type:
 *           type: string
 *           enum: ['multiple_choice', 'true_false', 'short_answer']
 *           description: Type of the question
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         user_id:
 *           type: integer
 *         lesson_id:
 *           type: integer
 *         content:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *     CommentInput:
 *       type: object
 *       required: ['user_id', 'lesson_id', 'content']
 *       properties:
 *         user_id:
 *           type: integer
 *           description: ID of the user making the comment
 *         lesson_id:
 *           type: integer
 *           description: ID of the lesson being commented on
 *         content:
 *           type: string
 *           description: Content of the comment
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *     CategoryInput:
 *       type: object
 *       required: ['name']
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the category
 *         description:
 *           type: string
 *           description: Description of the category
 *     Course:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         category_id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *     CourseInput:
 *       type: object
 *       required: ['category_id', 'title', 'description', 'price']
 *       properties:
 *         category_id:
 *           type: integer
 *           description: ID of the category this course belongs to
 *         title:
 *           type: string
 *           description: Title of the course
 *         description:
 *           type: string
 *           description: Description of the course
 *         price:
 *           type: number
 *           description: Price of the course
 *     Lesson:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         section_id:
 *           type: integer
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *     LessonInput:
 *       type: object
 *       required: ['section_id', 'title', 'content']
 *       properties:
 *         section_id:
 *           type: integer
 *           description: ID of the section this lesson belongs to
 *         title:
 *           type: string
 *           description: Title of the lesson
 *         content:
 *           type: string
 *           description: Content of the lesson
 *     Section:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         course_id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *     SectionInput:
 *       type: object
 *       required: ['course_id', 'title']
 *       properties:
 *         course_id:
 *           type: integer
 *           description: ID of the course this section belongs to
 *         title:
 *           type: string
 *           description: Title of the section
 *         description:
 *           type: string
 *           description: Description of the section
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *           enum: ['admin', 'user']
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *     UserInput:
 *       type: object
 *       required: ['username', 'email', 'password']
 *       properties:
 *         username:
 *           type: string
 *           description: Username of the user
 *         email:
 *           type: string
 *           description: Email of the user
 *         password:
 *           type: string
 *           description: Password of the user
 *         role:
 *           type: string
 *           enum: ['admin', 'user']
 *           description: Role of the user
 *           default: 'user'
 *     Enrollment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         user_id:
 *           type: integer
 *         course_id:
 *           type: integer
 *         status:
 *           type: string
 *           enum: ['pending', 'active', 'completed']
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *     EnrollmentInput:
 *       type: object
 *       required: ['user_id', 'course_id']
 *       properties:
 *         user_id:
 *           type: integer
 *           description: ID of the user enrolling
 *         course_id:
 *           type: integer
 *           description: ID of the course being enrolled in
 *         status:
 *           type: string
 *           enum: ['pending', 'active', 'completed']
 *           description: Status of the enrollment
 *           default: 'pending'
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         error:
 *           type: string
 */ 