import React, { useState } from "react";
import { Menu, Button } from "semantic-ui-react";
import Link from "next/link";
import SignInPage from "./SignInPage";
import Cookies from "js-cookie";
import SignUpPage from "./SignUpPage";
import { useRouter } from 'next/router'

const Navbar = () => {
  const router = useRouter()
  const jwt = Cookies.get("jwt");
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Menu>
      {jwt ? (
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
              router.push("/");
            }}
          >
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <Menu.Item>
            <SignInPage setLoggedIn={setLoggedIn} />
          </Menu.Item>
          <Menu.Item>
            <SignUpPage />
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default Navbar;
