import {FC} from "react";
import {Control, Controller} from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Select, {SelectProps} from "@mui/material/Select";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";
import NativeSelect, {NativeSelectProps} from "@mui/material/NativeSelect";

type ControlledSelectProps = {
  name: string
  defaultValue?: string
  label: string
  control: Control<any>
  items: { value: string, label: string }[]
  hideLabel?: boolean
} & SelectProps;

const ControlledSelect: FC<ControlledSelectProps> = (
  {
    name,
    control,
    label,
    defaultValue = "",
    items,
    hideLabel = false,
    sx,
    ...props
  }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || items[0].value}
      render={({field, fieldState}) => (
        <FormControl fullWidth sx={sx}>
          {!hideLabel && (
            <FormLabel htmlFor={`controlled-select-${name}`}>{label}</FormLabel>
          )}
          <Select
            id={`controlled-select-${name}`}
            error={fieldState.invalid}
            {...field}
            {...props}
            native={isMobile}
          >
            {items.map(item => (
              isMobile ?
              <option key={item.value} value={item.value}>{item.label}</option> :
              <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  )
};

export default ControlledSelect;
