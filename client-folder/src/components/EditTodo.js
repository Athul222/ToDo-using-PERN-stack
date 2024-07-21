import React, {Fragment, useState} from "react";
import axios from "axios";

const EditTodo = (props) => {

    const [description, setDescription] = useState(props.todo.description);

    // Update description funciton
    const updateDescription = async (e) => {
        e.preventDefault();
        try {
            const data = {description};
            const response = await axios.put(`http://localhost:4000/todos/${props.todo.todo_id}`, data)
            setDescription(response.data);
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id${props.todo.todo_id}`}>
            Edit
            </button>

            <div class="modal" id={`id${props.todo.todo_id}`} onClick={() => setDescription(props.todo.description)}>
            <div class="modal-dialog">
                <div class="modal-content">

                <div class="modal-header">
                    <h4 class="modal-title">Edit Todo</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" onClick={() => setDescription(props.todo.description)}></button>
                </div>

                <div class="modal-body">
                    <input type="text" value={description} className="form-control" onChange={(e) => setDescription(e.target.value)} />
                </div> 

                <div class="modal-footer">
                    <button type="button" class="btn btn-warning" data-bs-dismiss="modal" onClick={e => updateDescription(e)}>Edit</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={() => setDescription(props.todo.description)}>Close</button>
                </div>

                </div>
            </div>
            </div>
        </Fragment>
    )
}

export default EditTodo;