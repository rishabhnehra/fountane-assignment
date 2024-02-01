'use client';

import { useMemo, useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import type { Comment } from '@/types/comment';

export function resolveComments(
  comments: Omit<Comment, 'replies'>[],
  parentId = 0,
): Comment[] {
  const filteredComments = comments
    .filter((comment) => comment.parentId === parentId)
    .map((comment) => ({
      ...comment,
      replies: resolveComments(comments, comment.id),
    }));

  return filteredComments;
}

export const Comments = (props) => {
  const [comments, setComments] = useState<Omit<Comment, 'replies'>[]>(
    props.comments,
  );

  const handleSubmit = async (text: string, parentId: number) => {
    const res = await fetch(`http://localhost:3000/api/${props.id}`, {
      method: 'POST',
      body: JSON.stringify({
        text,
        id: comments.length + 1,
        parentId,
      }),
    });
    const data = await res.json();

    setComments(data);
  };

  const resolvedComments = useMemo(
    () => resolveComments(comments, 0),
    [comments],
  );

  return (
    <>
      {resolvedComments.map((comment) => (
        <Comment
          {...comment}
          onClick={() => {
            // TODO: refactor
            handleSubmit(comment.text, comment.parentId);
          }}
          onReply={(parentId) =>
            setComments((prevState) => [
              ...prevState,
              { id: prevState.length + 1, text: '', parentId },
            ])
          }
          key={comment.id}
        />
      ))}
      <Comment
        onClick={(text) => {
          handleSubmit(text, 0);
        }}
        parentId={0}
      />
    </>
  );
};

let depth = 0;

const Comment = ({
  text,
  onClick,
  onReply,
  depth = 0,
  replies,
  ...props
}: {
  text?: string;
  onClick: (text: string, parentId: number) => void;
  onReply?: (parentId: number) => void;
  depth?: number;
  replies?: Comment[];
  parentId: number;
}) => {
  const [inputMessage, setInputMessage] = useState(text);
  depth = depth + 1;

  return (
    <>
      <div
        className="rounded-sm p-2 border-2"
        style={{
          marginLeft: `${16 * depth}px`,
        }}
      >
        <Input
          className="mb-2"
          type="text"
          name="comment"
          placeholder="Enter comment"
          value={inputMessage}
          disabled={!!text}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <div className="flex justify-end">
          {!text ? (
            <Button
              onClick={() => {
                if (inputMessage.length > 0) {
                  onClick(inputMessage);
                  setInputMessage('');
                }
              }}
              size="sm"
            >
              Comment
            </Button>
          ) : (
            <Button
              onClick={() => {
                if (onReply) {
                  console.log('OnReply', props);
                  onReply(props.parentId + 1);
                }
              }}
              size="sm"
              variant="outline"
              className="mr-2"
            >
              Reply
            </Button>
          )}
        </div>
      </div>
      {replies?.map((reply, index) => (
        <Comment
          onClick={function (text: string, parentId: number): void {
            throw new Error('Function not implemented.');
          }}
          onReply={onReply}
          depth={depth}
          key={reply.id}
          {...reply}
        />
      ))}
    </>
  );
};
