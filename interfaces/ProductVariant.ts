export interface ProductVariant {
    id: string;
    productId: string;
    name: string;
    description: string;
    value:string;
    isAddOn:boolean;
    isDefaultSelected:boolean;
    price: number;
    externalId: string;
    isPurchasable: boolean;
    ocrNumber: number | null;
    sku: string;
    sortOrder: number;
    typeName: string;
    typeDescription: string;
    variantId: string;
    typeId:string;
}