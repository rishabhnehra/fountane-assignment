export type Comment = {
  id: number;
  text: string;
  parentId: number;
  replies: Comment[];
};
