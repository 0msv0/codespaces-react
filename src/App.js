import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import Home from "./Home";
import RegistrationSearch from "./RegisterationSearch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/all-register" element={<RegistrationSearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
