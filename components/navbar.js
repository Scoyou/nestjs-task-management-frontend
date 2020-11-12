import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import Link from "next/link";
import ProjectsDropdown from "./ProjectsDropdown";

export default class MenuExampleBasic extends Component {
    // state = {};

    // handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    // const { activeItem } = this.state;

    return (
      <Menu>
        <Link href="/">
          <Menu.Item
            name="home"
            // active={activeItem === "home"}
            // onClick={this.handleItemClick}
          >
            Home
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

          <Menu.Item
            name="projects"
            //   active={activeItem === "projects"}
            //   onClick={this.handleItemClick}
          >
            <ProjectsDropdown />
          </Menu.Item>
      </Menu>
    );
  }
}
