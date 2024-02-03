import {
  faCalendar,
  faMusic,
  faTheaterMasks,
  faBuildingColumns,
  faBook,
  faWheatAlt,
} from "@fortawesome/free-solid-svg-icons";

import "./Events.css";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const sidebarMenu = [
  { type: "All Events", icon: faCalendar },
  { type: "Concerts", icon: faMusic },
  { type: "Theaters", icon: faTheaterMasks },
  { type: "Museums", icon: faBuildingColumns },
  { type: "Books", icon: faBook },
  { type: "Restaurants", icon: faWheatAlt },
];

function Event() {
  const [selectedItem, setSelectedItem] = useState(sidebarMenu[0].type);

  return (
    <Sidebar
      items={sidebarMenu}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
    />
  );
}

export default Event;
