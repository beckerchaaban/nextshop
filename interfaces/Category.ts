export interface Category{
    id: string;
    name: string;
    description: string;
    parentId?: string;
    sortOrder: number;
    createdAt: string;
    createdBy: string;
    lastModifiedAt: string;
    modifiedBy: string;
}