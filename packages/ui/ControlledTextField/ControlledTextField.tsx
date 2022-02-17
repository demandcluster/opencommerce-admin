import {FC} from 'react'
import {Control, Controller} from 'react-hook-form'
import InputAdornment from '@mui/material/InputAdornment'
import Error from '@mui/icons-material/Error'
import Tooltip from '@mui/material/Tooltip'
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput, {OutlinedInputProps} from "@mui/material/OutlinedInput";

type ControlledTextFieldProps = {
  name: string
  defaultValue?: string
  label: string
  control: Control<any>
  hideLabel?: boolean
} & OutlinedInputProps;

const ControlledTextField: FC<ControlledTextFieldProps> = (
  {
    name,
    defaultValue = "",
    label,
    control,
    hideLabel = false,
    fullWidth = true,
    ...rest
  }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({field, fieldState: {error, invalid}}) => {
        return (
          <FormControl
            error={invalid}
            fullWidth={fullWidth}
          >
            {!hideLabel && (
              <FormLabel
                htmlFor={`controlled-input-${name}`}
              >{label}</FormLabel>
            )}
            <OutlinedInput
              id={`controlled-input-${name}`}
              {...field}
              {...rest}
              endAdornment={invalid && (
                <InputAdornment position="end">
                  <Tooltip
                    title={error?.message ?? 'Error'}
                    arrow
                    placement="bottom-end"
                  >
                    <Error color="error"/>
                  </Tooltip>
                </InputAdornment>
              )}/>
          </FormControl>
        )
      }}
    />
  )
}

export default ControlledTextField
