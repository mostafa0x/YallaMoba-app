import { PostFace } from './ProfileFace';

export interface UserFace {
  userToken: null | string;
  userData: userDataFace | null;
  userLoading: boolean;
  tv: boolean;

  userPosts: PostFace[];
  headers: {
    Authorization: string;
  };
}

export type RoleFace = 'MM' | 'Exp' | 'Jungle' | 'Mid' | 'Roam';

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
