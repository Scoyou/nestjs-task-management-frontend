import React, { useState, } from "react";
import { Menu, Button } from "semantic-ui-react";
import Link from "next/link";
import SignInPage from "./SignInPage";
import Cookies from "js-cookie";
import SignUpPage from "./SignUpPage";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const jwt = Cookies.get("jwt");
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    
    <Menu>
      <Menu.Item header>Tasky McTaskFace</Menu.Item>
      {jwt ? (
        <>
          <Link href="/dashboard">
            <Menu.Item name="dashboard">Dashboard</Menu.Item>
          </Link>

          <Link href="/tasks/tasks-index">
            <Menu.Item name="tasks">Tasks</Menu.Item>
          </Link>
          <Menu.Item position="right">
            <Button
              onClick={() => {
                Cookies.remove("jwt");
                setLoggedIn(false);
                router.push("/");
              }}
            >
              Sign Out
            </Button>
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item position="right">
            <SignInPage setLoggedIn={setLoggedIn} />
            <div styles={{marginLeft: '10px'}}>
            <SignUpPage />
            </div>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default Navbar;
