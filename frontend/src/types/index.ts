export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isOnline?: boolean;
}

export interface Message {
  id: string;
  text: string;
  userId: string;
  timestamp: Date;
  isOwn: boolean;
}

export interface Chat {
  id: string;
  user: User;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}