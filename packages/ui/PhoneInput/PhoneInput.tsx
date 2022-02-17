import {ChangeEvent, FC, useState} from "react";
import TextField, {TextFieldProps} from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";

const PhoneSelect = styled(TextField)(() => ({
  minWidth: "3.25rem",
  "& .MuiSelect-select": {
    paddingLeft: "6px",
    paddingTop: "8px"
  },
  "& .MuiSelect-root:before": {
    borderBottom: 0
  },
  "& .MuiInput-root:hover:not(.Mui-disabled):before": {
    borderBottom: 0,
  },
  "& .MuiSelect-root:after": {
    borderBottom: 0
  }
}))

export type Countries = {
  [code: string]: {
    code: string,
    label: string,
    flag: string,
    phoneCode: string
  }
}

export type PhoneInputProps = {
  countries: Countries,
  defaultCountryCode?: string,
  value?: string
} & TextFieldProps;

const PhoneInput: FC<PhoneInputProps> = (
  {
    countries,
    defaultCountryCode = "NL",
    label,
    value,
    name,
    onChange,
    onBlur,
    ...props
  }) => {
  const [activeCountry, setActiveCountry] = useState(countries[defaultCountryCode]);

  const handleCountryChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const newCountry = countries[value || defaultCountryCode];
    const noPrefixNumber = value.replace(activeCountry.phoneCode, "")
    const changeEvent = {
      target: {
        value: newCountry.phoneCode + noPrefixNumber
      }
    } as ChangeEvent<HTMLInputElement>;

    onChange && onChange(changeEvent);

    setActiveCountry(newCountry);
  }

  return (
    <>
      <TextField
        fullWidth
        {...props}
        label={label}
        onBlur={onBlur}
        name={name}
        type="tel"
        value={value.replace(activeCountry.phoneCode, "")}
        onChange={(e) => {
          e.target.value = activeCountry.phoneCode + e.target.value;
          onChange && onChange(e);
        }}
        InputProps={{
          startAdornment: (
            <>
              <PhoneSelect
                select
                id="phone-select"
                variant="standard"
                value={activeCountry.code}
                onChange={handleCountryChange}
              >
                {Object.entries(countries).map(([code, country]) => (
                  <MenuItem key={code} value={code}>
                    {country.flag}
                  </MenuItem>
                ))}
              </PhoneSelect>
              <Box mx={0.5}>{activeCountry.phoneCode}</Box>
            </>
          )
        }}
      />
    </>
  )
};

export default PhoneInput;
