import React, { useState } from "react";
import { Menu, Button } from "semantic-ui-react";
import Link from "next/link";
import SignInPage from "./SignInPage";
import Cookies from "js-cookie";
import SignUpPage from "./SignUpPage";

const Navbar = () => {
  const jwt = Cookies.get("jwt");
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Menu>
      {!jwt ? (
        <>
          <Menu.Item>
            <SignInPage setLoggedIn={setLoggedIn} />
          </Menu.Item>
          <Menu.Item>
            <SignUpPage />
          </Menu.Item>
        </>
      ) : (
        <>
          <Link href="/dashboard">
            <Menu.Item name="dashboard">Dashboard</Menu.Item>
          </Link>

          <Link href="/tasks/tasks-index">
            <Menu.Item name="tasks">Tasks</Menu.Item>
          </Link>
          <Button
            onClick={() => {
              Cookies.remove("jwt");
              setLoggedIn(false);
            }}
          >
            Sign Out
          </Button>
        </>
      )}
    </Menu>
  );
};

export default Navbar;
