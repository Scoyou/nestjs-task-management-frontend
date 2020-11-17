import Head from "next/head";
import styles from "../styles/Home.module.css";
import Cookies from "js-cookie";
import React, { useState, useEffect, useLayoutEffect } from "react";

const Dashboard = () => {
  const jwt = Cookies.get("jwt");
  const [user, setUser] = useState("");
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [openTasks, setOpenTasks] = useState([]);

  const fetchTasks = async () => {
    const url = "http://localhost:3001/tasks";
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoadingTasks(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadingTasks(false);
      });
  };

  const fetchProjects = async () => {
    const res = await fetch(`http://localhost:3001/projects`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoadingProjects(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadingProjects(false);
      });
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  useEffect(() => {
    jwt && setUser(parseJwt(jwt).username);
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome, {user}!</h1>
        <h1>You have {projects.length} open projects</h1>
        <h1>You have {tasks.length} tasks</h1>
      </main>
    </div>
  );
};
export default Dashboard;
