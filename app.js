import express from "express";
import Hello from "./hello.js";
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./Courses/routes.js";
import ModuleRoutes from "./Modules/routes.js";
import AssignmentRoutes from "./Assignments/route.js";

import "dotenv/config";

const app = express();

app.use(
    cors({
             credentials: true,
             origin: '*'
    })
);

app.use(express.json());

Lab5(app);
Hello(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log("App is listening on port 4000");
});