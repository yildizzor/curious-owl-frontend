import {
  faCalendar,
  faMusic,
  faTheaterMasks,
  faBuildingColumns,
  faBook,
  faWheatAlt,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";

export const API_URL = "http://localhost:5005";

export const sidebarMenu = [
  { type: "All Events", icon: faCalendar, link: "/events" },
  { type: "Concerts", icon: faMusic, link: "/concerts" },
  { type: "Theaters", icon: faTheaterMasks, link: "/theaters" },
  { type: "Museums", icon: faBuildingColumns, link: "/museums" },
  { type: "Books", icon: faBook, link: "/books" },
  { type: "Restaurants", icon: faWheatAlt, link: "/restaurants" },
];

export const typeOfEvent = sidebarMenu.slice(1, 6);

export const addEventItem = {
  type: "Add Event",
  icon: faUserEdit,
  link: "/addevent",
};

export const getSidebarMenuItem = (itemType) => {
  return sidebarMenu.filter((elem) => elem.type === itemType)[0];
};
