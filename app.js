const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
require('dotenv').config();

const userRouter = require('./routes/user');
const categoryRouter = require('./routes/category');
const courseRouter = require('./routes/course');
const sectionRouter = require('./routes/section');
const lessonRouter = require('./routes/lesson');
const questionRouter = require('./routes/question');
const answerRouter = require('./routes/answer');
const commentRouter = require('./routes/comment');
const enrollmentRouter = require('./routes/enrollment');

app.use(bodyParser.json());

app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/course', courseRouter);
app.use('/api/section', sectionRouter);
app.use('/api/lesson', lessonRouter);
app.use('/api/question', questionRouter);
app.use('/api/answer', answerRouter);
app.use('/api/comment', commentRouter);
app.use('/api/enrollment', enrollmentRouter);

app.get('/', (req, res) => {
  res.send('Hello .... from course app');
});

module.exports = app;
