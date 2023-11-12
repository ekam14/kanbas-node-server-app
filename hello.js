console.log("Hello World");

const Hello = (app) => {
    app.get("/hello",(req, res) => {
        res.send("Life is good");
    })

    app.get("/", (req, res) => {
        res.send("Welcome to the club");
    })
}

export default Hello;