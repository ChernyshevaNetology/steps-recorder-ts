import React, { FC } from "react";

type DateProps = {
  onInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  date: string;
};

const DataPicker: FC<DateProps> = ({ onInput, date }) => (
  <input
    className="input"
    required
    type="date"
    onChange={onInput}
    value={date}
  />
);
export default DataPicker;
