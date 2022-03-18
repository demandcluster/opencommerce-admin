import { Product } from "platform/types/gql-types";
import { useTranslation } from "react-i18next";
import { Row } from "react-table";

type Props = {
  row: Row<Product>;
}

/**
 * @summary Custom React-Table cell to render a products published status
 * @param {Object} row - The current row being rendered by React-Table
 * @returns {React.Component} A React component
 */
export default function PublishedStatusCell({ row }: Props) {
  const {t} = useTranslation();
  if (row.original.publishedProductHash === row.original.currentProductHash) {
    return (
      <span>{t("admin.product.publishStatus.published", "Published")}</span>
    );
  }
  return <span>{t("admin.product.publishStatus.unpublished", "Unpublished")}</span>;
}