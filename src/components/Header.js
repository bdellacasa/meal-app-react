import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import '../styles/header.styles.scss';
import logo from '../assets/logo.png';
import ClientService from '../services/ClientService';

const styles =
{
  title: {
    fontSize: '1.4em'

  },
  options: {
    fontSize: '1.2em',
    color: 'white',
    fontWeight: 'bold',
    paddingTop: '18px'
  },
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [areas, setAreas] = useState([]);
  const isIndexPage = window.location.pathname.split("/")[1] === "";
  const color = { color: isIndexPage ? '#ffffff' : '#000000' };

  useEffect(() => {
    if (areas.length === 0) {
      ClientService.getAreas().then(areas => {
        if (areas) {
          setAreas(areas.meals.map(area => area.strArea))
        }
      })
    }
  }, [areas])

  const toggle = () => setIsOpen(!isOpen);

  const items = areas.map(area => {
    return (
      <DropdownItem key={area}>
        <Link to={`/area/${area}`} className={"header-area"}>
          {area}
        </Link>
      </DropdownItem>
    )
  })

  return (
    <div>
      <Navbar color="transparent" light expand="md">
        <Link to={"/"}>
          <img src={logo} className={"header-logo"} alt="" />
        </Link>
        <NavbarBrand href="/" className={"header-navbar-brand"} style={styles.title, color}>MealApp</NavbarBrand>
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
            <NavItem style={{ paddingLeft: '5vw' }}>
              <Link to={"/ingredients"}>
                <p style={styles.options}>Ingredients</p>
              </Link>
            </NavItem>
          </Nav>
        </Collapse>}
      </Navbar>
    </div>
  );
}

export default Header;