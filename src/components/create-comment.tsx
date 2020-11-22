import * as React from 'react';
import { DiaryRecord } from "../interface";

interface CreateCommentProperties {
  save: (record: DiaryRecord) => void;
}

import './create-comment.scss';
export const CreateComment = (props: CreateCommentProperties) => {
  const addComment = (comment: string) => {
    props.save({ comment });
  }

  const commentRef = React.createRef<HTMLTextAreaElement>();

  return (
    <div className="comment">
      Comment:
      <textarea ref={commentRef}></textarea>

      <button className="save_btn" onClick={() => addComment(commentRef.current.value)}>Add Comment</button>
    </div>
  );
}