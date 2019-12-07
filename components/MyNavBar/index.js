import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import LoginNav from "./LoginNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export default function MyNavBar() {
  return (
    <div>
      <Navbar
        style={{
          backgroundColor: "#edefef",
          borderBottom: "1px solid lightgray"
        }}
      >
        <NavbarBrand href="/">
          <FontAwesomeIcon icon={faHome} href="/" /> Fake Data
        </NavbarBrand>
        <Nav>
          <NavItem>
            <NavLink href="/datasets">Data Sets</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/help/">Help</NavLink>
          </NavItem>
          <NavItem>{"     "}</NavItem>
        </Nav>

        <LoginNav />
      </Navbar>
    </div>
  );
}
