import { userDataFace } from './UserFace';

export interface ProfileFace {
  ownerData: userDataFace | null;
  ownerPosts: PostFace[] | null;
}

export interface PostFace {
  id: number;
  body: string;
  files: string[] | null;
  created_at: string;
  updated_at: string;
}
