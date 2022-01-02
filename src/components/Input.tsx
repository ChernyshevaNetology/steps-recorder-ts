import React, { FC } from "react";

type InputProps = {
  steps: number;
  onInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: FC<InputProps> = ({ steps, onInput }) => (
  <input
    value={steps}
    min="0"
    required
    onChange={onInput}
    className="input"
    type="number"
    placeholder="Enter a number"
  />
);

export default Input;
