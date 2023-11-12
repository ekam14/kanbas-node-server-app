import Database from "../Database/index.js";

function AssignmentRoutes(app) {
    app.get("/api/courses/:courseId/assignments", (req, res) => {
        const {courseId} = req.params;

        let assignments = [];
        for(let assignment of Database.assignments) {
            if(assignment.course === courseId) assignments.push(assignment);
        }
        res.send(assignments);
    })

    app.post("/api/courses/:courseId/assignments", (req, res) => {
        const {courseId} = req.params;
        const assignment = req.body;

        const newAssignment = {
            _id: new Date().getTime().toString(),
            ...assignment,
            course: courseId
        };
        Database.assignments.push(newAssignment);

        res.send(newAssignment);
    });

    app.put("/api/assignments/:assignmentId", (req, res) => {
        const {assignmentId} = req.params;

        let assignmentIndex = -1;

        for(let index = 0; index < Database.assignments.length; index ++) {
            let assignment = Database.assignments[index];
            if(assignment._id === assignmentId) {
                assignmentIndex = index;
                break;
            }
        }

        Database.assignments[assignmentIndex] = {
            ...Database.assignments[assignmentIndex],
            ...req.body
        };

        res.send().status(204)
    });

    app.delete("/api/assignments/:assignmentId", (req, res) => {
        const {assignmentId} = req.params;

        let assignments = []

        for(let assignment of Database.assignments) {
            if(assignment._id !== assignmentId) assignments.push(assignment);
        }

        Database.assignments = assignments;

        res.send().status(204);
    })
}

export default AssignmentRoutes;