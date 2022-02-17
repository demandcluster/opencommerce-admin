import {FC} from 'react';
import {Control, Controller} from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import Switch, {SwitchProps} from "@mui/material/Switch";

type ControlledSwitchProps = {
  name: string
  defaultValue?: string
  label: string
  control: Control<any>
} & SwitchProps;

const ControlledSwitch: FC<ControlledSwitchProps> = (
  {
    name,
    defaultValue = false,
    label,
    control,
    ...props
  }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({field: {value, ...field}, fieldState: {error}}) => (
        <FormControl>
          <FormGroup>
            <FormControlLabel control={
              <Switch
                checked={value}
                {...field}
                {...props}
              />
            } label={label}/>
          </FormGroup>
          <FormHelperText id={`switch-helper-text-${name}`}>
            {error ? error.message : " "}
          </FormHelperText>
        </FormControl>
      )
      }
    />
  )
};

export default ControlledSwitch;
