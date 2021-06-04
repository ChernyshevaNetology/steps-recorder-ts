import React, { useState } from "react";
import { formatDate } from "../common/helpers";

const TableRow = ({ date, steps, onDelete, id, setTableData, data }) => {
  console.log(date, steps, id);

  const [edit, setEdit] = useState(false);
  const [editSteps, setEditSteps] = useState(steps);
  const [editDate, setEditDate] = useState(formatDate(date));

  const handleEditChange = ({ target: { value } }) => {
    setEditSteps(value);
  };

  const handleDateChange = ({ target: { value } }) => {
    setEditDate(value);
  };

  const handleEdit = () => setEdit(!edit);

  const handleEditSubmit = (id) => {
    const editedData = data.map((item) => {
      if (item.id === id) {
        return {
          id,
          date: editDate,
          steps: editSteps,
        };
      }
      return item;
    });
    setTableData(editedData);
    handleEdit();
  };

  return (
    <>
      {!edit ? (
        <>
          <div className="date">{date}</div>
          <div className="steps">{steps}</div>
          <div onClick={handleEdit} className="edit">
            <i className="fas fa-user-edit" />
          </div>
          <div onClick={() => onDelete(id)} className="remove-btn">
            <i className="fas fa-times" />
          </div>
        </>
      ) : (
        <>
          <input
            style={{ width: "125px" }}
            type="date"
            value={editDate}
            onChange={handleDateChange}
          />
          <input
            style={{ width: "60px" }}
            type="text"
            value={editSteps}
            onChange={handleEditChange}
          />
          <button onClick={() => handleEditSubmit(id)}>save</button>
          <button onClick={handleEdit}>cancel</button>
        </>
      )}
    </>
  );
};

export default TableRow;
