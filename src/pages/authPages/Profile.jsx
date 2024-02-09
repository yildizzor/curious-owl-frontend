import "./Profile.css";
import axios from "axios";
import ProfileForm from "../../components/user/ProfileForm";
import Sidebar from "../../components/common/Sidebar";
import { useContext, useEffect, useState } from "react";
import ShowProfile from "../../components/user/ShowProfile";
import { sidebarMenuProfile } from "../../utils/constants";
import { AuthContext } from "../../context/auth.context";
import { API_URL } from "../../utils/constants";
import EventList from "../../components/EventList";
import AllEventList from "../../components/AllEventList";

function Profile(props) {
  const [selectedItem, setSelectedItem] = useState(sidebarMenuProfile[0].type);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [isAxiosInProgress, setIsAxiosInProgress] = useState(true);

  const { user, getToken } = useContext(AuthContext);

  const eventOfUser = () => {
    console.log("eventOfUser");
    setIsAxiosInProgress(true);
    axios
      .get(`${API_URL}/api/user/${user._id}/events`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })

      .then((response) => {
        console.log(response.data);
        setEvents(response.data);
      })
      .catch((error) => {
        if (error.response) {
          setError("Events can't be retrieved.");
          console.log(error.response.data);
        }
      })
      .finally(() => setIsAxiosInProgress(false));
  };

  useEffect(() => eventOfUser(), []);

  return (
    <>
      <Sidebar
        items={sidebarMenuProfile}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      >
        {selectedItem == sidebarMenuProfile[1].type && <ShowProfile />}
        {selectedItem == sidebarMenuProfile[2].type && <ProfileForm />}
        {selectedItem == sidebarMenuProfile[3].type && (
          <AllEventList events={events} isLoading={isAxiosInProgress} />
        )}
        {selectedItem == sidebarMenuProfile[4].type && (
          <EventList
            events={events["concerts"]}
            eventType={"concerts"}
            isLoading={isAxiosInProgress}
          />
        )}
        {selectedItem == sidebarMenuProfile[5].type && (
          <EventList
            events={events["theaters"]}
            eventType={"theaters"}
            isLoading={isAxiosInProgress}
          />
        )}
        {selectedItem == sidebarMenuProfile[6].type && (
          <EventList
            events={events["museums"]}
            eventType={"museums"}
            isLoading={isAxiosInProgress}
          />
        )}
        {selectedItem == sidebarMenuProfile[7].type && (
          <EventList
            events={events["books"]}
            eventType={"books"}
            isLoading={isAxiosInProgress}
          />
        )}
        {selectedItem == sidebarMenuProfile[8].type && (
          <EventList
            events={events["restaurants"]}
            eventType={"restaurants"}
            isLoading={isAxiosInProgress}
          />
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </Sidebar>
    </>
  );
}

export default Profile;
