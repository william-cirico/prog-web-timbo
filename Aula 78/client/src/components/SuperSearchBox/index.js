import "./styles.css";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

export function SuperSearchbox({ users, addUser }) {
    const [text, setText] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
     
    //   const filterList = (e) => {
    //     const updatedList = sourceusers.filter((user) => {
    //       return (
    //         item.continent.toLowerCase().search(e.target.value.toLowerCase()) !== -1
    //       );
    //     });
    //     setFilterusers(updatedList);
    //   };
    useEffect(() => {
        const filteredList = users.filter(user => {                       
            if (text) {
                return user.name.toLowerCase().includes(text) ||
                    user.email.toLowerCase().includes(text);
            }
            return false;            
        });

        setFilteredUsers(filteredList.slice(0, 5));
    }, [text, users]);

    function handleSubmit(e, user) {
        e.preventDefault();

        addUser(user);
        setText("");
    }

    return (        
        <div className="search-box">
            <label>
                <input type="text" onChange={e => setText(e.target.value)} value={text} />
            </label>
            { !!filteredUsers.length && 
                filteredUsers.map(user => (
                    <div key={user.id} className="filtered-data">
                        <div>
                            <p className="filtered-data__name">{user.name}</p>
                            <p className="filtered-data__email">{user.email}</p>                
                        </div>
                        <button 
                            className="button filtered-data__button"
                            onClick={e => handleSubmit(e, user)}
                        ><FaPlus size={22} color="white" /></button>
                    </div>
                ))                
            }                    
        </div>
    );
}