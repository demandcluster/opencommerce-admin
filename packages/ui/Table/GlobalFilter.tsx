import { FC, useState, useRef, useCallback, useEffect } from 'react'
import { FilterValue } from 'react-table'
import { FormControl, OutlinedInput } from "@mui/material";

type Props = {
    globalFilter: any
  setGlobalFilter: (filterValue: FilterValue) => void
}

const GlobalFilter: FC<Props> = ({globalFilter, setGlobalFilter}) => {
    const [value, setValue] = useState(globalFilter)
  
    useEffect(() => {
      const delayDebounced = setTimeout(() => {
        setGlobalFilter(value || undefined)
    }, 200);
    
      return () => clearTimeout(delayDebounced)      
    }, [value])
    

    return (
    <FormControl>
        <OutlinedInput
          size="small"
          placeholder='Global filter'
          value={value || ''}
          onChange={e => {
            setValue(e.target.value);
          }}
        />
      </FormControl>
  )
}

export default GlobalFilter