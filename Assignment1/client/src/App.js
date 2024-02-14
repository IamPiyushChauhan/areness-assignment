import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "./Pages/Registration";
import Singin from "./Pages/Singin";
import Home from "./Pages/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/singup" element={<Registration />} />
          <Route path="/singin" element={<Singin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
