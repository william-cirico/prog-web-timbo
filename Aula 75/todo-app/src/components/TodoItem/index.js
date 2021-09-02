import "./styles.css";
import { MdRemove } from "react-icons/md";

export function TodoItem(props) {
    return (        
        <div className={props.todo.completed ? "todo-item completed" : "todo-item"}>
             <label className="container"> 
                { props.todo.description }                          
                <input type="checkbox" checked={ props.todo.completed } onChange={() => props.completeTodo(props.todo.id)}/>
                <span className="checkmark"></span>
            </label> 
            <button className="remove-button" onClick={() => props.removeTodo(props.todo.id)}><MdRemove /></button>
        </div>
    );
}