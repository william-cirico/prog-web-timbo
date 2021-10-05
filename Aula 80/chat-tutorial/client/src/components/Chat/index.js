import "./styles.css";
import { FaUserCircle } from "react-icons/fa";
import moment from "moment";

export function Chat({ chatName, lastMessage, date, onClick }) {
    const formattedName =  chatName?.length >= 18 ? chatName?.substring(0, 15) + "..." : chatName;
    const formattedMessage = lastMessage?.length >= 30 ? lastMessage?.substring(0, 27) + "..." : lastMessage;
    const formattedDate = moment(date).format("DD/MM/YYYY");
    return (
        <div className="chat-item" onClick={onClick}>
            <FaUserCircle size={40} />
            <div className="chat-item__user">
                <h2>{formattedName}</h2>
                <p>{formattedMessage}</p>
            </div>
            <p className="chat-item__date">{formattedDate}</p>
        </div>
    );
}