import "./App.css";
import NavBar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Events from "./pages/Events";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import OneConcert from "./pages/OneConcert";
import Concerts from "./pages/Concerts";
import Theaters from "./pages/Theaters";
import Museums from "./pages/Museums";
import Books from "./pages/Books";
import Restaurants from "./pages/Restaurants";
import AddEvent from "./pages/AddEvent";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <IsAnon>
              <Login />
            </IsAnon>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <Signup />
            </IsAnon>
          }
        />

        <Route
          path="/profile"
          element={
            <IsPrivate>
              <Profile />
            </IsPrivate>
          }
        />
        <Route path="/events" element={<Events />} />
        <Route path="/concerts" element={<Concerts />} />
        <Route path="/concerts/:concertId" element={<OneConcert />} />
        <Route path="/theaters" element={<Theaters />} />
        <Route path="/museums" element={<Museums />} />
        <Route path="/books" element={<Books />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/addevent" element={<AddEvent />} />
      </Routes>
    </>
  );
}

export default App;
