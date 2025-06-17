import { Product } from "./types";

export function search(list: Product[], string: string) {
    string = string.toLowerCase();
    const splitArr = string.split(" ");

    let arrByFeatures: Product[] = [];

    const arrByName: Product[] = list.filter((product: Product) => {
        if (splitArr.length === 1) {
            return product.name.toLowerCase().includes(string);
        } else {
            let i = 0;
            for (const el of splitArr) {
                if (product.name.toLowerCase().includes(el)) {
                    i++;
                }
            }
            if (i > 1) return true;
        }
    });

    //смотрим по характеристикам либо в найденном, либо во всем списке

    if (arrByName.length > 0) {
        arrByFeatures = arrByName.filter((product) => {
            for (const feat in product.features) {
                for (const el of splitArr) {
                    if (product.features[feat].toLowerCase().match(el)) {
                        return true;
                    }
                }
            }
        });
        if (arrByFeatures.length === 0) return arrByName;
        return arrByFeatures;
    } else {
        arrByFeatures = list.filter((product) => {
            for (const feat in product.features) {
                for (const el of splitArr) {
                    if (product.features[feat].toLowerCase().match(el)) {
                        return true;
                    }
                }
            }
        });

        return arrByFeatures;
    }
}

//сделать через Middleware
export function lockBody() {    
    const header = document.querySelector(".header");
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (header instanceof HTMLElement) {
        header.style.paddingRight = `${scrollbarWidth}px`;
    }    
    document.body.style.overflow = "hidden";    
}

export function unlockBody() {
    const header = document.querySelector(".header");
    if (header instanceof HTMLElement) {
        header.style.paddingRight = ``;
    }
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "";
}
