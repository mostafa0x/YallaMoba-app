export default interface UserFace {
  userToken: null | string;
  userData: {
    userData: {
      username: string;
      email: string;
      gender: string;
      role: string;
      avatar: string;
      UID: string;
      popularity: number;
    };
  } | null;
  userLoading: boolean;
}
