import "./styles.css";
import React from "react";
import { MdAdd } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

export class TodoForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputTodo: ""
        };
    }

    handleChange = e => {
        this.setState({
            inputTodo: e.target.value,
            error: false
        });
    }

    handleSubmit = e => {
        e.preventDefault();

        const description = this.state.inputTodo;

        if (!description.trim()) {
            return this.setState({ error: true });
        }

        this.props.addTodo(
            { id: uuidv4(), description, completed: false }
        );

        this.setState({ error: false });
    }

    render() {
        const classNameInput = this.state.error ? "todo-input error" : "todo-input";

        return (
            <>
                { this.state.error && <p className="error-text">Você precisa descrever a tarefa</p> }                
                <form onSubmit={this.handleSubmit} className="todo-form">
                    <input
                        className={classNameInput}
                        onChange={this.handleChange}
                        placeholder="Digite uma tarefa" 
                        value={this.state.inputTodo}/>
                    <button className="todo-button"><MdAdd /></button>
                </form>
            </>
        );
    }
}