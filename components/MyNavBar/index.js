import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import LoginNav from "./LoginNav";

export default function MyNavBar() {
  return (
    <div>
      <Navbar color="dark" dark>
        <NavbarBrand href="/">Sample Data Generator</NavbarBrand>

        <LoginNav />
      </Navbar>
    </div>
  );
}
