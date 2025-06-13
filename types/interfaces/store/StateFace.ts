import AvatarFace from './AvatarFace';
import { ProfileFace } from './ProfileFace';
import { ReelsFace } from './ReelsFace';
import { UserFace } from './UserFace';

export interface StateFace {
  UserReducer: UserFace;
  ProfileReducer: ProfileFace;
  AvatarReducer: AvatarFace;
  ReelsReducer: ReelsFace;
}
