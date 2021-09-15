import "./styles.css";
import { IoMdRemove } from "react-icons/io";

export function Todo({ todo, completeTodo, removeTodo }) {
    return (
        <div className={todo.completed ? "todo-item completed" : "todo-item"}>
            <label className="container"> 
                {todo.name}               
                <input type="checkbox" checked={todo.completed} onChange={() => completeTodo(todo.id)} />
                <span className="checkmark"></span>
            </label>            
            <button className="remove-button" onClick={() => removeTodo(todo.id)}>{<IoMdRemove />}</button>
        </div>
    );
}