import Express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import cors from "cors";

// database
import db from "../server/database.js";

env.config()
const API_KEY = process.env.TODO_API_KEY; 

const app = Express();
const port = 4000;

app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(Express.json()); // req.body [for easy access when sending raw data]

// post todo
app.post("/add", async (req, res) => {
    console.log("Received body ->", req.body);
    const { description } = req.body;
    console.log("Description -> ", description);
    try {
        const result = await db.query(
            "INSERT INTO todo (description) VALUES ($1)", [description]
        );
        console.log("Data added!");
        res.status(200).send(result.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get all todos
app.get("/all-todos", async (req, res) => {
    try {
        const result = await db.query(
            "SELECT * FROM todo ORDER BY todo_id"
        )
        res.status(200).send(result.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// get a specific todo
app.get("/todos/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await db.query(
            "SELECT description FROM todo WHERE todo_id = $1", [id]
        );
        result.rows == [] ? (res.status(200).send(result.rows)) : (res.status(404).json({error: "todo with given id not found!"}));
    } catch (err) {
        console.error(err.message);
    }
})

// update a todo
app.put("/todos/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    console.log("Received body ->", req.body);
    const { description } = req.body;
    console.log("Description -> ", description);

    try {
        const result = await db.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *", [description, id] 
        );
        console.log(result.rows);
        res.status(200).send(result.rows)
    } catch (err) {
        console.error(err.message);
    }
});

// delete a todo
app.delete("/todos/:id", async (req, res) => {
    const id = req.params.id;
    const key = req.headers.api_key;
    console.log("Api key received -> ", key);

    if (key == API_KEY) {
        try {
            await db.query(
                "DELETE FROM todo WHERE todo_id = $1", [id]
            );
            res.status(202).json({message: "Deleted successfully."})
        } catch (err) {
            console.log(err.message);
        }
    } else {
        console.log("You don't have access!");
        res.status(404).json({message: "Sorry, You don't have access!"})
    }
});


app.listen(port, () => {
    console.log(`Server is running at localhost:${port}`);
})