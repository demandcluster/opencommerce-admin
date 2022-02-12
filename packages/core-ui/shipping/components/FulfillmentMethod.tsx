import {FC, useEffect, useMemo} from "react";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import LoadingButton from '@mui/lab/LoadingButton';
import {useSnackbar} from "notistack";

import ControlledTextField from "ui/ControlledTextField"
import useShopId from "platform/hooks/useShopId";
import useUI from "platform/hooks/useUI";
import useFlatRateFulfillmentMethod from "../hooks/useFlatRateFulfillmentMethod";

type FlatRateFulfillmentMethodFieldValues = {
  name: string;
  label: string;
  cost: number;
  group: string;
  handling: number;
  rate: number;
}

type FulfillmentMethodProps = {
  id: string;
}

const FulfillmentMethod: FC<FulfillmentMethodProps> = ({id}) => {
  const {t} = useTranslation();
  const {enqueueSnackbar} = useSnackbar();
  const {closeDetailDrawer} = useUI();
  const shopId = useShopId();

  const {
    fulfillmentMethod,
    loading,
    updateFlatRateFulfillmentMethod,
    updateLoading
  } = useFlatRateFulfillmentMethod(id);

  const fulfillmentMethodFieldValues = useMemo<FlatRateFulfillmentMethodFieldValues>(() => ({
    name: fulfillmentMethod?.name,
    label: fulfillmentMethod?.label,
    cost: fulfillmentMethod?.cost,
    group: fulfillmentMethod?.group,
    handling: fulfillmentMethod?.handling,
    rate: fulfillmentMethod?.rate
  }), [fulfillmentMethod]);

  const {control, handleSubmit, reset} = useForm<FlatRateFulfillmentMethodFieldValues>({
    defaultValues: fulfillmentMethodFieldValues
  });

  useEffect(() => {
    reset(fulfillmentMethodFieldValues);
  }, [fulfillmentMethod]);


  const onSave = async ({name, cost, handling, rate, group, label}: FlatRateFulfillmentMethodFieldValues) => {
    await updateFlatRateFulfillmentMethod({
      variables: {
        input: {
          clientMutationId: undefined,
          shopId,
          methodId: id,
          method: {
            name,
            cost: +cost,
            handling: +handling,
            rate: +rate,
            group,
            label,
            isEnabled: true,
            fulfillmentTypes: fulfillmentMethod.fulfillmentTypes
          }
        }
      }
    })
    enqueueSnackbar("Updated", {variant: "success", });
  }

  return (
    <>
      <Box display="flex" flexDirection="column" gap={1} height="100%">
        <Typography variant="h5">
          {t("admin.shipping.flatRateFulfillmentMethod.edit", "Edit fulfillment method")}
        </Typography>
        {!loading ? (
          <Box display="flex" flexDirection="column" gap={2} component="form">
            <ControlledTextField
              control={control}
              name="name"
              size="small"
              label={t("admin.table.headers.flatRateFulfillmentName", "Name")}
            />
            <ControlledTextField
              control={control}
              name="label"
              size="small"
              label={t("admin.table.headers.flatRateFulfillmentMethods.label", "Label")}
            />
            <ControlledTextField
              control={control}
              name="group"
              size="small"
              label={t("admin.table.headers.flatRateFulfillmentMethods.group", "Group")}
            />
            <ControlledTextField
              control={control}
              name="cost"
              size="small"
              label={t("admin.table.headers.flatRateFulfillmentMethods.cost", "Cost")}
            />
            <ControlledTextField
              control={control}
              name="handling"
              size="small"
              defaultValue=""
              label={t("admin.table.headers.flatRateFulfillmentMethods.handling", "Handling")}
            />
            <ControlledTextField
              control={control}
              name="rate"
              size="small"
              label={t("admin.table.headers.flatRateFulfillmentMethods.rate", "Rate")}
            />
          </Box>
        ) : (
          <CircularProgress/>
        )}
        <Box display="flex" gap={2} flex={1} alignItems="end">
          <LoadingButton
            onClick={handleSubmit(onSave)}
            disableElevation
            variant="contained"
            loading={updateLoading}
          >{t("app.saveChanges", "Save")}
          </LoadingButton>
          <Button onClick={closeDetailDrawer}>{t("app.cancel", "Cancel")}</Button>
        </Box>
      </Box>
    </>
  );
};

export default FulfillmentMethod;
