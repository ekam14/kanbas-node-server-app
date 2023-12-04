import session from "express-session";
import express from "express";
import mongoose from "mongoose";

import Hello from "./hello.js";
import Lab5 from "./Lab5.js";
import cors from "cors";

import UserRoutes from "./users/routes.js";
import CourseRoutes from "./Courses/routes.js";
import ModuleRoutes from "./Modules/routes.js";
import AssignmentRoutes from "./Assignments/route.js";

import "dotenv/config";

mongoose.connect("mongodb://127.0.0.1:27017/kanbas");

const app = express();

app.use(
    cors({
         credentials: true,
         origin: process.env.FRONTEND_URL
    })
);

const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}

app.use(
    session(sessionOptions)
);

app.use(express.json());

Lab5(app);
Hello(app);

CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
UserRoutes(app);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log("App is listening on port 4000");
});