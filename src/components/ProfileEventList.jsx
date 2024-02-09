// import { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { API_URL } from "../utils/constants";
// import "./Events.css";
// import { AuthContext } from "../context/auth.context";

// function ProfileEventList(props) {
//   const [events, setEvents] = useState({});
//   const { user } = useContext(AuthContext);

//   console.log(events);
//   const getAllEvents = () => {
//     axios
//       .get(`${API_URL}/api/user/${user._id}/events`)
//       .then((response) => setEvents(response.data))
//       .catch((error) => {
//         if (error.response) {
//           console.log(error.response.data.detail);
//         }
//       });
//   };

//   useEffect(() => getAllEvents(), []);

//   return <ProfileEventList pageName="Added Events" events={events} />;
// }

// export default ProfileEventList;
