import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { HistoryContent, PageHero, Loading } from "../components";
import firebase from "../firebase";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const historyRef = firebase.database().ref("history");
    historyRef.once("value", (snapshot) => {
      const historys = snapshot.val();

      const historyList = [];
      for (let id in historys) {
        historyList.push({ id, ...historys[id] });
      }
      setHistory(historyList);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }

  if (history.length < 1) {
    return (
      <main>
        <PageHero title="history" />
        <Wrapper className="page">
          <div className="empty">
            <br />
            <br />
            <h2>No purchase history :(</h2> <br />
            <Link to="/products" className="btn">
              continue shopping
            </Link>
          </div>
        </Wrapper>
      </main>
    );
  }

  return (
    <main>
      <PageHero title="history" />
      <Wrapper className="page">
        <HistoryContent history={history} />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
  }
`;

export default HistoryPage;
