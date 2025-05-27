import AvatarFace from './AvatarFace';
import { ProfileFace } from './ProfileFace';
import { UserFace } from './UserFace';

export interface StateFace {
  UserReducer: UserFace;
  ProfileReducer: ProfileFace;
  AvatarReducer: AvatarFace;
}
