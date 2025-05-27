export type Features = {
    [key: string]: string;
};

export type Feat = {
    [key: string]: string[];
};

export type Product = {
    id: number;
    categoryId: number;
    name: string;
    features: Features;
    price: number;
    src: string;
    quantity?: number;
};
export type Category = {
    id: number;
    name: string;
    src: string;
};

export type ProductState = {
    productList: Product[];
    categoryList: Category[];
    filteredByCategory: Product[];
    filteredByParams: Product[] | null;
    foundProducts: Product[];
    searchList: Array<Product[]>;
    maxPrice: number;
    cart: Product[];
    order: Order;
    orders: Order[];
    popularCategories: Category[];
    store: Product[];
};

export type SParams = {
    min: number;
    max: number;
    features: {} | Feat;
};

export interface Iprops {
    title: string;
    listId: number[];
}

export type Data = {
    products: Product[];
    categories: Category[];
};

export type FilterFeature = {
    [string: string]: boolean;
};

export type Order = {
    id: number;
    author: string;
    orderTotal: number;
    products: Product[];
};

export type PopularCategory = {
    categoryId: number;
    quantity: number;
}

export type Aliases = {
    [key: string]: string
}