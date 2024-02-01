import type { Comment } from '@/types/comment';

export const trackComments = new Map<string, Omit<Comment, 'replies'>[]>();
trackComments.set('2clG6lWFZZFyIl3prBhXEV', [
  { id: 1, text: 'Top-level comment 1', parentId: 0 },
  { id: 2, text: 'Top-level comment 2123', parentId: 0 },
  { id: 3, text: 'Reply to comment 1', parentId: 1 },
  { id: 4, text: 'Reply to comment 3', parentId: 3 },
]);

export function getCommentsFromTrackId(trackId: string) {
  const comments = trackComments.get(trackId);

  if (!comments) {
    return [];
  }

  // return resolveComments(comments, 0);
  return comments;
}
