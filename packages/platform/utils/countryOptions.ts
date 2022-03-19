import countryDefinitions from "./countryDefinitions";

const countryOptions: {label: string, value: string}[] = [];

for (const locale in countryDefinitions) {
  if ({}.hasOwnProperty.call(countryDefinitions, locale)) {
    // @ts-ignore
    const country = countryDefinitions[locale];
    countryOptions.push({
      label: country.name,
      value: locale
    });
  }
}

countryOptions.sort((itemA, itemB) => {
  if (itemA.label < itemB.label) {
    return -1;
  }
  if (itemA.label > itemB.label) {
    return 1;
  }
  return 0;
});

export default countryOptions;
