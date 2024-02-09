import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { isLargeWindowSize } from "../../utils/constants";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";

function Sidebar({ items, selectedItem, setSelectedItem, children }) {
  const [collapse, setCollapse] = useState(!isLargeWindowSize());
  console.log(selectedItem);

  const navigate = useNavigate();

  const handleEventFilter = (filterType) => {
    setSelectedItem(filterType);
    const item = items.filter((elem) => elem.type === filterType)[0];

    if (!collapse && item.link) {
      console.log(item.link);
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
    if (isLargeWindowSize()) {
      setCollapse(false);
    } else {
      setCollapse(!collapse);
    }
  };

  return (
    <div className="container-fluid h-100 p-0 pb-5 m-0 static-text">
      <div className="row h-100 m-0">
        <div className="col-lg-3 col-md-8 col-sm-10 col-12 position-relative">
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
                        {collapse && (
                          <FontAwesomeIcon
                            style={{ float: "right" }}
                            icon={faAngleDoubleDown}
                          />
                        )}
                      </li>
                    );
                  })}
              </div>
            </div>
          </nav>
        </div>
        <div className="col-lg-9 col-12">{children}</div>
      </div>
    </div>
  );
}

export default Sidebar;
