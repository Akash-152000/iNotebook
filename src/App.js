import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import AuthState from "./context/auth/AuthState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AlertState from "./context/alert/AlertState";
import alertContext from "./context/alert/alertContext";
import { useContext } from "react";

function App() {
  const context = useContext(alertContext)
  const {alert} = context
  return (
    <>
      <Router>
        <AlertState>
        <NoteState>
        <AuthState>
            <Navbar />
            <Alert alert={alert}/>
            <div className="container">
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
              </Routes>
            </div>
        </AuthState>
        </NoteState>
        </AlertState>
      </Router>
    </>
  );
}

export default App;
