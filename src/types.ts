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
    filteredByCategory: Product[];
    filteredByParams: Product[] | null;
    foundProducts: Product[];
    searchList: Array<Product[]>;
    requestParams: RequestParams;
    maxPrice: number;
};
export type CategoriesState = {
    categoryList: Category[];
    categoryGroups: CategoryGroup[];
    popularCategories: Category[];
    renderList: Category[];
    categoryId: undefined | number;
    categoryName: string;
};

export type CartState = {
    cart: Product[];
    cartIsOpen: boolean;
    total: number;
    noticeIsOpen: false;
};

export type OrderState = {
    order: OrderValues;
    orders: Order[];
    count: number;
    store: Product[];
};

export type GeneralState = {
    currentPage: number;
    catalogIsOpen: boolean;
    submenuIsOpen: boolean;
    currentProps: Iprops;
    headerSearchValue: string;
    isShown: boolean;
    formIsOpen: boolean;
    modalIsOpen: boolean;
};

export type FilterState = {
    priceValues: number[];
    rangeValues: number[];
    featureValues: Feat | undefined;
    filterFeatures: {} | FilterFeature;
    searchFilter: FilterFeature;
    searchValue: string,
    emptyFilter: boolean
}

export type CategoryGroup = {
    groupId: number;
    groupName: string;
    categoriesList: Category[];
};
export type RequestParams = {
    min: number;
    max: number;
    features: {} | Feat;
};

export interface Iprops {
    title: string;
    list: Category[];
}

export type Data = {
    products: Product[];
    categories: Category[];
    categoryGroups: CategoryGroup[];
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
};

export type Aliases = {
    [key: string]: string;
};

type OrderValues = {
    id: number;
    author: string;
    orderTotal: number;
    products: Product[];
};