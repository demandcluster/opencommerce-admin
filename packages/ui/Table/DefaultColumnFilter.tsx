import { ColumnInstance } from "react-table";
import { FormControl, FormLabel, OutlinedInput } from "@mui/material";

const DefaultColumnFilter = <T extends object>({column}: { column: ColumnInstance<T> }) => {
    return (
      <FormControl>
        <FormLabel
          id={`defaultFilter-${column.filterLabel}-label`}
        >{column.filterLabel}
        </FormLabel>
        <OutlinedInput
          size="small"
          value={column.filterValue || ''}
          onChange={e => {
            column.setFilter(e.target.value || undefined)
          }}
        />
      </FormControl>
    )
  }

  export default DefaultColumnFilter;