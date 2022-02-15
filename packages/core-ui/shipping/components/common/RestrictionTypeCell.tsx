import {Cell} from "react-table"
import Chip from "@mui/material/Chip";
import {useTranslation} from "react-i18next";
import fulfillmentRestrictionTypes from "../../utils/fulfillmentRestrictionTypes";

import {FlatRateFulfillmentRestriction} from "platform/types/gql-types";

const RestrictionTypeCell = ({cell}: { cell: Cell<FlatRateFulfillmentRestriction> }) => {
  const {t} = useTranslation();

  const type = fulfillmentRestrictionTypes
    .find((type) => type.value === cell.value);

  return (
    <Chip
      label={t(type.label, type.defaultTranslation)}
    />
  );
};

export default RestrictionTypeCell;
