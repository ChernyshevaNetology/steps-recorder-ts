import React from "react";
import styled from "styled-components";

const Btn = styled.button`
  width: 80px;
  height: 40px;
  box-sizing: border-box;
  border-radius: 4px;
  outline: 0;
  border: 1px solid #222;
  background: none;
  cursor: pointer;

  &:hover {
    transition: 0.3s ease-in;
    background: #585858;
    color: #fff;
    border: none;
  }
`;

const Button = ({ onSubmit, value }) => {
  return <Btn onClick={onSubmit}>{value}</Btn>;
};

export default Button;
