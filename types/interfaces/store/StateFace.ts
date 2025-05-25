import { ProfileFace } from './ProfileFace';
import { UserFace } from './UserFace';

export interface StateFace {
  UserReducer: UserFace;
  ProfileReducer: ProfileFace;
}
