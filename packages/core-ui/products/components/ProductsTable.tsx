import {useState, useMemo, useCallback, FC} from "react";
import {useNavigate} from "react-router-dom";
import {useLazyQuery, useMutation} from "@apollo/client";

import {useShopId} from "platform/hooks";
import {Table} from "ui";
import productsQuery from "../graphql/queries/products";
import createProductMutation from "../graphql/mutations/createProduct";
import {Column} from "react-table";
import {Product} from "platform/types/gql-types";
import MediaCell from "./DataTable/MediaCell";

const ProductsTable: FC = () => {
  const [products] = useLazyQuery(productsQuery);
  // const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();
  const shopId = useShopId();
  const [createProduct, {error: createProductError}] = useMutation(createProductMutation);

  const {t} = useTranslation();

  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [tableData, setTableData] = useState([]);

  // Filter by file state
  const [files, setFiles] = useState([]);
  const [isFilterByFileVisible, setFilterByFileVisible] = useState(false);
  const [isFiltered, setFiltered] = useState(false);

  // Tag selector state
  const [isTagSelectorVisible, setTagSelectorVisibility] = useState(false);

  // Create and memoize the column data
  const columns = useMemo<Column<Product>[]>(() => [
    {
      Header: "",
      accessor: (row) => row.media[0].URLs.thumbnail,
      Cell: ({row}) => <MediaCell row={row}/>
    },
    {
      Header: t("admin.productTable.header.product", "Product"),
      accessor: "title",
      id: "title"
    },
    {
      Header: t("admin.productTable.header.price"),
      accessor: (row) => row.pricing.displayPrice
    },
    {
      Header: t("admin.productTable.header.published"),
      // eslint-disable-next-line react/no-multi-comp,react/display-name,react/prop-types
      Cell: ({row}) => <PublishedStatusCell row={row}/>
    },
    {
      Header: t("admin.productTable.header.visible"),
      // eslint-disable-next-line react/no-multi-comp,react/display-name,react/prop-types
      Cell: ({row}) => <StatusIconCell row={row}/>,
      id: "isVisible"
    }
  ], []);


  const onFetchData = useCallback(async ({globalFilter, manualFilters, pageIndex, pageSize}) => {
    // Wait for shop id to be available before fetching products.
    setIsLoading(true);
    if (!shopId) {
      return;
    }

    const filterByProductIds = {};
    if (manualFilters.length) {
      filterByProductIds.productIds = manualFilters[0].value.map((id) => encodeOpaqueId("reaction/product", id));
      // Reset uploaded files
      setFiles([]);
    }

    const {data} = await apolloClient.query({
      query: productsQuery,
      variables: {
        shopIds: [shopId],
        ...filterByProductIds,
        query: globalFilter,
        first: pageSize,
        limit: (pageIndex + 1) * pageSize,
        offset: pageIndex * pageSize
      },
      fetchPolicy: "network-only"
    });

    // Update the state with the fetched data as an array of objects and the calculated page count
    setTableData(data.products.nodes);
    setPageCount(Math.ceil(data.products.totalCount / pageSize));

    setIsLoading(false);
  }, [apolloClient, shopId]);

  const onRowClick = useCallback(async ({row}) => {
    navigate.push(row.values.id);
  }, [navigate]);

  const onRowSelect = useCallback(async ({selectedRows: rows}) => {
    setSelectedRows(rows || []);
  }, []);

  const labels = useMemo(() => ({
    globalFilterPlaceholder: i18next.t("admin.productTable.filters.placeholder")
  }), []);

  const handleCreateProduct = async () => {
    const {data} = await createProduct({variables: {input: {shopId}}});

    if (data) {
      const {createProduct: {product}} = data;
      navigate.push(`/${shopId}/products/${product._id}`);
    }

    if (createProductError) {
      enqueueSnackbar(i18next.t("admin.productTable.bulkActions.error", {variant: "error"}));
    }
  };

  // Create options for the built-in ActionMenu in the DataTable
  const options = useMemo(() => [{
    label: i18next.t("admin.productTable.bulkActions.filterByFile"),
    onClick: () => {
      if (isTagSelectorVisible) setTagSelectorVisibility(false);
      setFilterByFileVisible(true);
    }
  }, {
    label: i18next.t("admin.productTable.bulkActions.addRemoveTags"),
    isDisabled: selectedRows.length === 0,
    onClick: () => {
      if (isFilterByFileVisible) setFilterByFileVisible(false);
      setTagSelectorVisibility(true);
    }
  },
    {
      label: i18next.t("admin.productTable.bulkActions.publish"),
      confirmTitle: getTranslation("admin.productTable.bulkActions.publishTitle", {count: selectedRows.length}),
      confirmMessage: getTranslation("admin.productTable.bulkActions.publishMessage", {count: selectedRows.length}),
      isDisabled: selectedRows.length === 0,
      onClick: async () => {
        const {data, error} = await apolloClient.mutate({
          mutation: publishProductsToCatalog,
          variables: {
            productIds: selectedRows
          }
        });

        if (error && error.length) {
          enqueueSnackbar(i18next.t("admin.productTable.bulkActions.error", {variant: "error"}));
          return;
        }

        refetch();
        enqueueSnackbar(getTranslation(
          "admin.productTable.bulkActions.published",
          {count: data.publishProductsToCatalog.length}
        ));
      }
    }, {
      label: i18next.t("admin.productTable.bulkActions.makeVisible"),
      confirmTitle: getTranslation("admin.productTable.bulkActions.makeVisibleTitle", {count: selectedRows.length}),
      confirmMessage: getTranslation("admin.productTable.bulkActions.makeVisibleMessage", {count: selectedRows.length}),
      isDisabled: selectedRows.length === 0,
      onClick: async () => {
        const errors = [];
        const successes = [];
        // TODO: refactor this loop to use a bulk update mutation that needs to be implemented.
        for (const productId of selectedRows) {
          // eslint-disable-next-line no-await-in-loop
          const {data, error} = await apolloClient.mutate({
            mutation: updateProduct,
            variables: {
              input: {
                product: {
                  isVisible: true
                },
                productId,
                shopId
              }
            }
          });

          if (error) errors.push(error);
          if (data) successes.push(data);
        }

        if (errors.length) {
          enqueueSnackbar(i18next.t("admin.productTable.bulkActions.error", {variant: "error"}));
          return;
        }

        refetch();
        enqueueSnackbar(getTranslation(
          "admin.productTable.bulkActions.makeVisibleSuccess",
          {count: successes.length}
        ));
      }
    }, {
      label: i18next.t("admin.productTable.bulkActions.makeHidden"),
      confirmTitle: getTranslation("admin.productTable.bulkActions.makeHiddenTitle", {count: selectedRows.length}),
      confirmMessage: getTranslation("admin.productTable.bulkActions.makeHiddenMessage", {count: selectedRows.length}),
      isDisabled: selectedRows.length === 0,
      onClick: async () => {
        const errors = [];
        const successes = [];
        // TODO: refactor this loop to use a bulk update mutation that needs to be implemented.
        for (const productId of selectedRows) {
          // eslint-disable-next-line no-await-in-loop
          const {data, error} = await apolloClient.mutate({
            mutation: updateProduct,
            variables: {
              input: {
                product: {
                  isVisible: false
                },
                productId,
                shopId
              }
            }
          });

          if (error && error.length) errors.push(error);
          if (data) successes.push(data);
        }

        if (errors.length) {
          enqueueSnackbar(i18next.t("admin.productTable.bulkActions.error", {variant: "error"}));
          return;
        }

        refetch();
        enqueueSnackbar(getTranslation(
          "admin.productTable.bulkActions.makeHiddenSuccess",
          {count: successes.length}
        ));
      }
    }, {
      label: i18next.t("admin.productTable.bulkActions.duplicate"),
      confirmTitle: getTranslation("admin.productTable.bulkActions.duplicateTitle", {count: selectedRows.length}),
      confirmMessage: getTranslation("admin.productTable.bulkActions.duplicateMessage", {count: selectedRows.length}),
      isDisabled: selectedRows.length === 0,
      onClick: async () => {
        const {data, error} = await apolloClient.mutate({
          mutation: cloneProducts,
          variables: {
            input: {
              productIds: selectedRows,
              shopId
            }
          }
        });

        if (error && error.length) {
          enqueueSnackbar(i18next.t("admin.productTable.bulkActions.error", {variant: "error"}));
          return;
        }

        refetch();
        enqueueSnackbar(getTranslation(
          "admin.productTable.bulkActions.duplicateSuccess",
          {count: data.cloneProducts.products.length}
        ));
      }
    }, {
      label: i18next.t("admin.productTable.bulkActions.archive"),
      confirmTitle: getTranslation("admin.productTable.bulkActions.archiveTitle", {count: selectedRows.length}),
      confirmMessage: getTranslation("admin.productTable.bulkActions.archiveMessage", {count: selectedRows.length}),
      isDisabled: selectedRows.length === 0,
      onClick: async () => {
        const {data, error} = await apolloClient.mutate({
          mutation: archiveProducts,
          variables: {
            input: {
              productIds: selectedRows,
              shopId
            }
          }
        });

        if (error && error.length) {
          enqueueSnackbar(i18next.t("admin.productTable.bulkActions.error", {variant: "error"}));
          return;
        }

        refetch();
        enqueueSnackbar(getTranslation(
          "admin.productTable.bulkActions.archiveSuccess",
          {count: data.archiveProducts.products.length}
        ));
      }
    }], [apolloClient, enqueueSnackbar, isFilterByFileVisible, isTagSelectorVisible, refetch, selectedRows, shopId]);


  return (
    <Grid container spacing={3}>
      <Grid item sm={12}>
        <Button color="primary" variant="contained" onClick={handleCreateProduct}>
          {i18next.t("admin.createProduct") || "Create product"}
        </Button>
      </Grid>
      <Grid item sm={12}>
        <Card>
          <CardHeader title={i18next.t("admin.products", "Products")}/>
          <CardContent>
            <Table
              loading={loading}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ProductsTable;
