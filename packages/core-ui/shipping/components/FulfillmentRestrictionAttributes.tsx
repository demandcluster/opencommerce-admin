import {Control, useFieldArray} from "react-hook-form";
import {FC} from "react";
import {useTranslation} from "react-i18next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Theme} from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import fulfillmentRestrictionAttributePropertyTypes from "../utils/fulfillmentRestrictionAttributePropertyTypes";
import fulfillmentRestrictionAttributeOperators from "../utils/fulfillmentRestrictionAttributeOperators";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";

import ControlledTextField from "ui/ControlledTextField";
import ControlledSelect from "ui/ControlledSelect";
import ListItemAdd from "./common/ListItemAdd";
import {FlatRateFulfillmentRestrictionFieldValues} from "./FulfillmentRestriction";

type FulfillmentRestrictionAttributesProps = {
  name: "itemAttributes";
  control: Control<FlatRateFulfillmentRestrictionFieldValues>;
}

const FulfillmentRestrictionAttributes: FC<FulfillmentRestrictionAttributesProps> = ({name, control}) => {
  const {t} = useTranslation();
  const {fields, append, remove} = useFieldArray({
    control,
    name
  });

  const handleAppendField = () => {
    append({operator: undefined, property: "", propertyType: undefined, value: ""})
  }

  return (
    <Box>
      <Typography color={(theme: Theme) => theme.palette.text.secondary} fontSize={14} ml="6px">
        {t("admin.shipping.flatRateFulfillmentRestriction.itemAttributes.label", "Item attributes")}
      </Typography>
      <List dense sx={{pt: 0}}>
        {fields.length ? (
          fields.map((field, index) => (
            <ListItem key={field.id} disablePadding sx={{py: 0.5}}>
              <Box display="flex" gap={1} alignItems="end">
                <ControlledTextField
                  size="small"
                  control={control}
                  name={`${name}.${index}.property`}
                  label={t("admin.sipping.flatRateFulfillmentRestriction.itemAttributes.property.label", "Property")}
                  hideLabel={index !== 0}
                />
                <ControlledSelect
                  size="small"
                  control={control}
                  name={`${name}.${index}.propertyType`}
                  items={fulfillmentRestrictionAttributePropertyTypes.map((propertyType) => ({
                    value: propertyType.value,
                    label: t(propertyType.label, propertyType.defaultTranslation)
                  }))}
                  label={t("admin.sipping.flatRateFulfillmentRestriction.itemAttributes.propertyType.label", "Property type")}
                  hideLabel={index !== 0}
                />
                <ControlledSelect
                  size="small"
                  control={control}
                  name={`${name}.${index}.operator`}
                  items={fulfillmentRestrictionAttributeOperators.map((operator) => ({
                    value: operator.value,
                    label: t(operator.label, operator.defaultTranslation)
                  }))}
                  label={t("admin.sipping.flatRateFulfillmentRestriction.itemAttributes.operator.label", "Operator")}
                  hideLabel={index !== 0}
                />
                <ControlledTextField
                  size="small"
                  control={control}
                  name={`${name}.${index}.value`}
                  label={t("admin.sipping.flatRateFulfillmentRestriction.itemAttributes.value.label", "Value")}
                  hideLabel={index !== 0}
                />
                <Box pb={0.5}>
                  <IconButton size="small" onClick={() => remove(index)}>
                    <DeleteIcon/>
                  </IconButton>
                </Box>
              </Box>
            </ListItem>
          ))
        ) : (
          <ListItem disabled>
            <ListItemText
              primary={t(`admin.shipping.flatRateFulfillmentRestriction.${name}.empty.label`, "No attributes")}/>
          </ListItem>
        )}
        <ListItemAdd
          onClick={handleAppendField}
          primary={t(`admin.shipping.flatRateFulfillmentRestriction.${name}.add.label`, "New attribute")}
        />
      </List>
    </Box>
  )
};

export default FulfillmentRestrictionAttributes;
