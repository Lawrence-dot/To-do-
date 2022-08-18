import React, { useContext, useState, useRef, useEffect } from "react";
import "../../Assets/bootstrap.min.css";
import "./Home.css";
import lightIcon from "../../Assets/icon-sun.svg";
import darkIcon from "../../Assets/icon-moon.svg";
import { ThemeContext } from "../../Container/App";
import Listitem from "./Listitem";
import Sortable from "sortablejs";
import { ListType, EditList } from "../../Interfaces/ListType";

function Home() {
  const [theme, setTheme] = useContext(ThemeContext);
  const [filterList, setFilterlist] = useState<ListType[]>();
  const [filt, setFilt] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>();

  const [list, setList] = useState<ListType[]>([]);
  var length = filt === true ? filterList.length : list.length;

  useEffect(() => {
    fetchLists();
    var sortable;
    var el = document.getElementById("item");
    sortable = Sortable.create(el, {
      animation: 150,
    });
  }, []);

  const fetchLists = async () => {
    const lists: ListType[] = JSON.parse(localStorage.getItem("List"));
    lists && setList(lists);
  };

  const setLists = (arr: ListType[]) => {
    localStorage.setItem("List", JSON.stringify(arr));
  };

  const toggleTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  const addHandler = (e: React.KeyboardEvent | React.MouseEvent) => {
    e.preventDefault();
    let checker: boolean = false;
    if ("key" in e && e.key === "Enter") {
      checker = true;
    } else if (e.type === "click") {
      checker = true;
    } else {
      checker = false;
    }

    if (
      checker === true &&
      inputRef.current?.value !== "" &&
      inputRef.current?.value !== null
    ) {
      let newItem = {
        content: inputRef.current?.value,
        status: "Pending",
        id: "kkkkkk",
      };
      setList([...list, newItem]);
      setLists([...list, newItem]);
      inputRef.current.value = "";
    }
  };

  const filterHandler = (e: React.MouseEvent) => {
    let element = e.target as HTMLParagraphElement;
    let filterClasses = document.getElementsByClassName("filterType");
    for (let i = 0; i < filterClasses.length; i++) {
      const element = filterClasses[i];
      element.classList.remove("active");
    }
    element.classList.add("active");
    let filtered = list.filter((each) => {
      return each.status.includes(`${element.id}`);
    });
    setFilt(element.id === "All" ? false : true);
    setFilterlist(filtered);
  };

  const deleteHandler: EditList = (index) => {
    let listCopy: ListType[] = [...list];
    listCopy.splice(index, 1);
    setList(listCopy);
    setLists(listCopy);
  };

  const clearCompleted = () => {
    let filtered = list.filter((each) => {
      return each.status.includes("Pending");
    });
    setList(filtered);
    setLists(filtered);
  };

  const toggleStatus: EditList = (index) => {
    let listCopy = [...list];
    let status = listCopy[index].status;
    status === "Completed"
      ? (listCopy[index].status = "Pending")
      : (listCopy[index].status = "Completed");
    setList(listCopy);
    setLists(listCopy);
  };

  const lists = filt
    ? filterList.map((list, index) => {
        return (
          <Listitem
            content={list.content}
            key={index}
            status={list.status}
            delete={() => deleteHandler(index)}
            toggleStatus={() => toggleStatus(index)}
          />
        );
      })
    : list.map((list, index) => {
        return (
          <Listitem
            content={list.content}
            key={index}
            status={list.status}
            delete={() => deleteHandler(index)}
            toggleStatus={() => toggleStatus(index)}
          />
        );
      });

  return (
    <div className="Home justify-content-center" id={theme}>
      <div className="background">
        <div
          className="topBack"
          id={theme === "dark" ? "darkImage" : "lightImage"}
        ></div>
        <div className="topColor" id={theme}></div>
      </div>

      <div className="todoContainer justify-content-center">
        <div className="todoHeader d-flex flex-row text-white">
          <div className="todoHeading">
            <h4> TO DO </h4>
          </div>

          <div className="toggleIcon ms-auto">
            <span
              className={
                theme === "dark" ? "show toggleSpan" : "hide toggleSpan"
              }
              onClick={toggleTheme}
            >
              <img src={lightIcon} alt="light" />
            </span>

            <span
              className={
                theme === "dark" ? "hide toggleSpan" : "show toggleSpan"
              }
              onClick={toggleTheme}
            >
              <img src={darkIcon} alt="dark" />
            </span>
          </div>
        </div>

        <div className="todoList">
          <form className="addList d-flex todoBody">
            <input
              ref={inputRef}
              type="text"
              placeholder="Create a new todo..."
              onKeyUp={addHandler}
              className="p-1"
            />

            <button
              onClick={addHandler}
              className="addBtn d-block d-sm-none rounded-right"
            >
              +
            </button>
          </form>

          <div className="todoLists mt-2 todoBody">
            <ul id="item">{lists}</ul>

            <div className="toBottom d-flex row p-3">
              <div className="itemsleft col-6 col-sm-3 order-1 order-sm-1">
                <p>{length} Items Left</p>
              </div>

              <div className="d-flex mt-2 mt-sm-0 filterList justify-content-center col-12 order-3 order-sm-2 col-sm-5 flex-row todoBody">
                <div className="filter">
                  <p
                    className="filterType active mx-2"
                    id="All"
                    onClick={filterHandler}
                  >
                    All
                  </p>
                </div>

                <div>
                  <p
                    className="filterType mx-auto"
                    id="Pending"
                    onClick={filterHandler}
                  >
                    Active
                  </p>
                </div>

                <div>
                  <p
                    className="filterType mx-2"
                    onClick={filterHandler}
                    id="Completed"
                  >
                    Completed
                  </p>
                </div>
              </div>

              <div className="clrComp d-flex justify-content-end col-6 col-sm-4 order-2 order-sm-3">
                <p className="ms-auto" onClick={clearCompleted}>
                  Clear Completed
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom mt-5 mt-sm-3">
          <p
            className={`${
              theme == "dark" ? "text-white" : "text-dark"
            } text-center`}
          >
            Drag and drop to reorder list
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
