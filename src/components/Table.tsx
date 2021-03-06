import React, { FC } from "react";
import styled from "styled-components";
import TableRow from "./TableRow";
import { formatDate } from "../common/helpers";
import { TableData } from "../types";

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

type TableProps = {
  date: string;
  steps: number;
  data: TableData[];
  onDelete: (id: string) => void;
  setTableData: (data: TableData[]) => void;
};

const Table: FC<TableProps> = ({
  date,
  data,
  onDelete,
  setTableData,
}) => {
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
