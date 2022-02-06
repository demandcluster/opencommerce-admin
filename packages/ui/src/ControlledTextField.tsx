import React, {FC} from 'react'
import TextField from '@mui/material/TextField'
import {Control, Controller} from 'react-hook-form'
import {TextFieldProps} from '@mui/material/TextField/TextField'
import {InputAdornment} from '@mui/material'
import Error from '@mui/icons-material/Error'
import Tooltip from '@mui/material/Tooltip'

type ControlledTextFieldProps = TextFieldProps & {
  name: string
  defaultValue: string
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
          <TextField
            label={label}
            error={invalid}
            fullWidth
            InputProps={{
              endAdornment: invalid && (
                <InputAdornment position="end">
                  <Tooltip
                    title={error?.message ?? 'Грешка'}
                    arrow
                    placement="bottom-end"
                  >
                    <Error color="error"/>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
            {...field}
            {...rest}
          />
        )
      }}
    />
  )
}

export default ControlledTextField
