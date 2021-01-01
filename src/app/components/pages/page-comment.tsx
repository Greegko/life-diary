import React, { useCallback, useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { store } from '../../store';
import { currentUserIdAtom, Page, pageStateAtom } from '../app.state';

import './page-comment.scss';
export const PageComment = () => {
  const textareaRef = useRef<HTMLTextAreaElement>();
  const currentUserId = useRecoilValue(currentUserIdAtom);
  const setPage = useSetRecoilState(pageStateAtom);

  useEffect(() => {
    setPage({ page: Page.Comment, pageTitle: 'Comment' });
  }, []);

  const addComment = useCallback(() => {
    const text = textareaRef.current.value;

    if (!text) return;

    store.addComment(text, currentUserId).then(() => {
      textareaRef.current.value = '';
    });
  }, []);

  return (
    <div className='page-comment'>
      <textarea ref={textareaRef}></textarea>

      <button className="save mt-1" onClick={addComment}>Save</button>
    </div>
  );
}
