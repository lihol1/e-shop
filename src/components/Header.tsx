import "../styles/header.scss";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import { faCartShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { searchProducts } from "../store/productSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import Catalog from "./catalog/Catalog";
import { changeCartStatus } from "../store/cartSlice";
import { setCatalogIsOpen, setHeaderSearchValue, setModalIsOpen } from "../store/generalSlice";
import { useCallback } from "react";

export default function Header() {
    const { catalogIsOpen, headerSearchValue } = useAppSelector((state) => state.general);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const searchHandler = useCallback(() => {
        dispatch(searchProducts(headerSearchValue));
        navigate("/search");
    }, [dispatch, navigate, searchProducts, headerSearchValue]);

    const changeHandler = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setHeaderSearchValue(e.target.value));
        },
        [dispatch]
    );

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        searchHandler();
    }
    const clickHandler = useCallback(() => {
        dispatch(setCatalogIsOpen(!catalogIsOpen));
    }, [dispatch, setCatalogIsOpen, catalogIsOpen]);

    const cartClickHandler = useCallback(() => {
        dispatch(setModalIsOpen(true));
        dispatch(changeCartStatus(true));
    }, [dispatch, setModalIsOpen, changeCartStatus]);

    return (
        <div className="page__header header">
            <Container fluid className="p-4">
                <Row className="d-flex align-items-center justify-content-between">
                    <Col>
                        <Button className="w-100 btn-blue" variant="primary" onClick={clickHandler}>
                            Каталог
                        </Button>
                        <Catalog />
                    </Col>
                    <Col xs={8} className="header__search">
                        <form onSubmit={submit}>
                            <Form.Control type="search" placeholder="Поиск по товарам" className="pe-5" value={headerSearchValue} onChange={changeHandler}></Form.Control>
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="header__icon header__icon--search" onClick={searchHandler} />
                        </form>
                    </Col>
                    <Col>
                        <div className="header__cart">
                            <FontAwesomeIcon icon={faCartShopping} className="header__icon" onClick={cartClickHandler} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
