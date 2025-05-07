import React from 'react'
import "../styles/header.scss";
import { NavLink, Link } from "react-router";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass  } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
  <div className='header'>
    <Container fluid className="p-4">
      <Row className="d-flex align-items-center">
        <Col>  
            <Button className="w-100" variant="primary" >Каталог</Button>
        </Col>
        <Col xs={8} className="header__search">
            <Form.Control type="search" placeholder='Поиск по товарам' className="pe-5"></Form.Control> 
            <FontAwesomeIcon icon={faMagnifyingGlass} className="header__icon header__icon--search" />
        </Col>
        <Col>
            <div className="header__cart">
                <FontAwesomeIcon icon={faCartShopping} className="header__icon"/>
            </div>
        </Col>

            {/* <NavLink to="/" className={({ isActive }) => isActive ? "active" : "" }>Home</NavLink>      
            <NavLink to="/category" className={({ isActive }) => isActive ? "active" : "" }>Category</NavLink>
            <NavLink to="/order" className={({ isActive }) => isActive ? "active" : "" }>Orders</NavLink>    
            <NavLink to="/search" className={({ isActive }) => isActive ? "active" : "" }>Search</NavLink>    */}
        
        </Row>
    </Container>
    </div>
  )
}
