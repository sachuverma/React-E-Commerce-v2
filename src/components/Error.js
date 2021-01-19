import React from "react";

const Error = ({ message }) => {
  return (
    <div className="section section-center text-center">
      <h2 className="error">error {message}...</h2>
    </div>
  );
};

export default Error;
