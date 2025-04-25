import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from "./registerForm/registerForm";
import LoginForm from "./LoginForm/LoginForm";
function App() {
  return <>
    <Routes>
    <Route path="/register" element={<RegistrationForm />} />
    <Route path="/login" element={<LoginForm />} />
    </Routes>
  
  </>;
}

export default App;
