import { useState } from "react";
import { ColumnInstance } from "react-table";
import {
    FormControl,
    FormLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    ListItemText
} from "@mui/material";

export const SelectColumnFilter = <T extends object>({column}: { column: ColumnInstance<T> }) => {
    const [selectedFilter, setSelectedFilter] = useState<string | boolean | undefined>(column.filterValue);
  
    const handleChange = ({target: {value}}: SelectChangeEvent<typeof selectedFilter>) => {
      setSelectedFilter(value);
      column.setFilter((value || value === false) ? value : undefined);
    }
  
    return (
      <FormControl sx={{maxWidth: "200px", minWidth: "100px"}}>
        <FormLabel
          id={`filter-selection-${column.filterLabel}-label`}
        >{column.filterLabel}
        </FormLabel>
        <Select
          size="small"
          id={`filter-selection-${column.filterLabel}`}
          labelId={`filter-selection-${column.filterLabel}-label`}
          onChange={handleChange}
          defaultValue={""}
        >
          <MenuItem value={""}>
            <ListItemText primary={"\u00A0"}/>
          </MenuItem>
          {column.filterOptions.map(({label, value}) => (
            <MenuItem key={value} value={value}>
              <ListItemText primary={label}/>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  export default SelectColumnFilter;