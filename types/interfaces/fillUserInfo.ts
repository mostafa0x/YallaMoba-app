import { userDataFace } from './store/UserFace';

export default interface fillFaces {
  payload: {
    userToken: string | null;
    userData: userDataFace | null;
  };
  type: string;
}
