import {Control, Controller} from "react-hook-form";
import PhoneInput, {PhoneInputProps} from "../PhoneInput";
import {FC} from "react";

type ControlledPhoneInputProps = {
  name: string
  defaultValue?: string
  label: string
  control: Control<any>
} & PhoneInputProps;

const ControlledPhoneInput: FC<ControlledPhoneInputProps> = (
  {
    control,
    name,
    defaultValue= "",
    label,
    ...props
  }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({
                 field: {ref, ...field},
                 fieldState
               }) => (
        <PhoneInput
          label={label}
          helperText={fieldState.error ? fieldState.error.message : " "}
          error={!!fieldState.error}
          {...field}
          {...props}
        />
      )}
    />
  );
}

export default ControlledPhoneInput;
