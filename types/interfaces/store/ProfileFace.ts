import { userDataFace } from './UserFace';

export interface ProfileFace {
  ownerData: userDataFace | null;
  ownerPosts: PostFace[] | null;
  ownerFollowers: followersFace[] | null;
  ownerFollowing: followersFace[] | null;
  commentsCurrentPost: CommentFace[] | null;
}

export interface PostFace {
  id: number;
  body: string;
  files: string[] | null;
  created_at: string;
  updated_at: string;
  icon?: string | undefined;
  likecount: number;
  commentcount: number;
  likedByUser: boolean;
}
export interface followersFace {
  id: string;
  username: string;
  avatar: string;
}

export interface AddCommentFace {
  id: number;
  user_id: number;
  post_id: number;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface CommentFace {
  id: number;
  user_id: number;
  post_id: number;
  content: string;
  created_at: string;
  updated_at: string;
  username: string;
  avatar: string;
}
