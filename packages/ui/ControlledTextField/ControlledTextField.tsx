import {FC} from 'react'
import {Control, Controller} from 'react-hook-form'
import InputAdornment from '@mui/material/InputAdornment'
import Error from '@mui/icons-material/Error'
import Tooltip from '@mui/material/Tooltip'
import {FormControl, FormLabel, OutlinedInput, OutlinedInputProps} from "@mui/material";

type ControlledTextFieldProps = OutlinedInputProps & {
  name: string
  defaultValue?: string
  label: string
  control: Control<any>
}

const ControlledTextField: FC<ControlledTextFieldProps> = (
  {
    name,
    defaultValue,
    label,
    control,
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
            fullWidth
          >
            <FormLabel
              htmlFor={`controlled-input-${name}`}
            >{label}</FormLabel>
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
