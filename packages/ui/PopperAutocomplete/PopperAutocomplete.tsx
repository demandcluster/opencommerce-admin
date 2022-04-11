import {KeyboardEvent, SyntheticEvent, useCallback, useEffect, useState} from "react";
import {
  CircularProgress,
  FormControl,
  FilledInput,
  Paper,
  AutocompleteInputChangeReason, useAutocomplete, Box
} from "@mui/material";
import InfiniteList from "../InfiniteList";

type AutocompleteState = {
  inputValue: string,
  first: number,
  offset: number,
  mode: "set" | "append"
}

export type AutocompleteFetchDataHandler = (state: AutocompleteState) => Promise<void>

type PopperAutocompleteProps<T extends Object> = {
  onClose?: () => void
  onFetchData: AutocompleteFetchDataHandler,
  options: T[],
  loading: boolean,
  getOptionLabel: (option: T) => string
  isOptionEqualToValue: (option: T, value: T) => boolean
  inputPlaceholder: string
  initialItemsCount?: number
  hasMore?: boolean
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
    initialItemsCount = 20,
    hasMore = false,
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
    id: "autocomplete-popper",
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
      // @ts-ignore
      onValueChange && onValueChange(newValue)
    },
    onClose: (_, reason) => {
      if (reason === 'escape') {
        onClose && onClose();
      }
    },
    open: true,
    disableCloseOnSelect: true
  });

  const handleLoadMore = useCallback((startIndex: number, endIndex: number) => {
    return onFetchData({
      inputValue,
      first: options.length,
      offset: options.length,
      mode: 'append'
    })
  }, [onFetchData, inputValue, options.length])

  useEffect(() => {
    onFetchData({
      inputValue: debouncedInputValue,
      first: initialItemsCount,
      offset: 0,
      mode: 'set'
    }).then()
  }, [onFetchData, debouncedInputValue]);

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
      <FormControl sx={{pt: 2, px: 1, pb: 1}}>
        <FilledInput
          placeholder={inputPlaceholder}
          size="small"
          inputProps={getInputProps()}
          autoFocus
          endAdornment={ loading && (
            <Box pt={1}><CircularProgress color="inherit" size={20} /></Box>
          )}
        />
      </FormControl>
      <InfiniteList
        items={groupedOptions as T[]}
        getItemProps={({ item, index }) =>
          getOptionProps({ option: item, index })
        }
        getItemLabel={getOptionLabel}
        hasMoreItems={hasMore}
        areNextItemsLoading={loading}
        loadMoreItems={handleLoadMore}
        listProps={getListboxProps()}
      />
    </Paper>
  );
}

export default PopperAutocomplete
