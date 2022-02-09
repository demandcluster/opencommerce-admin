import {Control, Controller} from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import TextField, {TextFieldProps} from "@mui/material/TextField";
import {FC} from "react";

type ControlledSelectProps = {
  name: string
  defaultValue?: string
  label: string
  control: Control<any>
  items: {value: string, label: string}[]
} & TextFieldProps;

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
        <TextField
          fullWidth
          select
          label={label}
          error={fieldState.invalid}
          helperText={fieldState.error ? fieldState.error.message : " "}
          {...field}
          {...props}
        >
          {items.map(item => (
            <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
          ))}
        </TextField>
      )}
    />
  )
};

export default ControlledSelect;
