import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import Link from "next/link";
import ProjectsDropdown from "./ProjectsDropdown";

const Navbar = () => {

    // handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    return (
      <Menu>
        <Link href="/">
          <Menu.Item
            name="dashboard"
            // active={activeItem === "home"}
            // onClick={this.handleItemClick}
          >
            Dashboard
          </Menu.Item>
        </Link>

        <Link href="/tasks/tasks-index">
          <Menu.Item
            name="tasks"
            // active={activeItem === "tasks"}
            // onClick={this.handleItemClick}
          >
            Tasks
          </Menu.Item>
        </Link>
      </Menu>
    );
  }

  export default Navbar;