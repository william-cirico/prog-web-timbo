import React, { useState } from "react";

export const themes = {
    light: {
        backgroundColor: "#fff"
    },
    dark:{
        backgroundColor: "#ddd"
    }
};

export const ThemeContext = React.createContext(themes.light);

export function ThemeProvider({children}) {
    const [ theme, setTheme ] = useState(themes.light);

    function toggleTheme() {
      setTheme(prevTheme => {
        console.log(prevTheme);
        if (prevTheme === themes.dark) {
          return themes.light
        }
        return themes.dark
      });
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}