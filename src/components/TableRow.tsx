import React, { FC, useState } from "react";
import { formatDate } from "../common/helpers";
import { TableData } from "../types";

type TableRowProps = {
  date: string;
  steps: number;
  onDelete: (id: string) => void;
  id: string;
  setTableData: (data: TableData[]) => void;
  data: TableData[];
};

const TableRow: FC<TableRowProps> = ({
  date,
  steps,
  onDelete,
  id,
  setTableData,
  data,
}) => {
  const [edit, setEdit] = useState(false);
  const [editSteps, setEditSteps] = useState(steps);
  const [editDate, setEditDate] = useState(formatDate(date));

  const handleEditChange = ({
    currentTarget: { value },
  }: React.FormEvent<HTMLInputElement>): void => {
    // @ts-ignore
    setEditSteps(value);
  };

  const handleDateChange = ({
    currentTarget: { value },
  }: React.FormEvent<HTMLInputElement>): void => {
    setEditDate(value);
  };

  const handleEdit = () => setEdit(!edit);

  const handleEditSubmit = (id: string) => {
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
