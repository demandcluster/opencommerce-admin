import {KeyboardEvent, SyntheticEvent, useCallback, useEffect, useState} from "react";
import {
  FormControl,
  InputBase,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Paper,
  useAutocomplete,
  AutocompleteInputChangeReason
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

type AutocompleteState = {
  inputValue: string,
  first: number,
  offset: number,
}

export type AutocompleteFetchDataHandler = (state: AutocompleteState) => Promise<void>

type PopperAutocompleteProps<T extends Object> = {
  onClose?: () => void
  onFetchData: AutocompleteFetchDataHandler
  options: T[],
  loading: boolean,
  getOptionLabel: (option: T) => string
  isOptionEqualToValue: (option: T, value: T) => boolean
  inputPlaceholder: string
  initialItemsCount?: number
} & (
  {
    multiple: true
    value: T[]
    onValueChange?: (value: T[]) => void
  }
  | {
  multiple?: false
  value?: T | null
  onValueChange?: (value: T | null) => void
})

const PopperAutocomplete = <T extends Object>(
  {
    options,
    loading,
    onValueChange,
    onClose,
    value,
    multiple,
    getOptionLabel,
    isOptionEqualToValue,
    inputPlaceholder,
    onFetchData,
    initialItemsCount = 100
  }: PopperAutocompleteProps<T>
) => {
  const [inputValue, setInputValue] = useState('');
  const [debouncedInputValue, setDebouncedInputValue] = useState('');

  useEffect(() => {
    const delayDebounced = setTimeout(() => {
      setDebouncedInputValue(inputValue)
    }, 200);

    return () => clearTimeout(delayDebounced)
  }, [inputValue])

  const handleInputChange = useCallback((
    event: SyntheticEvent, value: string, reason: AutocompleteInputChangeReason) => {
    if (reason === 'input') {
      setInputValue(value)
    }
  }, [onFetchData])

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions
  } = useAutocomplete({
    id: "autocomplete-select",
    options,
    value,
    isOptionEqualToValue,
    getOptionLabel,
    // Disable built-in autocomplete filtering
    filterOptions: (x) => x,
    multiple: Boolean(multiple),
    onInputChange: handleInputChange,
    onChange: (event, newValue, reason) => {
      if (
        event.type === 'keydown' &&
        (event as KeyboardEvent).key === 'Backspace' &&
        reason === 'removeOption'
      ) {
        return;
      }

      onValueChange && onValueChange(newValue as T[] | T | null)
    },
    onClose: (_, reason) => {
      if (reason === 'escape') {
        onClose && onClose();
      }
    },
    open: true,
    disableCloseOnSelect: true
  });

  useEffect(() => {
    onFetchData({
      inputValue: debouncedInputValue,
      first: initialItemsCount,
      offset: 0
    }).then()
  }, [debouncedInputValue]);

  return (
    <Paper
      elevation={10}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "300px"
      }}
      {...getRootProps()}
    >
      <FormControl sx={{pt: 2, px: 1}}>
        <InputBase
          placeholder={inputPlaceholder}
          sx={{
            backgroundColor: "background.lighten",
            px: 2,
            py: 0.5,
            borderRadius: 0.5
          }}
          size="small"
          inputProps={getInputProps()}
          autoFocus
        />
      </FormControl>
      <List component="ul" {...getListboxProps()}>
        {loading ? (
          <ListItem component="li">
            <ListItemText
              primaryTypographyProps={{color: "text.disabled"}}
              primary={"Loading..."}
            />
          </ListItem>
        ) : (
          (groupedOptions as T[]).map((option, index) => {
            const optionProps = getOptionProps({option, index});
            const selected = !!optionProps["aria-selected"];
            return (
              <ListItemButton
                component="li"
                selected={selected}
                {...optionProps}
              >
                <ListItemText
                  primary={getOptionLabel(option)}
                />
                {selected && <CloseIcon sx={{color: "text.secondary"}} fontSize="small"/>}
              </ListItemButton>
            );
          })
        )}
      </List>
    </Paper>
  );
}

export default PopperAutocomplete
