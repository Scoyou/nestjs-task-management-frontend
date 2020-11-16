import React, { useState, useEffect } from "react";
import { usePaginatedQuery } from "react-query";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import axios from "axios";
import TaskComment from "./TaskComment";

const fetchComments = async (key, id) => {
  const res = await axios(`http://localhost:3001/tasks/${id}`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxMjMiLCJpYXQiOjE2MDUyMjQwODQsImV4cCI6MTYwNTgyODg4NH0.Sd9caewp8iU-zHh03dEGeD2dkxnDDJuDxgb1xd5Gg1I`,
    },
  });
  return res.data;
};

const CommentsIndex = ({ task }) => {
  const [newComment, setNewComment] = useState("");

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
    const res = await axios({
      method: "post",
      url: "http://localhost:3001/comments",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxMjMiLCJpYXQiOjE2MDUyMjQwODQsImV4cCI6MTYwNTgyODg4NH0.Sd9caewp8iU-zHh03dEGeD2dkxnDDJuDxgb1xd5Gg1I`,
      },
      data: {
        body: body,
        taskId: taskId,
      },
    }).then(() => {
      setNewComment("");
      refetch();
    });
  };

  const deleteComment = async (id) => {
    const res = await axios({
      method: "delete",
      url: `http://localhost:3001/comments/${id}`,
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxMjMiLCJpYXQiOjE2MDUyMjQwODQsImV4cCI6MTYwNTgyODg4NH0.Sd9caewp8iU-zHh03dEGeD2dkxnDDJuDxgb1xd5Gg1I`,
      },
    }).then(() => {
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
                <div key={task.id}>
                  <TaskComment comment={comment} delete={deleteComment}/>
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
