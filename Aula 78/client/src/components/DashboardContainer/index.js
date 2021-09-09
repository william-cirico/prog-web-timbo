import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function DashboardContainer({title, children}) {
    const { signOut } = useAuth();
    const history = useHistory();

    function handleClick() {
        signOut();
        history.push("/");
    }

    return (
      <>
        <h1>{title}</h1>
        <button onClick={handleClick}>SignOut</button>
        {children}
      </>
    )
}