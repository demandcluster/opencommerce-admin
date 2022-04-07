import { KeyboardEvent, MouseEvent, FC, useEffect, useMemo, useState } from "react";
import { Control, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import { useSnackbar } from "notistack";

import ControlledTextField from "ui/ControlledTextField";
import ControlledSwitch from "ui/ControlledSwitch";
import useShopId from "platform/hooks/useShopId";
import useUI from "platform/hooks/useUI";
import useMenu from "ui/hooks/useMenu";
import useFlatRateFulfillmentMethod from "../hooks/useFlatRateFulfillmentMethod";
import { FlatRateFulfillmentRestriction } from "platform/types/gql-types";
import {
  ClickAwayListener,
  FormControl,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  useAutocomplete
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { useQuery } from "@apollo/client";
import flatRateFulfillmentRestrictionsQuery from "../graphql/queries/flatRateFulfillmentRestrictions";
import { FlatRateFulfillmentRestrictionResponse } from "./FulfillmentRestrictionsTable";

type FlatRateFulfillmentMethodFieldValues = {
  name: string;
  label: string;
  cost: string;
  group: string;
  handling: string;
  rate: string;
  isEnabled: boolean;
  restrictions: { name: string, _id: string }[]
}

const validationSchema = yup.object({
  name: yup.string().required(),
  label: yup.string().required(),
  cost: yup.string().required(),
  group: yup.string().required(),
  handling: yup.string().required(),
  rate: yup.string().required(),
  isEnabled: yup.boolean(),
  restrictions: yup.array().of(
    yup.object({
      name: yup.string().required(),
      _id: yup.string().required()
    })
  )
});

const StyledPopper = styled(Popper)(({ theme }) => ({
  width: 300,
  zIndex: theme.zIndex.modal
}));

type FulfillmentMethodRestrictionsProps = {
  control: Control<FlatRateFulfillmentMethodFieldValues>
};

type RestrictionsAutocompleteProps = {
  onClose: () => void;
  value: FlatRateFulfillmentRestriction[],
  setValue: (value: FlatRateFulfillmentRestriction[]) => void
}

const RestrictionsAutocomplete: FC<RestrictionsAutocompleteProps> = ({ onClose, value, setValue }) => {
  const shopId = useShopId();
  const {
    data,
    loading
  } = useQuery<FlatRateFulfillmentRestrictionResponse>(flatRateFulfillmentRestrictionsQuery, {
    variables: {
      shopId,
      first: 100,
      offset: 0
    }
  });

  const [options, setOptions] = useState<FlatRateFulfillmentRestriction[]>([])

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
    isOptionEqualToValue: (option, value) => option._id === value._id,
    getOptionLabel: (option) => option.name,
    multiple: true,
    onChange: (event, newValue, reason) => {
      if (
        event.type === 'keydown' &&
        (event as KeyboardEvent).key === 'Backspace' &&
        reason === 'removeOption'
      ) {
        return;
      }

      setValue(newValue)
    },
    onClose: (_, reason) => {
      if (reason === 'escape') {
        onClose();
      }
    },
    open: true,
    disableCloseOnSelect: true
  });

  useEffect(() => {
    if (!loading && data) setOptions(data.getFlatRateFulfillmentRestrictions?.nodes || []);
  }, [data]);

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
      <FormControl sx={{ pt: 2, px: 1 }}>
        <InputBase
          placeholder={"Search for restrictions..."}
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
              primaryTypographyProps={{ color: "text.disabled" }}
              primary={"Loading..."}
            />
          </ListItem>
        ) : (
          (groupedOptions as FlatRateFulfillmentRestriction[]).map((option, index) => {
            const optionProps = getOptionProps({ option, index });
            const selected = !!optionProps["aria-selected"];
            return (
              <ListItemButton
                component="li"
                selected={selected}
                {...optionProps}
              >
                <ListItemText
                  primary={option.name}
                />
                {selected && <CloseIcon sx={{ color: "text.secondary" }} fontSize="small" />}
              </ListItemButton>
            );
          })
        )}
      </List>
    </Paper>
  );
}

const FulfillmentMethodRestrictions: FC<FulfillmentMethodRestrictionsProps> = ({ control }) => {
  const { t } = useTranslation();
  const { open, handleClick: handleMenuClick, handleClose: handleMenuClose, anchorEl } = useMenu();

  const { fields, replace } = useFieldArray({
    control,
    name: "restrictions"
  });

  const [
    selectedRestrictions,
    setSelectedRestrictions
  ] = useState<FlatRateFulfillmentRestriction[]>([]);

  const [
    pendingRestrictions,
    setPendingRestrictions
  ] = useState<FlatRateFulfillmentRestriction[]>([]);

  useEffect(() => {
    replace(selectedRestrictions.map(({ _id, name }) => ({ _id, name })))
  }, [selectedRestrictions]);

  const handleClose = () => {
    setSelectedRestrictions(pendingRestrictions);
    handleMenuClose();
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    const currentRestrictions = fields.map((field) => ({
      _id: field._id,
      name: field.name
    } as FlatRateFulfillmentRestriction));

    if (open) {
      handleClose();
      return;
    }

    setPendingRestrictions(currentRestrictions);
    handleMenuClick(e);
  }

  return (
    <Box display="flex" flexDirection="column">
      <Button
        onClick={handleClick}
        sx={{
          fontWeight: "normal",
          color: "text.secondary"
        }}>
        <Box display="flex" justifyContent="space-between" width="100%">
          <span>{t("admin.shipping.flatRateFulfillmentMethod.restrictions.label", "Restrictions")}</span>
          <SettingsIcon fontSize="small" />
        </Box>
      </Button>
      <List>
        {fields.length ? (
          fields.map((field) => (
            <ListItem
              sx={{
                backgroundColor: "primary.main",
                color: "common.white",
                borderRadius: 1,
                my: 0.5
              }}
              key={field.id}
              secondaryAction={
                <IconButton edge="end" aria-label="edit" color="inherit">
                  <EditIcon fontSize="small" />
                </IconButton>
              }
            >
              <ListItemText primary={field.name} />
            </ListItem>
          ))
        ) : (
          <ListItem sx={{ py: 0, px: 1 }}>
            <ListItemText primaryTypographyProps={{ color: "text.disabled" }} primary={"No restrictions"} />
          </ListItem>
        )}
      </List>
      <StyledPopper
        id="autocomplete-popper"
        anchorEl={anchorEl}
        open={open}
        placement="bottom-end"
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            <RestrictionsAutocomplete
              onClose={handleClose}
              value={pendingRestrictions}
              setValue={setPendingRestrictions}
            />
          </div>
        </ClickAwayListener>
      </StyledPopper>
    </Box>
  );
}

type FulfillmentMethodProps = {
  id?: string;
}

const FulfillmentMethod: FC<FulfillmentMethodProps> = ({ id }) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { closeDetailDrawer, openDialog } = useUI();
  const shopId = useShopId();
  const isNew = useMemo(() => Boolean(!id), [id]);

  const {
    fulfillmentMethod,
    loading,
    updateFlatRateFulfillmentMethod,
    updateLoading,
    createFlatRateFulfillmentMethod,
    createLoading,
    deleteFlatRateFulfillmentMethod,
    deleteLoading,
    setRestrictionsOnFulfillmentMethod,
    updateRestrictionsLoading
  } = useFlatRateFulfillmentMethod({id});

  const fulfillmentMethodFieldValues = useMemo<FlatRateFulfillmentMethodFieldValues>(() => ({
    name: fulfillmentMethod?.name || "",
    label: fulfillmentMethod?.label || "",
    cost: fulfillmentMethod?.cost.toString() || "",
    group: fulfillmentMethod?.group || "",
    handling: fulfillmentMethod?.handling.toString() || "",
    rate: fulfillmentMethod?.rate.toString() || "",
    isEnabled: fulfillmentMethod?.isEnabled || false,
    restrictions: fulfillmentMethod?.restrictions?.map(({
      _id,
      name
    }) => ({
      _id,
      name
    })) || []
  }), [fulfillmentMethod]);

  const { control, handleSubmit, reset, formState: { isDirty } } = useForm<FlatRateFulfillmentMethodFieldValues>({
    defaultValues: fulfillmentMethodFieldValues,
    resolver: yupResolver(validationSchema)
  });

  useEffect(() => {
    reset(fulfillmentMethodFieldValues);
  }, [fulfillmentMethod]);

  const handleCreate = async (
    {
      name, cost, handling, rate, group, label, isEnabled, restrictions
    }: FlatRateFulfillmentMethodFieldValues) => {
    const {data} = await createFlatRateFulfillmentMethod({
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

    await setRestrictionsOnFulfillmentMethod({
      variables: {
        input: {
          shopId,
          methodId: data?.createFlatRateFulfillmentMethod.method._id,
          restrictionIds: restrictions.map(({_id}) => _id)
        }
      }
    });

    enqueueSnackbar("Created", { variant: "success" });
    closeDetailDrawer();
  }

  const handleUpdate = async (
    {
      name, cost, handling, rate, group, label, isEnabled, restrictions
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
            fulfillmentTypes: fulfillmentMethod?.fulfillmentTypes || []
          }
        }
      }
    })

    await setRestrictionsOnFulfillmentMethod({
      variables: {
        input: {
          shopId,
          methodId: id,
          restrictionIds: restrictions.map(({_id}) => _id)
        }
      }
    });

    enqueueSnackbar("Updated", { variant: "success" });
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
          methodId: fulfillmentMethod?._id,
          shopId
        }
      }
    })

    enqueueSnackbar("Deleted", { variant: "success" });
    closeDetailDrawer();
  }

  const openDeleteDialog = () => {
    openDialog({
      title: t("admin.shipping.flatRateFulfillmentMethod.delete.title", "Delete fulfillment method")!,
      content: (
        <>
          {t("admin.shipping.flatRateFulfillmentMethod.delete.content",
              "Are you sure you want to delete fulfillment method:"
            )} <br />
            <strong>{fulfillmentMethod?.name}</strong>
        </>
      ),
      confirmTitle: "Agree",
      onConfirm: handleDelete,
      confirmLoading: deleteLoading
    })
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
            <IconButton onClick={() => openDeleteDialog()}>
              <DeleteIcon />
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
            <FulfillmentMethodRestrictions
              control={control}
            />
            <ControlledSwitch
              control={control}
              name="isEnabled"
              label={t("admin.table.headers.flatRateFulfillmentMethods.isEnabled", "Enabled")}
            />
          </Box>
        ) : (
          <CircularProgress />
        )}
        <Box display="flex" gap={2} flex={1} alignItems="end">
          <LoadingButton
            disabled={!isDirty}
            onClick={handleSubmit(onSave)}
            disableElevation
            variant="contained"
            loading={isNew ? createLoading || updateRestrictionsLoading : updateLoading || updateRestrictionsLoading}
          >{t("app.saveChanges", "Save")}
          </LoadingButton>
          <Button onClick={closeDetailDrawer}>{t("app.cancel", "Cancel")}</Button>
        </Box>
      </Box>
    </>
  );
};

export default FulfillmentMethod;
