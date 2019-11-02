import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";

export default function MyNavBar() {
  return (
    <div>
      <Navbar color="primary" dark>
        <NavbarBrand href="/">Sample Data Generator</NavbarBrand>
      </Navbar>
    </div>
  );
}
