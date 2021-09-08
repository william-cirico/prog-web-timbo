import "./App.css";

import { AuthProvider } from "./contexts/authContext";
import { Routes } from "./routes";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
