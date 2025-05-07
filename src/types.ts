
export type Product = {
    id: number;
    categoryId: number;
    name: string;
    features: {
        [feature: string]: string
    };
    price: number;
    src: string   
}
export type Category = {
    id: number;
    name: string;
    src: string
}

export type ProductState = {
    productList: Product[],
    categoryList: Category[]
    // ,
    // status: string | null,
    // error: string | null
}

