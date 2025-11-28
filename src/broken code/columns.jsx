import * as React from "react";
import { EditableCell } from "../Datatable";

const getCellInput = (cell, datatype) => {
  switch (datatype) {
    case "float":
    case "integer":
      return (
        <div className="datatable__editable-cell-input">
          <EditableCell
            {...cell}
            renderInput={(props) => <input type="number" {...props} />}
          />
        </div>
      );
    case "date":
      return (
        <div className="datatable__editable-cell-input">
          <EditableCell
            {...cell}
            renderInput={(props) => <input type="date" autoFocus {...props} />}
          />
        </div>
      );
    case "datetime":
      return (
        <div className="datatable__editable-cell-input">
          <EditableCell
            {...cell}
            renderInput={(props) => (
              <input type="datetime-local" autoFocus {...props} />
            )}
          />
        </div>
      );
    default:
      return (
        <div className="datatable__editable-cell-input">
          <EditableCell
            {...cell}
            renderInput={(props) => <input type="text" {...props} />}
          />
        </div>
      );
  }
};

const constantColumns = (entityType) => [
  {
    id: "entity",
    accessorKey: "entity",
    header: entityType.label,
    cell: ({ row }) => <span>{row.getValue("entity")}</span>,
    enableHiding: false,
  },
];

export const getColumns = (properties, entityType) => {
  const dynamicColumns = properties.map((property) => {
    return {
      id: String(property.property_id),
      accessorKey: property.compositeName,
      header: property.compositeName,
      cell: (cell) => getCellInput(cell, property.datatype),
      meta: {
        editable: true,
      },
    };
  });

  return [...constantColumns(entityType), ...dynamicColumns];
};

const isVisible = (property) => property.default || property.required;

export const getDefaultProperties = (properties = []) =>
  properties.reduce(
    (acc, property) => ({
      ...acc,
      [property.property_id]: isVisible(property),
    }),
    {}
  );
