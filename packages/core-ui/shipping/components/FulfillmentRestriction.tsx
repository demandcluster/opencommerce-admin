import {FC, useEffect, useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
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
import ControlledSelect from "ui/ControlledSelect";
import useShopId from "platform/hooks/useShopId";
import useUI from "platform/hooks/useUI";
import useFlatRateFulfillmentRestriction from "../hooks/useFlatRateFulfillmentRestriction";
import fulfillmentRestrictionTypes from "../utils/fulfillmentRestrictionTypes";
import FulfillmentRestrictionAttributes from "./FulfillmentRestrictionAttributes";
import FulfillmentRestrictionDestination from "./FulfillmentRestrictionDestination";

type ItemAttributeFieldValues = {
  operator: string;
  propertyType: 'bool' | 'float' | 'int' | 'string';
  property: string;
  value: string;
}

type DestinationFieldValues = {
  country: { value: string }[],
  postal: { value: string }[],
  region: { value: string }[],
};

export type FlatRateFulfillmentRestrictionFieldValues = {
  name: string;
  type: "allow" | "deny";
  itemAttributes: ItemAttributeFieldValues[];
  destination: DestinationFieldValues;
}

const validationSchema = yup.object({
  name: yup.string().required(),
  type: yup.string().required(),
  itemAttributes: yup.array().of(
    yup.object({
      operator: yup.string().required(),
      property: yup.string().required(),
      propertyType: yup.string().required(),
      value: yup.string().required(),
    })
  ),
  destination: yup.object({
    country: yup.array().of(yup.object({
      value: yup.string().required()
    })),
    postal: yup.array().of(yup.object({
      value: yup.string().required()
    })),
    region: yup.array().of(yup.object({
      value: yup.string().required()
    }))
  })
});

type FulfillmentRestrictionProps = {
  id?: string;
}

const FulfillmentRestriction: FC<FulfillmentRestrictionProps> = ({id}) => {
  const {t} = useTranslation();
  const {enqueueSnackbar} = useSnackbar();
  const {closeDetailDrawer} = useUI();
  const shopId = useShopId();
  const isNew = useMemo(() => Boolean(!id), [id]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const {
    fulfillmentRestriction,
    loading,
    updateFlatRateFulfillmentRestriction,
    updateLoading,
    createFlatRateFulfillmentRestriction,
    createLoading,
    deleteFlatRateFulfillmentRestriction,
    deleteLoading
  } = useFlatRateFulfillmentRestriction({id});

  const fulfillmentRestrictionFieldValues = useMemo<FlatRateFulfillmentRestrictionFieldValues>(() => ({
    name: fulfillmentRestriction?.name,
    type: fulfillmentRestriction?.type,
    itemAttributes: fulfillmentRestriction?.itemAttributes || [],
    destination: {
      postal: fulfillmentRestriction?.destination?.postal.map(postal => ({value: postal})) || [],
      region: fulfillmentRestriction?.destination?.region.map(region => ({value: region})) || [],
      country: fulfillmentRestriction?.destination?.country.map(country => ({value: country})) || []
    }
  }), [fulfillmentRestriction]);

  const {control, handleSubmit, reset, formState: {isDirty}} = useForm<FlatRateFulfillmentRestrictionFieldValues>({
    defaultValues: fulfillmentRestrictionFieldValues,
    resolver: yupResolver(validationSchema)
  });

  useEffect(() => {
    reset(fulfillmentRestrictionFieldValues);
  }, [fulfillmentRestriction]);

  const handleCreate = async (
    {
      name,
      type,
      destination,
      itemAttributes
    }: FlatRateFulfillmentRestrictionFieldValues) => {
    await createFlatRateFulfillmentRestriction({
      variables: {
        input: {
          clientMutationId: undefined,
          shopId,
          restriction: {
            name,
            type,
            itemAttributes,
            destination: {
              postal: destination.postal.map(({value}) => value),
              region: destination.region.map(({value}) => value),
              country: destination.country.map(({value}) => value),
            }
          }
        }
      }
    })
    enqueueSnackbar("Created", {variant: "success"});
    closeDetailDrawer();
  }

  const handleUpdate = async (
    {
      name,
      type,
      destination,
      itemAttributes
    }: FlatRateFulfillmentRestrictionFieldValues) => {
    await updateFlatRateFulfillmentRestriction({
      variables: {
        input: {
          clientMutationId: undefined,
          shopId,
          restrictionId: id,
          restriction: {
            name,
            type,
            itemAttributes,
            destination: {
              postal: destination.postal.map(({value}) => value),
              region: destination.region.map(({value}) => value),
              country: destination.country.map(({value}) => value),
            }
          }
        }
      }
    })
    enqueueSnackbar("Updated", {variant: "success"});
  }

  const onSave = async (data: FlatRateFulfillmentRestrictionFieldValues) => {
    if (isNew) return handleCreate(data);
    return handleUpdate(data);
  }

  const handleDelete = async () => {
    await deleteFlatRateFulfillmentRestriction({
      variables: {
        input: {
          clientMutationId: undefined,
          restrictionId: id,
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
            {id ? (t("admin.shipping.flatRateFulfillmentRestriction.edit.label", "Edit restriction")) :
              (t("admin.shipping.flatRateFulfillmentRestriction.new.label", "New restriction"))}
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
              label={t("admin.table.headers.flatRateFulfillment.name.label", "Name")}
            />
            <ControlledSelect
              size="small"
              control={control}
              name="type"
              items={fulfillmentRestrictionTypes.map(type => ({
                value: type.value,
                label: t(type.label, type.defaultTranslation)
              }))}
              label={t("admin.sipping.flatRateFulfillmentRestriction.type.label", "Restriction type")}
            />
            <FulfillmentRestrictionAttributes control={control} name="itemAttributes"/>
            <FulfillmentRestrictionDestination control={control}/>
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
          {t("admin.shipping.flatRateFulfillmentRestriction.delete.title", "Delete fulfillment restriction")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("admin.shipping.flatRateFulfillmentRestriction.delete.content",
              "Are you sure you want to delete fulfillment restriction:"
            )} <br/>
            <strong>{fulfillmentRestriction?.name}</strong>
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

export default FulfillmentRestriction;
