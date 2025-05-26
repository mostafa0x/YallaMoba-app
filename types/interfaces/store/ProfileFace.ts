import { userDataFace } from './UserFace';

export interface ProfileFace {
  ownerData: userDataFace | null;
  ownerPosts: PostFace[] | null;
}

export interface PostFace {
  id: string;
  body: string;
  files: string[];
  created_at: string;
  updated_at: string;
}
