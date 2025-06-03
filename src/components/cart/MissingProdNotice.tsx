import { Product } from "../../utils/types";
import { Button } from "react-bootstrap";
import NoticeItem from "./NoticeItem";
import List from "../List";
import { setNoticeIsOpen } from "../../store/cartSlice";
import { useAppDispatch } from "../../hooks/hooks";

type NoticeProps = {
    missed: Product[];
};

export default function MissingProdNotice({ missed }: NoticeProps) {
    const dispatch = useAppDispatch();

    function clickHandler() {
        dispatch(setNoticeIsOpen(false));
    }

    return (
        <div className="my-modal__notice notice">
            <List items={missed} renderItem={(product: Product) => <NoticeItem product={product} />} className="notice" />

            <Button variant="outline-primary" onClick={clickHandler}>
                Закрыть
            </Button>
        </div>
    );
}
