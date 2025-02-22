import React from "react";
import DynamicTable from "./table/DynamicTable";
import tableData from "./config/tableData.json";

const App = () => {
  return (
    <div style={{ padding: "34px" }}>
      <DynamicTable data={tableData.data} />
    </div>
  );
};

export default App;
