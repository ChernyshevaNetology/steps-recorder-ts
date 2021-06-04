import React, { useState } from "react";
import DataPicker from "../components/DataPicker";
import Button from "../components/Button";
import Input from "../components/Input";
import Table from "../components/Table";
import styled from "styled-components";
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

const StepsRecorderPage = () => {
  const [date, setDate] = useState("");
  const [steps, setSteps] = useState("");
  const [tableData, setTableData] = useState([
    {
      id: 0,
      date: "2019-08-20",
      steps: 14,
    },
    {
      id: 1,
      date: "2020-07-19",
      steps: 9,
    },
    {
      id: 2,
      date: "2006-06-18",
      steps: 8,
    },
  ]);

  const hasDate = (data, date) => data.find((item) => item.date === date);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDate("");
    setSteps("");
    if (hasDate(tableData, date)) {
      const newData = tableData.reduce((acc, curr) => {
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
        date: date,
        steps: steps,
      },
    ]);
  };

  const handleStepsChange = (value) => {
    setSteps(value);
  };

  const handleDelete = (id) => {
    const newData = tableData.filter((entry) => entry.id !== id);
    setTableData(newData);
  };

  const handleDateInput = ({ target: { value } }) => {
    setDate(value);
  };

  const handleStepsInput = ({ target: { value } }) => {
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
        <Button value={"ADD"} />
      </FormWrapper>
      <Table
        date={date}
        steps={steps}
        data={tableData}
        onInput={handleStepsChange}
        onDelete={handleDelete}
        setTableData={setTableData}
      />
    </Container>
  );
};

export default StepsRecorderPage;
