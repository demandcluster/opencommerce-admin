import { FC } from "react";
import { Card,
  CardHeader,
  CardContent,
  Skeleton,
  Typography,
  Button,
  Fade
} from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTranslation } from "react-i18next";
import useShop from "../hooks/useShop";
import useUI from "platform/hooks/useUI";
import ShopSettingsForm from "./ShopSettingsForm";

const containerLayout = {
  gridColumn: {xs: "auto / span 1"}
}

const ShopGeneral: FC = () => {
  const { t } = useTranslation();
  const { shop, loading } = useShop();
  const {openDetailDrawer} = useUI();

  if (loading) {
    return (
      <Skeleton
        variant="rectangular"
        sx={{
          ...containerLayout,
          borderRadius: 1,
          height: "13.5em"
        }} />
    )
  }

  const toggleEdit = () => {
    openDetailDrawer(<ShopSettingsForm/>)
  }

  return (
    <Fade in>
      <Card sx={{ ...containerLayout }}>
      <CardHeader
        sx={{pb: 0}}
        title={
          <>
            <Typography color="text.secondary">{t("admin.settings.shop.nameLabel", "Name")}</Typography>
            <Typography variant="h3">{shop?.name || ""}</Typography>
          </>
        }
        action={
          <Button onClick={toggleEdit} size="small"><MoreVert/></Button>
        }
      />
      <CardContent sx={{display: "flex", flexDirection: "column", gap:0.5}}>
        <Typography>
          <strong>{t("admin.settings.shop.emailLabel", "Email")}:</strong>
          {shop?.emails && shop?.emails.find(email => !email.provides)?.address || ""}
        </Typography>
        <Typography>
          <strong>{t("admin.settings.shop.slugLabel", "Slug")}:</strong> {shop?.slug || ""}
        </Typography>
        <Typography>
          <strong>{t("admin.settings.shop.descriptionLabel", "Description")}:</strong> {shop?.description || ""}
        </Typography>
        <Typography>
          <strong>{t("admin.settings.shop.keywordsLabel", "Keywords")}:</strong> {shop?.keywords || ""}
        </Typography>
        <Typography display="flex" gap={0.5}>
          <strong>{t("admin.settings.shop.allowGuestCheckout", "Allow guest checkount")}: </strong>
          {shop?.allowGuestCheckout ? <CheckCircleIcon color="success"/> : <CancelIcon color="warning"/>}
        </Typography>
      </CardContent>
    </Card>
    </Fade>
  );
}

export default ShopGeneral;