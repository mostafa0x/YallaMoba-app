import { userDataFace } from './UserFace';

export interface ProfileFace {
  ownerData: userDataFace | null;
  ownerPosts: PostFace[] | null;
  ownerFollowers: followersFace[] | null;
  ownerFollowing: followersFace[] | null;
}

export interface PostFace {
  id: number;
  body: string;
  files: string[] | null;
  created_at: string;
  updated_at: string;
  icon?: string | undefined;
}
export interface followersFace {
  id: string;
  username: string;
  avatar: string;
}
