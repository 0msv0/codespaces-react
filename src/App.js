import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import Home from "./Home";
import UsersSrearch from "./UsersSrearch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/search-user" element={<UsersSrearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
