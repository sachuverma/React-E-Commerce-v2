import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useCartContext } from "../context/cart_context";
import { useUserContext } from "../context/user_context";

import { formatPrice } from "../utils/helpers";

const CartTotals = () => {
  const { totalAmount, shippingFee } = useCartContext();
  const { myUser, loginWithRedirect } = useUserContext();

  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            subtotal : <span>{formatPrice(totalAmount)}</span>
          </h5>
          <p>
            shipping fee: <span>{formatPrice(shippingFee)}</span>
          </p>
          <hr />
          <h4>
            order total :<span>{formatPrice(totalAmount + shippingFee)}</span>
          </h4>
        </article>
        {myUser ? (
          <Link to="/checkout" className="btn">
            proceed to checkout
          </Link>
        ) : (
          <button type="button" onClick={loginWithRedirect} className="btn">
            login to checkout
          </button>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`;

export default CartTotals;
