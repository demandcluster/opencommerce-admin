import { useState } from "react";
import { ColumnInstance } from "react-table";
import {
    FormControl,
    FormLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Checkbox,
    ListItemText
} from "@mui/material";

export const MultipleSelectColumnFilter = <T extends object>({ column }: { column: ColumnInstance<T> }) => {
    const [selectedFilters, setSelectedFilters] = useState<string[]>(column.filterValue || []);

    const handleChange = ({ target: { value } }: SelectChangeEvent<typeof selectedFilters>) => {
        const newFilters = typeof value === 'string' ? value.split(',') : value;
        setSelectedFilters(newFilters);
        column.setFilter(newFilters.length ? newFilters : undefined);
    }

    return (
        <FormControl fullWidth sx={{ maxWidth: "200px" }}>
            <FormLabel
                id={`filter-selection-${column.filterLabel}-label`}
            >{column.filterLabel}
            </FormLabel>
            <Select
                multiple
                size="small"
                id={`filter-selection-${column.filterLabel}`}
                labelId={`filter-selection-${column.filterLabel}-label`}
                value={selectedFilters}
                onChange={handleChange}
                renderValue={(selected) => (
                    <span>{selected.join(", ")}</span>
                )}
            >
                {column.filterOptions.map(({ label, value }) => (
                    <MenuItem key={value} value={value}>
                        <Checkbox checked={selectedFilters.includes(value)} />
                        <ListItemText primary={label} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default MultipleSelectColumnFilter;