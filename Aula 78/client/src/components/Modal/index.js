import "./styles.css";

export function Modal({ children, onClose }) {    
    return (
        <div className="modal">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>⨉</button>
                { children }
            </div>
        </div>
    );
}