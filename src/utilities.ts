import { Product } from "./types";

export function search(list: Product[], string: string) {
    string = string.toLowerCase();
    const splitArr = string.split(" ");
    
    let arrByFeatures: Product[] = [];

    const arrByName: Product[] = list.filter((prod: Product) => {
        if (splitArr.length === 1) {
            return prod.name.toLowerCase().includes(string);
        } else {
            let i = 0;
            for (let el of splitArr) {
                if (prod.name.toLowerCase().includes(el)) {
                    i++;
                }
            }
            if (i > 1) return true;
        }
    });

    //смотрим по характеристикам либо в найденном, либо во всем списке

    if (arrByName.length > 0) {
        arrByFeatures = arrByName.filter((prod) => {
            for (let feat in prod.features) {
                for (let el of splitArr) {
                    if (prod.features[feat].toLowerCase().match(el)) {
                        return true;
                    }
                }
            }
        });
        if (arrByFeatures.length === 0) return arrByName;
        return arrByFeatures;
    } else {
        arrByFeatures = list.filter((prod) => {
            for (let feat in prod.features) {
                for (let el of splitArr) {
                    if (prod.features[feat].toLowerCase().match(el)) {
                        return true;
                    }
                }
            }
        });

        return arrByFeatures;
    }
}
