import "./App.css";
import NavBar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Signup from "./pages/authPages/Signup";
import Login from "./pages/authPages/Login";
import Profile from "./pages/authPages/Profile";
import Events from "./pages/eventListPages/Events";
import IsPrivate from "./components/common/IsPrivate";
import IsAnon from "./components/common/IsAnon";
import Concerts from "./pages/eventListPages/Concerts";
import OneConcert from "./pages/oneEventPages/OneConcert";
import Theaters from "./pages/eventListPages/Theaters";
import OneTheater from "./pages/oneEventPages/OneTheater";
import Museums from "./pages/eventListPages/Museums";
import OneMuseum from "./pages/oneEventPages/OneMuseum";
import Books from "./pages/eventListPages/Books";
import Restaurants from "./pages/eventListPages/Restaurants";
import AddEvent from "./pages/AddEvent";
import OneRestaurant from "./pages/oneEventPages/OneRestaurant";
import OneBook from "./pages/oneEventPages/OneBook";

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
        <Route path="/theaters/:theaterId" element={<OneTheater />} />
        <Route path="/museums" element={<Museums />} />
        <Route path="/museums/:museumId" element={<OneMuseum />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:bookId" element={<OneBook />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurants/:restaurantId" element={<OneRestaurant />} />
        <Route path="/addevent" element={<AddEvent />} />
      </Routes>
    </>
  );
}

export default App;
