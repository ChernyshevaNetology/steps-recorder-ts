import React from "react";

const DataPicker = ({ onInput, date }) => (
  <input
    className="input"
    required
    type="date"
    onChange={onInput}
    value={date}
  />
);
export default DataPicker;
