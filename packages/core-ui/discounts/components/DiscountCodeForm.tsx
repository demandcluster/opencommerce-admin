import {FC, useEffect, useMemo, useState} from "react";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useSnackbar} from "notistack";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import useDiscountCode from "../hooks/useDiscountCode";
import {DiscountCode, DiscountCodeInput} from "platform/types/gql-types";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {ControlledSelect, ControlledTextField} from "ui";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogContentText from "@mui/material/DialogContentText";
import useUI from "platform/hooks/useUI";
import useShopId from "platform/hooks/useShopId";

type DiscountCodeFieldValues = {
  code?: string;
  calculation?: {
    method?: string
  };
  conditions: {
    enabled?: boolean,
    accountLimit?: number
    redemptionLimit?: number
    order: {
      min: number
    }
  };
  description?: string;
  discount?: string;
  discountMethod: string;
}

const validationSchema = yup.object({
  code: yup.string().required(),
  description: yup.string(),
  discount: yup.string().required(),
  discountMethod: yup.string().required(),
  calculation: yup.object({
    method: yup.string().required()
  }),
  conditions: yup.object({
    enabled: yup.boolean(),
    accountLimit: yup.number()
      .transform((value) => (isNaN(value) ? undefined : value)),
    redemptionLimit: yup.number()
      .transform((value) => (isNaN(value) ? undefined : value))
  }),
});

type DiscountCodeFormProps = {
  inputDiscountCode?: DiscountCode;
}

const DiscountCodeForm: FC<DiscountCodeFormProps> = ({inputDiscountCode}) => {
  const {t} = useTranslation();
  const shopId = useShopId();
  const {
    discountCode,
    updateDiscountCode,
    updateLoading,
    deleteDiscountCode,
    deleteLoading,
    createDiscountCode,
    createLoading
  } = useDiscountCode({inputDiscountCode});
  const isNew = useMemo(() => Boolean(!inputDiscountCode), [inputDiscountCode]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const {closeDetailDrawer} = useUI();
  const {enqueueSnackbar} = useSnackbar();
  const calculationMethods = [
    {label: "Credit", value: "credit"},
    {label: "Discount", value: "discount"},
    {label: "Sale", value: "sale"},
    {label: "Shipping", value: "shipping"}
  ];

  const discountCodeFieldValues = useMemo<DiscountCodeFieldValues>(() => ({
    code: discountCode?.code,
    calculation: {
      method: discountCode?.calculation?.method
    },
    conditions: {
      enabled: discountCode?.conditions?.enabled || true,
      accountLimit: discountCode?.conditions?.accountLimit || undefined,
      redemptionLimit: discountCode?.conditions?.redemptionLimit || undefined,
      order: {
        min: discountCode?.conditions?.order?.min || 0
      }
    },
    description: discountCode?.description || undefined,
    discount: discountCode?.discount || undefined,
    discountMethod: discountCode?.discountMethod || "code"
  }), [discountCode]);

  const {control, handleSubmit, reset, formState: {isDirty}} = useForm<DiscountCodeFieldValues>({
    defaultValues: discountCodeFieldValues,
    resolver: yupResolver(validationSchema)
  })

  useEffect(() => {
    reset(discountCodeFieldValues);
  }, [discountCode]);

  const handleCreate = async (data: DiscountCodeFieldValues) => {
    await createDiscountCode({
      variables: {
        input: {
          discountCode: data as DiscountCodeInput,
          shopId
        }
      }
    });

    enqueueSnackbar(
      t("admin.discountCode.createSuccess", "Discount code created successfully"),
      {variant: "success"}
    );
    closeDetailDrawer();
  }

  const handleUpdate = async (data: DiscountCodeFieldValues) => {
    await updateDiscountCode({
      variables: {
        input: {
          discountCode: data as DiscountCodeInput,
          discountCodeId: discountCode!._id,
          shopId
        }
      }
    });

    enqueueSnackbar(t("admin.discountCode.updateSuccess", "Discount code updated successfully"), {variant: "success"});
  }

  const onSave = (data: DiscountCodeFieldValues) => {
    if (isNew) return handleCreate(data);
    return handleUpdate(data);
  }

  const handleDelete = async () => {
    await deleteDiscountCode({
      variables: {
        input: {
          shopId,
          discountCodeId: discountCode?._id
        }
      }
    })

    enqueueSnackbar(
      t("admin.discountCode.deleteSuccess", "Discount code successfully deleted"),
      {variant: "success"}
    );
    closeDetailDrawer();
  }

  return (
    <>
      <Box display="flex" flexDirection="column" gap={2} height="100%">
        <Box display="flex" alignItems="center">
          <Typography variant="h5" flex={1}>
            {isNew ? (t("admin.discountCode.addDiscountModalTitle", "Add a new discount code")) :
              (t("admin.discountCode.editDiscountModalTitle", "Edit discount code"))}
          </Typography>
          {!isNew && (
            <IconButton onClick={() => setDeleteDialogOpen(true)}>
              <DeleteIcon/>
            </IconButton>
          )}
        </Box>
        <Box display="flex" flexDirection="column" gap={2} component="form">
          <ControlledTextField
            control={control}
            name="code"
            size="small"
            label={t("admin.discountCode.form.code", "Discount Code")}
          />
          <ControlledTextField
            control={control}
            name="discount"
            size="small"
            label={t("admin.discountCode.form.discount", "Discount")}
            placeholder={t("admin.discountCode.form.discountPlaceholder", "Discount value, i.e. a value 10 will translate to 10% off")}
          />
          <ControlledSelect
            control={control}
            name="calculation.method"
            size="small"
            label={t("admin.discountCode.form.calculationMethod", "Calculation method")}
            items={calculationMethods}
          />
          <ControlledTextField
            control={control}
            name="conditions.accountLimit"
            size="small"
            type="number"
            label={t("admin.discountCode.form.accountLimit", "Account limit")}
            placeholder={t("admin.discountCode.form.accountLimitPlaceholder", "How many times a user can redeem this discount")}
          />
          <ControlledTextField
            control={control}
            name="conditions.redemptionLimit"
            size="small"
            type="number"
            label={t("admin.discountCode.form.redemptionLimit", "Redemption limit")}
            placeholder={t("admin.discountCode.form.redemptionLimitPlaceholder", "The total number of times this discount can be redeemed")}
          />
        </Box>
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
          {t("admin.discountCode.delete.title", "Delete discount code")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            {t("admin.discountCode.delete.content",
              "Are you sure you want to delete discount code:"
            )} <br/>
            <strong>{discountCode?.code}</strong>
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
}

export default DiscountCodeForm;
