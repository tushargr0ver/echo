import { User, Chat, Message } from '../types';

// Mock data for development - will be replaced with real Supabase calls
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  isOnline: true,
};

const mockChats: Chat[] = [
  {
    id: '1',
    user: { id: '2', name: 'Alice Johnson', email: 'alice@example.com', isOnline: true },
    lastMessage: 'Hey! How are you doing?',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    unreadCount: 2,
  },
  {
    id: '2',
    user: { id: '3', name: 'Bob Smith', email: 'bob@example.com', isOnline: false },
    lastMessage: 'Thanks for your help earlier!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    unreadCount: 0,
  },
  {
    id: '3',
    user: { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', isOnline: true },
    lastMessage: 'Can we schedule a meeting tomorrow?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    unreadCount: 1,
  },
];

const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hey! How are you doing?',
    userId: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    isOwn: false,
  },
  {
    id: '2',
    text: 'I am doing great! Thanks for asking. How about you?',
    userId: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    isOwn: true,
  },
  {
    id: '3',
    text: 'Pretty good! Working on some exciting projects lately.',
    userId: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    isOwn: false,
  },
];

// Authentication functions
export const login = async (email: string, password: string): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (email && password) {
    return mockUser;
  }
  throw new Error('Invalid credentials');
};

export const signup = async (name: string, email: string, password: string): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (name && email && password) {
    return { ...mockUser, name, email };
  }
  throw new Error('Registration failed');
};

export const logout = async (): Promise<void> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
};

// Chat functions
export const fetchChats = async (): Promise<Chat[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockChats;
};

export const fetchMessages = async (chatId: string): Promise<Message[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 600));
  return mockMessages;
};

export const sendMessage = async (chatId: string, text: string): Promise<Message> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const newMessage: Message = {
    id: Date.now().toString(),
    text,
    userId: mockUser.id,
    timestamp: new Date(),
    isOwn: true,
  };
  
  return newMessage;
};