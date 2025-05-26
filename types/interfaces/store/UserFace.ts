import { PostFace } from './ProfileFace';

export interface UserFace {
  userToken: null | string;
  userData: userDataFace | null;
  userLoading: boolean;
  userFollowers: followersFace[];
  userFollowing: followersFace[];
  userPosts: PostFace[];
  headers: {
    Authorization: string;
  };
}

export type RoleFace = 'MM' | 'exp' | 'jg' | 'Mid' | 'Roam';

export interface userDataFace {
  username: string;
  email?: string;
  gender: string;
  role: RoleFace;
  avatar: string;
  UID: string;
  uid?: string;
  popularity: string;
}

// followers: followersFace;
// following: followersFace;

export interface followersFace {
  id: string;
  username: string;
  avatar: string;
}
