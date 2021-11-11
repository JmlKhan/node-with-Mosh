const express = require('express');
const app = express();
const Joi = require('joi');
const logger = require('./log');
const auth = require('./auth');

app.use(express.json());

app.use(logger);
app.use(auth);

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
];

app.get('/', (req, res) => {
  res.send('hello node js');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id == req.params.id);
  if (!course)
    return res.status(404).send('The course with given id not found');
  res.send(course);
});

//post method
app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body);
  //if invalid, return 400 - Bad request
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

// put method

app.put('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id == req.params.id);
  if (!course)
    return res.status(404).send('The course with given id not found');

  //validate

  const { error } = validateCourse(req.body);
  //if invalid, return 400 - Bad request
  if (error) return res.status(400).send(error.details[0].message);
  //Update course
  course.name = req.body.name;
  //Return the updated course

  res.send(course);
});

//delete method

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id == req.params.id);
  if (!course)
    return res.status(404).send('The course with given id not found');

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}...`));

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
}
