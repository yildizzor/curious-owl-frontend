import Sidebar from "./common/Sidebar";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { addEventItem, sidebarMenu } from "../utils/constants";

function EventSidebar({ children, pageName }) {
  const [selectedItem, setSelectedItem] = useState(
    pageName || sidebarMenu[0].type
  );
  const [sidebarMenuItems, setSidebarMenuItems] = useState(sidebarMenu);

  const { isLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    if (isLoggedIn) {
      setSidebarMenuItems([...sidebarMenu, addEventItem]);
    }
  }, [isLoggedIn]);

  return (
    <>
      <Sidebar
        items={sidebarMenuItems}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      >
        {children}
      </Sidebar>
    </>
  );
}

export default EventSidebar;
