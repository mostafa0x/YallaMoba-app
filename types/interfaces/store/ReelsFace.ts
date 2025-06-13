export interface ReelsFace {
  ReelsData: ReelPostFace[];
}

export interface ReelPostFace {
  id: number;
  avatar: string;
  username: string;
  body: string;
  files: string[] | null;
  created_at: string;
  updated_at: string;
  icon?: string | undefined;
  likeCount: number;
  commentCount: number;
  likedByUser: boolean;
}
