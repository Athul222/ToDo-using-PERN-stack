import React, { Fragment, useState } from "react";
import axios from "axios";

const InputTodo = () => {

    const [description, setDescription] = useState("");

    const handleChange = (event) => {
        setDescription(event.target.value);
    }

    const onSubmitForm = async (event) => {
        event.preventDefault();
        try {
            const data = { description };
            const response = await axios.post("http://localhost:4000/add", data);
            console.log(response);
            window.location = "/"; // to refresh the page
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center mt-5">Pern Todo List</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input name="description" type="text" className="form-control" value={description} onChange={handleChange}/>
                <button type="submit" className="btn btn-success">Add</button>
            </form>
        </Fragment>
       
    )
}

export default InputTodo;