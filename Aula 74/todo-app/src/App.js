import './App.css';
import React from "react";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputTodo: "",
      todos: [
        { id: 1, name: "Comprar pão", completed: true },
        { id: 2, name: "Comer pão", completed: false },
        { id: 3, name: "Dormir", completed: false },
      ]
    }
  }

  setInputTodo = text => {
    this.setState({ inputTodo: text });
  }

  addTodo = todo => {
    this.setState(state => ({
      todos: [
        todo,
        ...state.todos        
      ]
    }));
  }

  completeTodo = todoId => {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === todoId) {
        todo.completed = !todo.completed
      }
      return todo;
    });

    this.setState({ todos: updatedTodos });
  }

  removeTodo = todoId => {
    const updatedTodos = this.state.todos.filter(todo => todo.id !== todoId);

    this.setState({ todos: updatedTodos });
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1 className="app-title">Todo App</h1>     
        </header>
        <TodoForm onSubmit={this.addTodo} />
        <TodoList todos={this.state.todos} completeTodo={this.completeTodo} removeTodo={this.removeTodo} />
      </div>
    );
  }  
}

export default App;
