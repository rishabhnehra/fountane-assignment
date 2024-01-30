'use client';

import { useState } from 'react';
import { Button } from './button';
import { Input } from './input';

export const Comments = (props) => {
  const [comments, setComments] = useState(props.comments);

  return (
    <>
      {comments.map((comment) => (
        <Comment
          message={comment.message}
          onClick={(message) =>
            setComments((comment) => [
              ...comment,
              { id: comment.length, message },
            ])
          }
          key={comment.id}
        />
      ))}
      <Comment
        onClick={(message) =>
          setComments((comment) => [
            ...comment,
            { id: comment.length + 1, message },
          ])
        }
      />
    </>
  );
};

const Comment = ({ message, onClick }) => {
  const [inputMessage, setInputMessage] = useState(message);

  return (
    <div className="rounded-sm  p-2 border-2">
      <Input
        className="mb-2"
        type="text"
        name="comment"
        placeholder="Enter comment"
        value={inputMessage}
        disabled={!!message}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <div className="flex justify-end">
        {!message ? (
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
            onClick={onClick}
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
