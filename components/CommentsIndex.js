import React, { useState, useEffect } from "react";
import { usePaginatedQuery } from "react-query";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import TaskComment from "./TaskComment";
import Cookies from "js-cookie";
import api from "../services/api";

const CommentsIndex = ({ task }) => {
  const jwt = Cookies.get("jwt");
  api.defaults.headers.Authorization = `Bearer ${jwt}`;

  const [newComment, setNewComment] = useState("");

  const fetchComments = async (key, id) => {
    const res = await api.get(`tasks/${id}`);
    return res.data;
  };

  const { resolvedData, status, refetch, latestData } = usePaginatedQuery(
    ["projects", task.id],
    fetchComments
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const comment = newComment;
    createComment(comment, task.id);
  };

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  const createComment = async (body, taskId) => {
    const res = await api
      .post("comments", {
        body,
        taskId,
      })
      .then(() => {
        setNewComment("");
        refetch();
      });
  };

  const deleteComment = async (id) => {
    const jwt = Cookies.get("jwt");
    const res = await api.delete(`comments/${id}`).then(() => {
      refetch();
    });
  };

  return (
    <div>
      {status === "loading" && <div>Loading data...</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <>
          <div>
            <Comment.Group size="small">
              <Header as="h3" dividing>
                Comments
              </Header>
              <Form size="small" reply>
                <Form.TextArea onChange={handleChange} value={newComment} />
                <Button
                  content="Add Reply"
                  labelPosition="left"
                  icon="edit"
                  primary
                  onClick={handleSubmit}
                />
              </Form>
              {latestData.comments.map((comment) => (
                <div key={comment.id}>
                  <TaskComment comment={comment} delete={deleteComment} />
                </div>
              ))}
            </Comment.Group>
          </div>
        </>
      )}
    </div>
  );
};

export default CommentsIndex;
