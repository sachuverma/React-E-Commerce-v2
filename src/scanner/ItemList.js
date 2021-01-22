import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BiLinkExternal } from "react-icons/bi";

import { useGlobalContext } from "./context";
import { useFilterContext } from "../context/filter_context";

function ItemList() {
  const { detectedItems } = useGlobalContext();
  const { updateFilterFromScanner } = useFilterContext();

  // const data = [
  //   "person1",
  //   "person2",
  //   "person3",
  //   "person4",
  //   "person5",
  //   // "person6",
  // ];
  let itemsSet = new Set();
  detectedItems.map((items) => itemsSet.add(items.class));
  itemsSet = Array.from(itemsSet);
  itemsSet.sort();
  // console.log(itemsSet);

  return (
    <Wrapper
      className="section"
      style={{
        paddingTop: "20px",
        paddingBottom: "200px",
      }}
    >
      <div className="title">
        <h2>Search for detected items</h2>
        <div className="underline"></div>
      </div>
      <div className="cards">
        {itemsSet.map((item, index) => {
          return (
            <p key={index}>
              <Link
                to="/products"
                onClick={() => updateFilterFromScanner("text", { item })}
              >
                <Card title={item} />
              </Link>
            </p>
          );
        })}
      </div>
    </Wrapper>
  );
}

const Card = ({ title }) => {
  return (
    <div className="card">
      <p>
        {title} <BiLinkExternal />
      </p>
    </div>
  );
};

const Wrapper = styled.section`
  .title {
    padding-top: 50px;
  }
  .cards {
    padding: 70px;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    max-width: 100vw;
  }

  .card {
    background: var(--clr-primary-6);
    color: white;
    padding: 10px 40px;
    margin: 10px;
    border-radius: 0.6em;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25),
      0 8px 16px -8px hsla(0, 0%, 0%, 0.3),
      0 -6px 16px -6px hsla(0, 0%, 0%, 0.03);
    transition: all ease 200ms;

    p {
      font-size: 2rem;
      margin-bottom: 0;
      color: white;
    }
  }

  .card:hover {
    transform: scale(1.03);
    box-shadow: 0 13px 40px -5px hsla(240, 30.1%, 28%, 0.12),
      0 8px 32px -8px hsla(0, 0%, 0%, 0.14),
      0 -6px 32px -6px hsla(0, 0%, 0%, 0.02);
  }

  @media (min-width: 776px) {
    .cards {
      padding: 80px 20vw;
    }
  }
`;

export default ItemList;
