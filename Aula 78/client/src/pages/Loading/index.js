import "./styles.css";
import ReactLoading from "react-loading";

export function Loading() {
    return (
        <div className="modal">
            <ReactLoading type="spin" />
        </div>        
    );        
}