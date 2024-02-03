import "./Profile.css";
import ProfileForm from "../components/ProfileForm";
import Sidebar from "../components/Sidebar";

import { faUserEdit, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ShowProfile from "../components/ShowProfile";

const sidebarMenu = [
  { type: "Show Profile", icon: faUserAlt },
  { type: "Edit Profile", icon: faUserEdit },
];

function Profile(props) {
  const [selectedItem, setSelectedItem] = useState(sidebarMenu[0].type);

  return (
    <>
      <Sidebar
        items={sidebarMenu}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      >
        {selectedItem == sidebarMenu[0].type && <ShowProfile />}
        {selectedItem == sidebarMenu[1].type && <ProfileForm />}
      </Sidebar>
    </>
  );
}

export default Profile;
