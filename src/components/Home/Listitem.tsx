import React, { createContext, RefObject, useRef } from "react";
import { Listitem } from "../../Interfaces/Props";
import { SortableContainer } from "react-sortable-hoc";
export const ListContext = createContext<refType>({} as refType);

type refType = RefObject<HTMLInputElement>;

function SortableItem(props: Listitem) {
  const inputRef = useRef<HTMLInputElement>();
  return (
    <ListContext.Provider value={inputRef}>
      <li className="Listitem">
        <div className="d-flex flex-row mx-2 px-2 py-2">
          <div className="checkbox">
            <input
              ref={inputRef}
              className="checkList mr-2"
              type="checkbox"
              name=""
              id=""
              onClick={props.toggleStatus}
              readOnly
              checked={props.status == "Completed" && true}
            />
          </div>

          <p className={props.status === "Completed" ? "complete" : "pending"}>
            {props.content}
          </p>

          <span className="cancel ms-auto" onClick={props.delete}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
              <path
                fillRule="evenodd"
                d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
              />
            </svg>
          </span>
        </div>
      </li>
    </ListContext.Provider>
  );
}

export default SortableContainer(SortableItem);
