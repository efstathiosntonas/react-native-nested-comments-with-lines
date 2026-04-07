export type AuthorProfile = {
  id: string;
  firstName: string;
  isStaff: boolean;
  avatarUri?: string;
};

export type Comment = {
  id: string;
  content: string;
  createdAt: string;
  editedAt?: string | null;
  authorId: string;
  authorProfile: AuthorProfile;
  parentCommentId: string | null;
  /** Pre-fetched direct children */
  childComments: Comment[];
  /** Total reply count (may be > childComments.length if lazy-loaded) */
  childCommentCount: number;
  totalCommentLikes: number;
  commentLiked: boolean;
};
