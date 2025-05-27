import { Dispatch, SetStateAction, useEffect } from "react";
import { Product } from "../types";
import { Button } from "react-bootstrap";
import NoticeItem from "./NoticeItem";
import List from "./List";

type NoticeProps = {
    missed: Product[];
    setNoticeIsOpen: Dispatch<SetStateAction<boolean>>;
};
export default function MissingProdNotice({ missed, setNoticeIsOpen }: NoticeProps) {
    function clickHandler() {
        setNoticeIsOpen(false);
    }

    return (
        <>
            <div className="my-modal__notice notice">
                <List items={missed} renderItem={(prod: Product) => <NoticeItem prod={prod} />} className="notice" />

                <Button variant="outline-primary" onClick={clickHandler}>
                    Закрыть
                </Button>
            </div>
        </>
    );
}
