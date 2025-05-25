export interface UserFace {
  userToken: null | string;
  userData: userDataFace | null;
  userLoading: boolean;
}

export type RoleFace = 'MM' | 'exp' | 'jg' | 'Mid' | 'Roam';

export interface userDataFace {
  username: string;
  email: string;
  gender: string;
  role: RoleFace;
  avatar: string;
  UID: string;
  popularity: number;
}
