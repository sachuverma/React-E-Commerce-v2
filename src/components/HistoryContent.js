import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useUserContext } from "../context/user_context";

import HistoryColumns from "./HistoryColumns";
import HistoryItem from "./HistoryItem";

const HistoryContent = ({ history }) => {
  const {
    myUser: { name, email },
  } = useUserContext();
  let itemCount = 0;

  return (
    <Wrapper className="section-center">
      <div className="link-container">
        <Link to="/products" className="link-btn">
          continue shopping
        </Link>
      </div>
      <br /> <br />
      <h2>previously purchased items</h2>
      <br /> <br />
      {history.map((item) => {
        const { id, boughtAt, cart, totalPrice, shipping, user } = item;
        if (name + email === user) {
          itemCount++;
          return (
            <div className="section-center" key={id}>
              <div className="center">
                <p className="para">
                  Bought On:{" "}
                  <span className="tag">
                    {boughtAt.substr(0, 10)},{boughtAt.substr(10, 5)}
                  </span>
                </p>
                <p className="para">
                  Total Price: <span className="tag">{totalPrice}</span>
                </p>
                <p className="para">
                  Shipping Charges: <span className="tag">{shipping}</span>
                </p>
              </div>
              <br />
              <HistoryColumns />
              {cart.map((product) => {
                const { id } = product;

                return <HistoryItem key={id} {...product} />;
              })}
              <hr />
              <br /> <br />
            </div>
          );
        }
      })}
      <hr />
      {itemCount ? null : (
        <p style={{ fontSize: "3rem" }}>You have not purchased anything :(</p>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .tag {
    font-size: 1.2rem;
  }
  .para {
    margin-bottom: 0px;
  }
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
  }
`;
export default HistoryContent;
