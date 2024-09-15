import {ProductInventory} from './ProductInventory'
import {ProductVariant} from './ProductVariant'
export interface Product {

    id: string;
    inventoryId: string;
    InventoryId: string;
    vatId: string;
    name?: string;
    description?: string;
    price: number;
    unitId: string;
    externalId?: string;
    productTypeId: string;
    isPurchasable: boolean;
    ocrNumber?: number;
    sku?: string;
    supplierId: string;
    createdAt: string;
    createdBy: string;
    imgUrl?: string;
    imgAlt?: string;
    inventories:ProductInventory[];
    variants:ProductVariant[]
}