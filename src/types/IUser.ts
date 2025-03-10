interface IUser {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  isActive: true;
  dob?: Date;
  profilePictureUrl?: string;
  onboardingStatus?: 'CREATED' | 'POLICY_TC_ACCEPTED';
}

export default IUser;
