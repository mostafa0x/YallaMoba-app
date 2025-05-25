import { userDataFace } from './UserFace';

export interface ProfileFace {
  ownerData: userDataFace;
  ownerPosts: PostFace[];
}

export interface PostFace {
  id: number;
  body: string;
  files: string[];
  created_at: string;
  updated_at: string;
}
