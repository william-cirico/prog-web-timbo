import "./styles.css";
import { MdAdd } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import React from "react";

export class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: ""
        }
    }    

    handleChange = e => {
        this.setState({ todo: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();

        this.props.onSubmit({
            id: uuidv4(),
            name: this.state.todo,
            completed: false
        });

        this.setState({ todo: "" });
    }

    render() {
        return (
            <form className="todo-form" onSubmit={this.handleSubmit}>
                <input 
                    className="todo-input"
                    placeholder="Digite uma tarefa" 
                    onChange={this.handleChange}
                    value={this.state.todo} />
                <button className="todo-button" onClick={this.handleSubmit}><MdAdd /></button>
            </form>
        );
    }    
}