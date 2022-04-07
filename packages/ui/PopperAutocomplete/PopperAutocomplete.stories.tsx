import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import PopperAutocomplete, {FetchDataHandler} from './PopperAutocomplete';

export default {
  title: 'Autocomplete',
  component: PopperAutocomplete,
} as ComponentMeta<typeof PopperAutocomplete>;

export const Default: ComponentStory<typeof PopperAutocomplete> = () => {
  const [options, setOptions] = React.useState<{label: string, value: string}[]>([
    {
      label: 'Option 1',
      value: 'option-1',
    },
    {
      label: 'Option 2',
      value: 'option-2',
    },
    {
      label: 'Option 3',
      value: 'option-3',
    },
  ]);

  const handleFetchData: FetchDataHandler = async ({inputValue}) => {
    console.log(inputValue)
    const newOptions = options
      .filter(option => option.label.includes(inputValue))
    setOptions(newOptions)
  }

  return <PopperAutocomplete
    getOptionLabel={(option) => option.label}
    inputPlaceholder="Search for options"
    isOptionEqualToValue={(option, value) => option.value === value.value}
    loading={false}
    onFetchData={handleFetchData}
    options={options}
    value={null}
  />;
};
