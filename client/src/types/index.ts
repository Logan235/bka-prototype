export type UserRole = 'guest' | 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge?: string;
  route: string;
  category: 'core' | 'community' | 'academic' | 'career';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  options?: { label: string; action: string }[];
}
