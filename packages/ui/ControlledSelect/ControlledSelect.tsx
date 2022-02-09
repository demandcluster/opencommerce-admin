import {FC} from "react";
import {Control, Controller} from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Select, {SelectProps} from "@mui/material/Select";
import {FormHelperText} from "@mui/material";

type ControlledSelectProps = {
  name: string
  defaultValue?: string
  label: string
  control: Control<any>
  items: { value: string, label: string }[]
} & SelectProps;

const ControlledSelect: FC<ControlledSelectProps> = (
  {
    name,
    control,
    label,
    defaultValue,
    items,
    ...props
  }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || items[0].value}
      render={({field, fieldState}) => (
        <FormControl fullWidth>
          <FormLabel>{label}</FormLabel>
          <Select
            error={fieldState.invalid}
            {...field}
            {...props}
          >
            {items.map(item => (
              <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
            ))}
          </Select>

          <FormHelperText id={`select-helper-text-${name}`}>
            {fieldState.error ? fieldState.error.message : " "}
          </FormHelperText>
        </FormControl>
      )}
    />
  )
};

export default ControlledSelect;
