import React from "react";
import { Link } from "react-router-dom";

import { useGlobalContext } from "./context";
import { useFilterContext } from "../context/filter_context";

function ItemList() {
  const { detectedItems } = useGlobalContext();
  const { updateFilterFromScanner } = useFilterContext();

  let itemsSet = new Set();
  detectedItems.map((items) => itemsSet.add(items.class));
  itemsSet = Array.from(itemsSet);
  itemsSet.sort();
  // console.log(itemsSet);

  return (
    <div
      style={{
        textAlign: "center",
        paddingTop: "20px",
        paddingBottom: "200px",
        textTransform: "capitalize",
      }}
    >
      <h1>this is item list</h1>
      <ul>
        {itemsSet.map((item, index) => {
          return (
            <h1 key={index}>
              item {index + 1}:{" "}
              <Link
                to="/products"
                onClick={() => updateFilterFromScanner("text", { item })}
              >
                {item}
              </Link>
            </h1>
          );
        })}
      </ul>
    </div>
  );
}

export default ItemList;
