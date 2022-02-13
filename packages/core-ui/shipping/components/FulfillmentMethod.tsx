import {FC, useEffect, useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {useSnackbar} from "notistack";

import ControlledTextField from "ui/ControlledTextField";
import ControlledSwitch from "ui/ControlledSwitch";
import useShopId from "platform/hooks/useShopId";
import useUI from "platform/hooks/useUI";
import useFlatRateFulfillmentMethod from "../hooks/useFlatRateFulfillmentMethod";
import {FlatRateFulfillmentMethod} from "platform/types/gql-types";

type FlatRateFulfillmentMethodFieldValues = {
  name: string;
  label: string;
  cost: number;
  group: string;
  handling: number;
  rate: number;
  isEnabled: boolean;
}

type FulfillmentMethodProps = {
  id?: string;
  onFulfillmentMethodUpdate: (fulfillmentMethod: FlatRateFulfillmentMethod) => void
}

const FulfillmentMethod: FC<FulfillmentMethodProps> = ({id, onFulfillmentMethodUpdate}) => {
  const {t} = useTranslation();
  const {enqueueSnackbar} = useSnackbar();
  const {closeDetailDrawer} = useUI();
  const shopId = useShopId();
  const isNew = useMemo(() => Boolean(!id), [id]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const {
    fulfillmentMethod,
    loading,
    updateFlatRateFulfillmentMethod,
    updateLoading,
    createFlatRateFulfillmentMethod,
    createLoading,
    deleteFlatRateFulfillmentMethod,
    deleteLoading
  } = useFlatRateFulfillmentMethod({
    id,
    fulfillmentMethodUpdateHook: onFulfillmentMethodUpdate
  });

  const fulfillmentMethodFieldValues = useMemo<FlatRateFulfillmentMethodFieldValues>(() => ({
    name: fulfillmentMethod?.name,
    label: fulfillmentMethod?.label,
    cost: fulfillmentMethod?.cost,
    group: fulfillmentMethod?.group,
    handling: fulfillmentMethod?.handling,
    rate: fulfillmentMethod?.rate,
    isEnabled: fulfillmentMethod?.isEnabled
  }), [fulfillmentMethod]);

  const {control, handleSubmit, reset, formState: {isDirty}} = useForm<FlatRateFulfillmentMethodFieldValues>({
    defaultValues: fulfillmentMethodFieldValues
  });

  useEffect(() => {
    reset(fulfillmentMethodFieldValues);
  }, [fulfillmentMethod]);

  const handleCreate = async (
    {
      name, cost, handling, rate, group, label, isEnabled
    }: FlatRateFulfillmentMethodFieldValues) => {
    await createFlatRateFulfillmentMethod({
      variables: {
        input: {
          clientMutationId: undefined,
          shopId,
          method: {
            name,
            cost: +cost,
            handling: +handling,
            rate: +rate,
            group,
            label,
            isEnabled,
            // @ts-ignore
            fulfillmentTypes: ["shipping"]
          }
        }
      }
    })
    enqueueSnackbar("Created", {variant: "success"});
    closeDetailDrawer();
  }

  const handleUpdate = async (
    {
      name, cost, handling, rate, group, label, isEnabled
    }: FlatRateFulfillmentMethodFieldValues) => {
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
            isEnabled,
            fulfillmentTypes: fulfillmentMethod.fulfillmentTypes
          }
        }
      }
    })
    enqueueSnackbar("Updated", {variant: "success"});
  }

  const onSave = async (data: FlatRateFulfillmentMethodFieldValues) => {
    if (isNew) return handleCreate(data);
    return handleUpdate(data);
  }

  const handleDelete = async () => {
    await deleteFlatRateFulfillmentMethod({
      variables: {
        input: {
          clientMutationId: undefined,
          methodId: fulfillmentMethod._id,
          shopId
        }
      }
    })

    enqueueSnackbar("Deleted", {variant: "success"});
    closeDetailDrawer();
  }

  return (
    <>
      <Box display="flex" flexDirection="column" gap={1} height="100%">
        <Box display="flex" alignItems="center">
          <Typography variant="h5" flex={1}>
            {id ? (t("admin.shipping.flatRateFulfillmentMethod.edit", "Edit fulfillment method")) :
              (t("admin.shipping.flatRateFulfillmentMethod.new", "New fulfillment method"))}
          </Typography>
          {!isNew && (
            <IconButton onClick={() => setDeleteDialogOpen(true)}>
              <DeleteIcon/>
            </IconButton>
          )}
        </Box>
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
            <ControlledSwitch
              control={control}
              name="isEnabled"
              label={t("admin.table.headers.flatRateFulfillmentMethods.isEnabled", "Enabled")}
            />
          </Box>
        ) : (
          <CircularProgress/>
        )}
        <Box display="flex" gap={2} flex={1} alignItems="end">
          <LoadingButton
            disabled={!isDirty}
            onClick={handleSubmit(onSave)}
            disableElevation
            variant="contained"
            loading={isNew ? createLoading : updateLoading}
          >{t("app.saveChanges", "Save")}
          </LoadingButton>
          <Button onClick={closeDetailDrawer}>{t("app.cancel", "Cancel")}</Button>
        </Box>
      </Box>
      <Dialog open={deleteDialogOpen}>
        <DialogTitle>
          {t("admin.shipping.flatRateFulfillmentMethod.delete.title", "Delete fulfillment method")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("admin.shipping.flatRateFulfillmentMethod.delete.content",
              "Are you sure you want to delete fulfillment method:"
            )} <br/>
            <strong>{fulfillmentMethod?.name}</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <LoadingButton
            loading={deleteLoading}
            onClick={handleDelete}
            disableElevation
            autoFocus
            variant="contained"
            color="error">
            Agree
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FulfillmentMethod;
