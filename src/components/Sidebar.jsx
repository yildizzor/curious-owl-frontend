import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

function Sidebar({ items, selectedItem, setSelectedItem, children }) {
  const [collapse, setCollapse] = useState(false);

  const navigate = useNavigate();

  const handleEventFilter = (filterType) => {
    setSelectedItem(filterType);
    const item = items.filter((elem) => elem.type === filterType)[0];

    if (!collapse && item.link) {
      console.log("item.link");
      navigate(item.link);
    }
  };

  const getClassNames = (type) => {
    let classNames = "list-group-item list-group-item-action py-2 ripple";

    if (selectedItem === type) {
      classNames += " active";
    }

    return classNames;
  };

  const handleSideBarMenu = (event) => {
    event.stopPropagation();
    if (window.innerWidth >= 992) {
      setCollapse(false);
    } else {
      setCollapse(!collapse);
    }
  };

  return (
    <div className="container-fluid h-100 p-0">
      <div className="row h-100">
        <div className="col-lg-3 col-12 position-relative">
          <nav className="sidebar">
            <div className={"position-sticky"} onClick={handleSideBarMenu}>
              <div className="list-group list-group-flush mx-3 mt-4">
                {items
                  .filter((elem) =>
                    collapse ? elem.type === selectedItem : true
                  )
                  .map((element) => {
                    return (
                      <li
                        key={element.type}
                        className={getClassNames(element.type)}
                        onClick={() => handleEventFilter(element.type)}
                      >
                        <FontAwesomeIcon icon={element.icon} className="mr-5" />
                        <span> {element.type}</span>
                      </li>
                    );
                  })}
              </div>
            </div>
          </nav>
        </div>
        <div className="col-md-9">{children}</div>
      </div>
    </div>
  );
}

export default Sidebar;
