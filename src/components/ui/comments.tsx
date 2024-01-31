'use client';

import { useState } from 'react';
import { Button } from './button';
import { Input } from './input';

export const Comments = (props) => {
  const [comments, setComments] = useState(props.comments);

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

  return (
    <>
      {comments.map((comment) => (
        <Comment
          text={comment.text}
          onClick={(text) => {
            // TODO: refactor
            handleSubmit(comment.text, comment.parentId);
          }}
          key={comment.id}
        />
      ))}
      <Comment
        onClick={(text) => {
          handleSubmit(text, 0);
        }}
      />
    </>
  );
};

const Comment = ({
  text,
  onClick,
}: {
  text?: string;
  onClick: (text: string, parentId: number) => void;
}) => {
  const [inputMessage, setInputMessage] = useState(text);

  return (
    <div className="rounded-sm  p-2 border-2">
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
            onClick={() => onClick(inputMessage, 0)}
            size="sm"
            variant="outline"
            className="mr-2"
          >
            Reply
          </Button>
        )}
      </div>
    </div>
  );
};
