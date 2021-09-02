import "./styles.css";
import React from "react";
import { TodoForm } from "../TodoForm";
import { TodoItem } from "../TodoItem";

export class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {id: 1, description: "Acordar", completed: true },
                {id: 2, description: "Escovar os dentes", completed: false },
                {id: 3, description: "Ir para o trabalho", completed: false },
            ]
        };
    }

    addTodo = todo => {
        this.setState({
            todos: [
                todo,
                ...this.state.todos                
            ]
        });
    }

    removeTodo = id => {
        const todos = this.state.todos;

        const updatedTodos = todos.filter(todo => todo.id !== id);

        this.setState({ todos: updatedTodos });
    }

    completeTodo = id => {
        const todos = this.state.todos;

        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
              todo.completed = !todo.completed
            }
            return todo;
        });
      
        this.setState({ todos: updatedTodos });
    }

    render() {
        const todos = this.state.todos;

        return (
            <>
                <header>
                    <h1 className="app-title">Todo App</h1>
                </header>
                <TodoForm addTodo={this.addTodo} />                
                { todos.map(todo => <TodoItem 
                    key={todo.id} 
                    todo={todo} 
                    completeTodo={this.completeTodo} 
                    removeTodo={this.removeTodo} />)}                
            </>
        );
    }
}