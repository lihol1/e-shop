import React from "react";

interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    className?: string;
}

const List = <T extends {}>({ items, renderItem, className }: ListProps<T>): React.ReactNode => {
    return (
        <ul className={`${className}__list`}>
            {items.map((item, i) => (
                <li key={i} className={`${className}__item`}>
                    {renderItem(item)}
                </li>
            ))}
        </ul>
    );
};

export default List;
