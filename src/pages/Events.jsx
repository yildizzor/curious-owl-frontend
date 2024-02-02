import { useState } from "react";
import "./Events.css";

function Event() {
  const [selectedItem, setSelectedItem] = useState("All Events");

  const sidebarMenu = [
    { type: "All Events", icon: "fas fa-tachometer-alt" },
    { type: "Concerts", icon: "fas fa-tachometer-alt" },
    { type: "Theaters", icon: "fas fa-tachometer-alt" },
    { type: "Museums", icon: "fas fa-tachometer-alt" },
    { type: "Books", icon: "fas fa-tachometer-alt" },
    { type: "Restaurants", icon: "fas fa-tachometer-alt" },
  ];

  const handleEventFilter = (filterType) => {
    setSelectedItem(filterType);
  };

  const getClassNames = (type) => {
    let classNames = "list-group-item list-group-item-action py-2 ripple";
    if (selectedItem === type) {
      classNames += " active";
    }

    return classNames;
  };
  return (
    <div>
      <nav
        id="sidebarMenu"
        className="collapse d-lg-block sidebar collapse bg-white"
      >
        <div className="position-sticky">
          <div className="list-group list-group-flush mx-3 mt-4">
            {sidebarMenu.map((element) => {
              return (
                <li
                  key={element.type}
                  className={getClassNames(element.type)}
                  onClick={() => handleEventFilter(element.type)}
                >
                  <i className={element.icon + " fa-fw me-3"}></i>
                  <span>{element.type}</span>
                </li>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Event;
