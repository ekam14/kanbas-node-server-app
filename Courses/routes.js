import Database from "../Database/index.js";

function CourseRoutes(app) {
    app.get("/api/courses", (req, res) => {
        const courses = Database.courses;
        res.send(courses);
    });

    app.post("/api/courses", (req, res) => {
        const course = {
            ...req.body,
            _id: new Date().getTime().toString()
        };
        Database.courses.push(course);
        res.send(course);
    })

    app.delete("/api/courses/:courseId", (req, res) => {
        const {courseId} = req.params;

        let courses = [];

        for(let course of Database.courses) {
            if(course._id !== courseId) course.push(course);
        }

        Database.courses = courses;

        res.send().status(204);
    })

    app.put("/api/courses/:courseId", (req, res) => {
        const {courseId} = req.params;
        const course = req.body;

        for(let index = 0; index < Database.courses.length; index ++) {
            let currCourse = Database.courses[index];
            if(currCourse._id === courseId) {
                Database.courses[index] = {currCourse, ...course};
            }
        }

        res.send().status(204);
    })

    app.get("/api/courses/:courseId", (req, res) => {
        const {courseId} = req.params;

        for(let course of Database.courses) {
            if(course._id === courseId) return res.send(course);
        }

        return res.send("Course not found!").status(404);
    })
}

export default CourseRoutes;