import "./styles.css";
import moment from "moment";

export function Message({ message, date, self }) {    
    const formattedDate = moment(date).format("DD/MM/YYYY");

    const customClass = self ? "message right" : "message left";
    return (
        <li className={customClass}>
            <p className="message__text">{message}</p>
            <p className="message__date">{formattedDate}</p>
        </li>
    );
}