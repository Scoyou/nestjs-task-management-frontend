import React from 'react';
import { Comment } from "semantic-ui-react";

const TaskComment = (props) => (
    <Comment>
    <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
    <Comment.Content styles={{ float: "left" }}>
      <Comment.Author as="a">{props.comment.userId}</Comment.Author>
      <Comment.Metadata>
        <div>{props.comment.createdAt}</div>
      </Comment.Metadata>
      <Comment.Text>{props.comment.body}</Comment.Text>
    </Comment.Content>
    <button onClick={() => props.delete(props.comment.id)}>
      Delete
    </button>
  </Comment>

)

export default TaskComment;