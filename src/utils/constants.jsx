import {
  faCalendar,
  faMusic,
  faTheaterMasks,
  faBuildingColumns,
  faBook,
  faWheatAlt,
  faUserEdit,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";

import generalEvent from "../assets/eventPhoto.png";
import logoImg from "../assets/navbar-photos/owl-logo.png";
import wisdomOwlImg from "../assets/navbar-photos/wisdom-owl.png";
import backgroundImage from "../assets/owl1.jpeg";
import avatarImg from "../assets/avatar.png";
import owlImg from "../assets/owl1.jpeg";
import amsterdamImg from "../assets/homepage-photos/amsterdam.jpeg";
import keukenhofImg from "../assets/homepage-photos/keukenhof.jpeg";
import vatikanImg from "../assets/homepage-photos/vatikan.webp";
import veniceImg from "../assets/homepage-photos/venice.jpeg";

export const API_URL = "http://localhost:5005";

export const sidebarMenuProfile = [
  { type: "Profile", icon: faUserAlt },
  { type: "Show Profile", icon: faUserAlt },
  { type: "Edit Profile", icon: faUserEdit },
  { type: "Added Events", icon: faCalendar },
  { type: "Added Concerts", icon: faMusic },
  { type: "Added Theaters", icon: faTheaterMasks },
  { type: "Added Museums", icon: faBuildingColumns },
  { type: "Added Books", icon: faBook },
  { type: "Added Restaurants", icon: faWheatAlt },
];

export const sidebarMenu = [
  { type: "All Events", icon: faCalendar, link: "/events" },
  { type: "Concerts", icon: faMusic, link: "/concerts" },
  { type: "Theaters", icon: faTheaterMasks, link: "/theaters" },
  { type: "Museums", icon: faBuildingColumns, link: "/museums" },
  { type: "Books", icon: faBook, link: "/books" },
  { type: "Restaurants", icon: faWheatAlt, link: "/restaurants" },
];

export const eventTypesList = [
  "concerts",
  "theaters",
  "restaurants",
  "museums",
  "books",
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

export const dateToString = (date, yearOnly = false) => {
  let format = {
    year: "numeric",
  };
  if (!yearOnly) format["month"] = "short";

  return new Date(date).toLocaleDateString("en-us", format);
};

export const isLargeWindowSize = () => window.innerWidth >= 992;

// Image constants
export const defaultEventPhoto = generalEvent;
export const logo = logoImg;
export const wisdomOwl = wisdomOwlImg;
export const backgroundImg = backgroundImage;
export const avatar = avatarImg;
export const owl = owlImg;
export const amsterdam = amsterdamImg;
export const keukenhof = keukenhofImg;
export const vatikan = vatikanImg;
export const venice = veniceImg;
