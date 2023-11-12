import Database from "../Database/index.js";

function ModuleRoutes(app) {
    app.get("/api/courses/:courseId/modules", (req, res) => {
        const {courseId} = req.params;

        let modules = [];
        for(let module of Database.modules) {
            if(module.course === courseId) modules.push(module);
        }
        res.send(modules);
    });

    app.post("/api/courses/:courseId/modules", (req, res) => {
        const {courseId} = req.params;
        const module = req.body;

        const newModule = {
            _id: new Date().getTime().toString(),
            ...module,
            course: courseId
        };
        Database.modules.push(newModule);

        res.send(newModule);
    });

    app.put("/api/modules/:moduleId", (req, res) => {
        const {moduleId} = req.params;

        let moduleIndex = -1;

        for(let index = 0; index < Database.modules.length; index ++) {
            let module = Database.modules[index];
            if(module._id === moduleId) {
                moduleIndex = index;
                break;
            }
        }

        Database.modules[moduleIndex] = {
            ...Database.modules[moduleIndex],
            ...req.body
        };

        res.send().status(204)
    });

    app.delete("/api/modules/:moduleId", (req, res) => {
        const {moduleId} = req.params;

        let modules = []

        for(let module of Database.modules) {
            if(module._id !== moduleId) modules.push(module);
        }

        Database.modules = modules;

        res.send().status(204);
    });

}

export default ModuleRoutes;