export interface UserFace {
  userToken: null | string;
  userData: {
    userData: userDataFace;
  } | null;
  userLoading: boolean;
}

export interface userDataFace {
  username: string;
  email: string;
  gender: string;
  role: string;
  avatar: string;
  UID: string;
  popularity: number;
}
