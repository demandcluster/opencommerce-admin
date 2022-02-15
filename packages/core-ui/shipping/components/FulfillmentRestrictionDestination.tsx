import {FC} from "react";
import {Control, useFieldArray} from "react-hook-form";
import {useTranslation} from "react-i18next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Theme} from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";

import ControlledTextField from "ui/ControlledTextField";
import ListItemAdd from "./common/ListItemAdd";
import {FlatRateFulfillmentRestrictionFieldValues} from "./FulfillmentRestriction";

const FulfillmentRestrictionDestination: FC<{ control: Control<FlatRateFulfillmentRestrictionFieldValues> }> = ({control}) => {
  const {t} = useTranslation();
  const {fields: postalFields, append: postalAppend, remove: postalRemove} = useFieldArray({
    control,
    name: "destination.postal"
  });
  const {fields: regionFields, append: regionAppend, remove: regionRemove} = useFieldArray({
    control,
    name: "destination.region"
  });
  const {fields: countryFields, append: countryAppend, remove: countryRemove} = useFieldArray({
    control,
    name: "destination.country"
  });

  const handleAppendPostalField = () => postalAppend({value: ""})
  const handleAppendRegionField = () => regionAppend({value: ""})
  const handleAppendCountryField = () => countryAppend({value: ""})

  return (
    <Box>
      <Typography color={(theme: Theme) => theme.palette.text.secondary} fontSize={14} ml="6px">
        {t("admin.shipping.flatRateFulfillmentRestriction.destination.label", "Destination")}
      </Typography>
      <Box display="flex" flexDirection="column" gap={1}>
        <List dense sx={{pt: 0, flex: 1}}>
          {postalFields.length ? (
            postalFields.map((field, index) => (
              <ListItem key={field.id} disablePadding sx={{py: 0.5}}>
                <Box display="flex" gap={1} alignItems="end">
                  <ControlledTextField
                    size="small"
                    control={control}
                    name={`destination.postal.${index}.value`}
                    label={t("admin.shipping.flatRateFulfillmentRestriction.destination.postal.label", "Postal")}
                    hideLabel
                  />
                  <Box pb={0.5}>
                    <IconButton size="small" onClick={() => postalRemove(index)}>
                      <DeleteIcon/>
                    </IconButton>
                  </Box>
                </Box>
              </ListItem>
            ))
          ) : (
            <ListItem disabled>
              <ListItemText
                primary={t(`admin.shipping.flatRateFulfillmentRestriction.destination.postal.empty.label`, "No postal codes")}/>
            </ListItem>
          )}
          <ListItemAdd
            onClick={handleAppendPostalField}
            primary={t(`admin.shipping.flatRateFulfillmentRestriction.destination.postal.add.label`, "Add postal")}
          />
        </List>
        <List dense sx={{pt: 0, flex: 1}}>
          {regionFields.length ? (
            regionFields.map((field, index) => (
              <ListItem key={field.id} disablePadding sx={{py: 0.5}}>
                <Box display="flex" gap={1} alignItems="end">
                  <ControlledTextField
                    size="small"
                    control={control}
                    name={`destination.region.${index}.value`}
                    label={t("admin.shipping.flatRateFulfillmentRestriction.destination.region.label", "Region")}
                    hideLabel
                  />
                  <Box pb={0.5}>
                    <IconButton size="small" onClick={() => regionRemove(index)}>
                      <DeleteIcon/>
                    </IconButton>
                  </Box>
                </Box>
              </ListItem>
            ))
          ) : (
            <ListItem disabled>
              <ListItemText
                primary={t(`admin.shipping.flatRateFulfillmentRestriction.destination.region.empty.label`, "No regions")}/>
            </ListItem>
          )}
          <ListItemAdd
            onClick={handleAppendRegionField}
            primary={t(`admin.shipping.flatRateFulfillmentRestriction.destination.region.add.label`, "Add region")}
          />
        </List>
        <List dense sx={{pt: 0, flex: 1}}>
          {countryFields.length ? (
            countryFields.map((field, index) => (
              <ListItem key={field.id} disablePadding sx={{py: 0.5}}>
                <Box display="flex" gap={1} alignItems="end">
                  <ControlledTextField
                    size="small"
                    control={control}
                    name={`destination.country.${index}.value`}
                    label={t("admin.shipping.flatRateFulfillmentRestriction.destination.country.label", "Country")}
                    hideLabel
                  />
                  <Box pb={0.5}>
                    <IconButton size="small" onClick={() => countryRemove(index)}>
                      <DeleteIcon/>
                    </IconButton>
                  </Box>
                </Box>
              </ListItem>
            ))
          ) : (
            <ListItem disabled>
              <ListItemText
                primary={t(`admin.shipping.flatRateFulfillmentRestriction.destination.country.empty.label`, "No countries")}/>
            </ListItem>
          )}
          <ListItemAdd
            onClick={handleAppendCountryField}
            primary={t(`admin.shipping.flatRateFulfillmentRestriction.destination.country.add.label`, "Add country")}
          />
        </List>
      </Box>
    </Box>
  )
};

export default FulfillmentRestrictionDestination;
