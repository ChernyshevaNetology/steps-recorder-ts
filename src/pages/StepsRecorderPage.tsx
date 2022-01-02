import React, { FC, useState } from "react";
import DataPicker from "../components/DataPicker";
import Button from "../components/Button";
import Input from "../components/Input";
import Table from "../components/Table";
import styled from "styled-components";
import { TableData } from "../types";
import { nanoid } from "nanoid";

const Container = styled.div`
  font-family: "Roboto", sans-serif;
  max-width: 600px;
  margin: 50px auto;
  padding-left: 15px;
  padding-right: 15px;
`;

const FormWrapper = styled.form`
  max-width: 400px;
  display: flex;
  justify-content: space-around;
  margin: auto;
`;

const StepsRecorderPage: FC = () => {
  const [date, setDate] = useState<string>("");
  const [steps, setSteps] = useState<string>("");
  const [tableData, setTableData] = useState([
    {
      id: '0',
      date: "2019-08-20",
      steps: '14',
    },
    {
      id: '1',
      date: "2020-07-19",
      steps: '9',
    },
    {
      id: '2',
      date: "2006-06-18",
      steps: '8',
    },
  ]);
  const handleTableData = (newData: TableData[]) => {
     setTableData(newData);
  }

  const hasDate = (data: TableData[], date: string) =>
    data.find((item: TableData) => item.date === date);

  const handleSubmit = () => {
    setDate("");
    setSteps("");
    if (!date || !steps) {
      return;
    }
    if (hasDate(tableData, date)) {
      const newData = tableData.reduce((acc: TableData[], curr: any) => {
        if (curr.date === date) {
          return [
            ...acc,
            {
              ...curr,
              steps: parseInt(curr.steps) + parseInt(steps),
            },
          ];
        }
        return [...acc, curr];
      }, []);
      return setTableData(newData);
    }
    return setTableData([
      ...tableData,
      {
        id: nanoid(),
        date,
        steps,
      },
    ]);
  };

  const handleStepsChange = (value: React.SetStateAction<string>) => {
    setSteps(value);
  };

  const handleDelete = (id: string): void => {
    const newData = tableData.filter((entry) => entry.id !== id);
    setTableData(newData);
  };

  const handleDateInput = ({
    currentTarget: { value },
  }: React.FormEvent<HTMLInputElement>): void => {
    setDate(value);
  };

  const handleStepsInput = ({
    currentTarget: { value },
  }: React.FormEvent<HTMLInputElement>): void => {
    setSteps(value);
  };


  return (
    <Container>
      <FormWrapper onSubmit={handleSubmit}>
        <label htmlFor="date">
          <DataPicker date={date} onInput={handleDateInput} />
        </label>
        <label htmlFor="hours">
          <Input steps={steps} onInput={handleStepsInput} />
        </label>
        <Button value={"ADD"} onSubmit={handleSubmit} />
      </FormWrapper>
      <Table
        date={date}
        steps={steps}
        data={tableData}
        onInput={handleStepsChange}
        onDelete={handleDelete}
        setTableData={handleTableData}
      />
    </Container>
  );
};

export default StepsRecorderPage;
