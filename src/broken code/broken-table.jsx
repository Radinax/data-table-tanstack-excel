import * as React from "react";
import { CardActions, CardContent } from "@mui/material";
import { DataTable, useDataTable } from "../DataTable";
import ColumnsToggle from "./columns-toggle";

export default function BrokenTable({
  data,
  columns,
  defaultColumns,
  entityType,
  entities,
}) {
  const [columnVisibility, setColumnVisibility] =
    React.useState(defaultColumns);

  const { table, paste, undo, redo } = useDataTable({
    columns,
    data,
    history: true,
    state: {
      columnVisibility,
    },
    debugAll: true,
    onColumnVisibilityChange: setColumnVisibility,
  });

  const onSubmit = () => {
    console.log(table.getRowModel().rows, entityType, entities);
  };

  console.log("table", table.getRowModel().rows);
  console.log("row 1", table.getRowModel().rows[0].getValue("63"));
  console.log("row 2", table.getRowModel().rows[1].getValue("63"));
  console.log("row 3", table.getRowModel().rows[2].getValue("63"));
  console.log("row 1 orginal", table.getRowModel().rows[0].original["63"]);

  React.useEffect(() => {
    console.log(table);
    console.log("EF: row 1", table.getRowModel().rows[0].getValue("63"));
    console.log(
      "EF: row 1 original",
      table.getRowModel().rows[0].original["63"]
    );
  }, [table.getRowModel().rows[0]]);

  React.useEffect(() => {
    console.log("render");
  }, []);

  return (
    <>
      <CardContent>
        <div className="datatable">
          <ColumnsToggle table={table} defaultColumns={defaultColumns} />
          <DataTable
            table={table}
            allowCellSelection={true}
            allowRangeSelection={true}
            allowHistory={true}
            allowPaste={true}
            paste={paste}
            undo={undo}
            redo={redo}
          />
        </div>
      </CardContent>
      <CardActions>
        <button onClick={onSubmit} type="submit">
          Save
        </button>
      </CardActions>
    </>
  );
}
