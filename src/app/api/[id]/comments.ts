type Comment = {
  id: number;
  text: string;
  parentId: number;
  replies: Comment[];
};

export const trackComments = new Map<string, Omit<Comment, 'replies'>[]>();
trackComments.set('2clG6lWFZZFyIl3prBhXEV', [
  { id: 1, text: 'Top-level comment 1', parentId: 0 },
  { id: 2, text: 'Top-level comment 2123', parentId: 0 },
  { id: 3, text: 'Reply to comment 1', parentId: 1 },
  { id: 4, text: 'Reply to comment 3', parentId: 3 },
]);

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

export function getCommentsFromTrackId(trackId: string) {
  const comments = trackComments.get(trackId);

  if (!comments) {
    return [];
  }

  return resolveComments(comments, 0);
}
