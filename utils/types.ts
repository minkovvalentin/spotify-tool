export interface ResponseFuncs {
  GET?: Function;
  POST?: Function;
  PUT?: Function;
  DELETE?: Function;
}

export interface Accounts {
  _id: string;
  provider: string;
  type: string;
  providerAccountId: string;
  access_token: string;
  token_type: string;
  expires_at: number;
  refresh_token: string;
  scope: string;
  userId: string;
}

export interface Users extends SessionUser {
  _id: string;
  emailVerified?: string;
}

export interface Sessions {
  _id: string;
  sessionToken: string;
  userId: string;
  expired: string;
}

export interface SessionUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}
