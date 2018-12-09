// DEPENDENCIES
// Returns a class, which is why Joi constant is in uppercase 
const Joi = require('joi')
// Import the express module and create an Express application, a new app object
const express = require('express');
const app = express();

// MIDDLEWARE
// Adding a piece of middleware (express.json()) to use in the resources pipeline
app.use(express.json());

// OBJECT ARRAY
const courses = [
    { id: 1, name: "Spanish 101" },
    { id: 2, name: "Introduction to Film" },
    { id: 3, name: "Social Psychology" },
    { id: 4, name: "Advanced Criminal Law"}
    { id: 5, name: "Football, Feminism and You"}
];

// 'GET' REQUEST - ROOT
// http://localhost:3000/
app.get('/', (req, res) => {
    res.send('Hello world');
});
// -----------------------------------------//

// 'GET' REQUEST - ALL
// http://localhost:3000/api/courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});
// -----------------------------------------//

// 'GET' REQUEST - SINGLE COURSE
// http://localhost:3000/api/courses/1
app.get('/api/courses/:id', (req, res) => {
    // console.log(res.send(req.params.id));
    // res.send(req.query)
    const course = courses.find(course => {
        console.log('Finding...')
        return course.id === parseInt(req.params.id)
    });

    // Return if no course with matching ID occurs:
    if (!course) res.status(404).send("The course with the given ID was not found.")

    return res.send(course)
});
// -----------------------------------------//

// 'POST' REQUEST - NEW COURSE
// To post a new course into the object array
app.post('/api/courses', (req, res) => {
    // Define a schema for shape of course objects
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema)
    // VALIDATION WITHOUT JOI
    // if (!req.body.name || req.body.name.length < 3) {
    //     res.status(400).send('Name is required and should be a minimum of 3 characters.')
    //     return;
    // }

    // VALIDATION WITH JOI
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }

    // TO POST NEW COURSE ID & NAME
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    // ADD NEW COURSE OBJECT INTO COURSES ARRAY
    courses.push(course);
    res.send(course);
});
// -----------------------------------------//

// 'PUT' REQUEST - UPDATE A COURSE
app.put('/:id', (req, res) => {
    // Lookup the request
    // If not existing, return 404 - Not Found
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    // Validate
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema)
    // If invalid, return 400 - Bad Request
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }
    
    // Update the course
    course.name = req.body.name; 
    // Return the updated course array
    res.send(course);
});
// -----------------------------------------//

// DELETE REQUEST - REMOVE A COURSE
// -----------------------------------------//

// VALIDATION FUNCTION
function validateCourse(course) {
    const schema = {
      name: Joi.string().min(3).required()
    };
  
    return Joi.validate(course, schema);
}
// -----------------------------------------//

// PORT
const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port ${port}...`));
// -----------------------------------------//