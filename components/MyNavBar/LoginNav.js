import React from "react";

import { Nav, NavItem, NavLink } from "reactstrap";
import useMe from "../../client-api/useMe";

export default function LoginNav() {
  const { data, error } = useMe();

  if (error) {
    return <div>{error.toString()}</div>;
  }

  if (!data) return <div></div>;

  return (
    <>
      <Nav>
        <NavItem>
          <NavLink>{data.nickname}</NavLink>
        </NavItem>

        <NavItem>
          {data.error === "not_authenticated" ? (
            <NavLink href="/api/login">Login</NavLink>
          ) : (
            <NavLink href="/api/logout">Logout</NavLink>
          )}
        </NavItem>
      </Nav>
    </>
  );
}