import React, {FC} from 'react';
import {Control, Controller} from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Switch,
  SwitchProps
} from "@mui/material";

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
