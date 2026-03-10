import api from './api';

export interface AdminSession {
  token: string;
  username: string;
  role: string;
}

export interface ParentSession {
  token: string;
  parentName: string;
  mobile: string;
  students: unknown[];
}

/** Authenticate a parent via mobile + password */
export const parentLogin = (mobile: string, password: string): Promise<ParentSession> =>
  api.post<ParentSession>('/auth/parent-login', { mobile, password });

/** Authenticate admin via username + password */
export const adminLogin = (username: string, password: string): Promise<AdminSession> =>
  api.post<AdminSession>('/auth/admin-login', { username, password });
