import React, {Fragment, useEffect, useState} from "react";
import axios from "axios";


// components 
import EditTodo from "./EditTodo";

const ListTodos = () => {

    const [todos, setTodos] = useState([]);

    const getTodo = async () => {
        try {
            const response = await axios.get("http://localhost:4000/all-todos");
            setTodos(response.data);
        } catch (err) {
            console.error(err.message)
        }
    }

    const deleteTodo = async (id) => {
        try {
            const headers = {
                "api_key" : "todoApiKey09090",
            }
            const response = await axios.delete(`http://localhost:4000/todos/${id}`, {headers});
            console.log(response.data);
            setTodos(todos.filter((todo) => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getTodo();
    }, []);

    return (
        <Fragment>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => {
                        return (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>
                                <EditTodo todo={todo}/>
                            </td>
                            <td>
                                <button className="btn btn-danger"
                                    onClick={() => deleteTodo(todo.todo_id)}
                                >Delete</button>
                            </td>
                        </tr>
                    )
                    })}
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListTodos;