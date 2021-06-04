import React from "react";
import styled from "styled-components";
import TableRow from "./TableRow";
import { formatDate } from "../common/helpers";

const TableStyles = styled.div`
  max-width: 400px;
  margin: 20px auto;
  border: 1px solid #222;
  border-radius: 10px;

  h2 {
    text-align: center;
    font-size: 1rem;
    font-weight: 300;
  }
`;

const RowStyles = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;

  .date {
    width: 30%;
  }

  .steps {
    width: 30%;
  }

  .edit,
  .remove-btn {
    width: 10%;
  }
`;

const Table = ({ data, onDelete, handleStepsChange, setTableData }) => {
  const sortedData = data.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const dataToRender = sortedData.length ? (
    sortedData.map(({ id, date, steps }) => {
      return (
        <RowStyles key={id}>
          <TableRow
            id={id}
            date={formatDate(date)}
            steps={steps}
            onDelete={onDelete}
            onInput={handleStepsChange}
            setTableData={setTableData}
            data={data}
          />
        </RowStyles>
      );
    })
  ) : (
    <h2>No data to display</h2>
  );

  return <TableStyles>{dataToRender}</TableStyles>;
};

export default Table;
