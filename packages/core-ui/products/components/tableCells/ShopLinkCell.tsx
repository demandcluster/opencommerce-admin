import { Row } from 'react-table'
import { Button } from "@mui/material";

import { Product } from "platform/types/gql-types";
import useShop from 'platform/hooks/useShop';
import { MouseEvent } from 'react';
type Props = {
    row: Row<Product>
}

const ShopLinkCell = ({ row }: Props) => {
    const { changeShop } = useShop();

    const handleClick = (e: MouseEvent) => {
        e.stopPropagation();
        changeShop(row.original.shop._id);
    }
    return (
        <Button
            size="small"
            onClick={handleClick}
        >
            {row.original.shop.name}
        </Button>
    )
}

export default ShopLinkCell