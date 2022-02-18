import {FC} from 'react';
import {Control, Controller} from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
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
      render={({field: {value, ...field}}) => (
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
        </FormControl>
      )
      }
    />
  )
};

export default ControlledSwitch;
