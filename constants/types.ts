// User types

export type UserType = {
  id: string;
  identifier: string;
  username: string;
  profilePicture: string;
  bannerPicture: string;
  bio: string;
  followers: number;
  follows: number;
};

export type OtherUserType = UserType & {
  isFollowing: boolean,
};

export type MyUserType = UserType & {
  email: string;
};

export type PostType = {
  id: string;
  parentId: string;
  userId: UserType['id'];
  username: UserType['username'];
  profilePicture: UserType['profilePicture'];
  content: string;
  isLiked: boolean;
  isUpvoted: boolean;
  likes: number;
  upvotes: number;
  comments: number;
  url: string;
  finishedAt: string;
};

// Form types

export type LoginForm = {
  idOrEmail: string;
  password: string;
};

export type PoliciesForm = {
  oldEnough: boolean;
  terms: boolean;
  privacy: boolean;
};

export type RegisterForm = {
  identifier: string;
  username: string;
  email: string;
  profilePicture?: any; // TODO: type
  password: string;
  passwordConfirmation: string;
};

export type ChangePasswordForm = {
  password: string;
  newPassword: string;
  newPasswordConfirmation: string;
};

export type PostForm = {
  content: string;
  finishedAt: number;
};

export type CommentForm = {
  postId: string;
  content: string;
};

// API types

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type OptionalsData = {
  timeout?: number;
};
