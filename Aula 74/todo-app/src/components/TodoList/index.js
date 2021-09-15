import { Todo } from "../Todo";
import "./styles.css";

export function TodoList({ todos, completeTodo, removeTodo }) {
    return (
        <div className="todo-list">
            {
                todos.map(todo => (
                    <Todo key={todo.id} todo={todo} completeTodo={completeTodo} removeTodo={removeTodo} />
                ))
            }
        </div>
    );
}