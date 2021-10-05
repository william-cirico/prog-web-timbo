import './App.css';
// import { LoginPage } from './pages/LoginPage';
// import { ChatPage } from './pages/ChatPage';
// import { AuthProvider, useAuth } from './contexts/AuthContext';
// import { Routes } from './routes';
import Select from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

function App() {
  return (
    // <AuthProvider>
    //     <Routes />
    // </AuthProvider>
    <Select 
      options={options} 
      isMulti      
    />
  );
}

export default App;
