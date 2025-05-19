import "../styles/header.scss";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import {
    faCartShopping,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction, useState } from "react";
import { searchProducts } from "../store/productSlice";
import { useAppDispatch } from "../hooks/hooks";
import Catalog from "./Catalog";

type HeaderProps = {
    modalIsOpen: boolean;
    setModalIsOpen: Dispatch<SetStateAction<boolean>>;
    setCartIsOpen: Dispatch<SetStateAction<boolean>>;
    cartIsOpen: boolean; 
}

export default function Header({modalIsOpen, setModalIsOpen, setCartIsOpen, cartIsOpen } : HeaderProps) {
    
    const [searchValue, setSearchValue] = useState('');
    const [catalogIsOpen, setCatalogIsOpen] = useState<boolean>(false);
    
    let navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    function searchHandler (){
        dispatch(searchProducts(searchValue))
        navigate("/search")
    }

    function changeHandler (e:React.ChangeEvent<HTMLInputElement>){
        setSearchValue(e.target.value)
    }
    
    function submit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        searchHandler()       
    }
    function clickHandler(){
        setCatalogIsOpen(!catalogIsOpen)
    }

    function cartClickHandler(){        
        setModalIsOpen(!modalIsOpen)
        setCartIsOpen(!cartIsOpen)
    }

    return (
        <div className="page__header header">
            <Container fluid className="p-4">
                <Row className="d-flex align-items-center justify-content-between">
                    <Col>
                        <Button className="w-100 btn-blue" variant="primary" onClick={clickHandler}>
                            Каталог
                        </Button>
                        <Catalog catalogIsOpen={catalogIsOpen} setCatalogIsOpen={setCatalogIsOpen}/>
                    </Col>
                    <Col xs={8} className="header__search">
                        <form onSubmit={submit}>
                            <Form.Control 
                                type="search"
                                placeholder="Поиск по товарам"
                                className="pe-5"
                                value={searchValue} 
                                onChange={changeHandler}                          
                            ></Form.Control>
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                className="header__icon header__icon--search"
                                onClick={searchHandler}                               
                            />
                        </form>
                    </Col>
                    <Col>
                        <div className="header__cart">
                            <FontAwesomeIcon
                                icon={faCartShopping}
                                className="header__icon"
                                onClick={cartClickHandler}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}


