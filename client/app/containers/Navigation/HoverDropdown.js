import React, { useState } from 'react';
import {
    NavDropdown,Navbar,Nav
  } from 'react-bootstrap';

const HoverDropdown = ({title, items}) => {

    const [show, setShow] = useState(false);
    const showDropdown = (e)=>{
        setShow(!show);
    }
    const hideDropdown = e => {
        setShow(false);
    }
    
    return (
        <Navbar>
        <NavDropdown title={title} 
            id="collasible-nav-dropdown" 
            show={show}
            onMouseEnter={showDropdown} 
            onMouseLeave={hideDropdown}
        >
            {items.map(({itemTitle, link}, index) => {
                return <NavDropdown.Item key={index}>{itemTitle}</NavDropdown.Item>
            })}
            {/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
        </NavDropdown>
        </Navbar>
    );
};

export default HoverDropdown;