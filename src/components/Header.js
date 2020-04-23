import React, { useState, useEffect } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from 'reactstrap';

import '../styles/header.styles.scss';
import chef from '../assets/chef.png';
import ClientService from '../services/ClientService';

const styles =
    {
        title: {
            fontSize: '1.4em'
        },
        options: {
            fontSize: '1.2em', 
            color: 'white',
            fontWeight: 'bold'
        },
    }

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [areas, setAreas ] = useState([]);
    const [isIndexPage, setIsIndexPage] = useState(window.location.pathname.split("/")[1] == "");

    useEffect(() => {
        if (areas.length ==  0) {
            ClientService.getAreas().then(areas => {
                if(!!areas) {
                    setAreas(areas.meals.map(area => area.strArea))
                }
            })
        }
    })

    const toggle = () => setIsOpen(!isOpen);

    const items = areas.map(area => {
        return(
            <DropdownItem href={`/area/${area}`} key={area}>
                {area}
            </DropdownItem>
        )
    })

    return (
        <div>
            <Navbar color="transparent" light expand="md">
                <img src={chef} className={"header-logo"} />
                <NavbarBrand href="/" className={"header-navbar-brand"} style={styles.title, { color: (isIndexPage ? 'white' : 'black')}}>MealWeb</NavbarBrand>
                {isIndexPage && <NavbarToggler onClick={toggle} />}
                {isIndexPage && <Collapse className={"header-menu"} isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret style={styles.options}>
                                Areas
                            </DropdownToggle>
                            <DropdownMenu right>
                                {items}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <NavItem style={{paddingLeft: '5vw'}}>
                            <NavLink href="/ingredients" style={styles.options}>Ingredients</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>}
            </Navbar>
        </div>
    );
}

export default Header;