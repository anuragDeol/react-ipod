import { useEffect, useState } from "react";
import "./App.css";
import "./components/screen.css";
import Buttons from "./components/Buttons";
import zingtouch from "zingtouch";

let index = 0,
  range = 0,
  visibility = true,
  selectItem;

function App() {
  const [list, setList] = useState([
    { listItem: "Songs", state: true, id: 0 },
    { listItem: "Workout", state: false, id: 1 },
    { listItem: "Playlist", state: false, id: 2 },
    { listItem: "Games", state: false, id: 3 },
    { listItem: "Spiritual", state: false, id: 4 },
  ]);

  const [activeItem, setActiveItem] = useState([]);

  useEffect(() => {
    let buttonWheel = document.getElementById("ipod-button-wheel");
    let activeRegion = zingtouch.Region(buttonWheel);
    activeRegion.bind(buttonWheel, "rotate", function (event) {
      range += Math.floor(event.detail.distanceFromLast);

      if (range > 70) {
        setList((prevList) => {
          return prevList.map((item) => {
            if (item.id == index) {
              return { ...item, state: true };
            } else {
              return { ...item, state: false };
            }
          });
        });
        index++;
        range = 0;

        if (index === 5) {
          index = 0;
        }
      } else if (range < -100) {
        index--;

        if (index < 0) {
          index = 4;
        }
        setList((prevList) => {
          return prevList.map((item) => {
            if (item.id == index) {
              return { ...item, state: true };
            } else {
              return { ...item, state: false };
            }
          });
        });
        range = 0;
      }
    });
  }, []);

  const handleSelect = () => {
    selectItem = list.filter((item) => item.state === true);
    const title = selectItem[0].listItem;

    if (title === "Songs") {
      setActiveItem({
        ...selectItem,
      });
    } else if (title === "Spiritual") {
      setActiveItem({
        ...selectItem,
      });
    } else if (title === "Workout") {
      setActiveItem({
        ...selectItem,
      });
    } else if (title === "Games") {
      setActiveItem({
        ...selectItem,
      });
    } else if (title === "Playlist") {
      setActiveItem({
        ...selectItem,
      });
    }

    visibility = false;
  };

  const handleMenu = () => {
    visibility = true;
    setActiveItem([]);
  };

  return (
    <div className="App">
      <div className="screen">
        {/* SECTION:: side-menu */}
        <div
          style={!visibility ? { display: "none" } : {}}
          className="side-menu"
        >
          {list.map((item) => (
            <li key={item.id} className={item.state ? "active" : ""}>
              {item.listItem}
            </li>
          ))}
        </div>

        {/* SECTION:: display */}
        <div className="display">
          <h2>{visibility ? "" : activeItem[0].listItem}</h2>
          {activeItem.src && <img src={visibility ? "" : activeItem.src} />}
        </div>
      </div>

      {/* Button */}
      <Buttons handleSelect={handleSelect} handleMenu={handleMenu} />
    </div>
  );
}

export default App;
