import React, { createContext , useState, useEffect , useContext } from "react";

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [users , setUsers] = useState([]);
    const [currentContextUser , setCurrentContextUser] = useState('');


    useEffect(() => {
        fetch("/auth")
          .then((res) => {
            if (res.ok) {
              res.json().then((user) => setCurrentContextUser(user));
            }
          });
      }, [])

      useEffect(() => {
        fetch("/users")
          .then((r) => r.json())
          .then((data) => {
            setUsers(data);
          });
      }, []);

      return (
        <AppContext.Provider
        value={{
            users,
            setUsers,
            currentContextUser,
            setCurrentContextUser
        }}
        >
            {props.children}
        </AppContext.Provider>
      )
}
