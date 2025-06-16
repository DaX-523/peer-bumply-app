// Types
export interface User {
  id: string;
  name: string;
  age: number;
  bio: string;
  photos: string[];
  distance: number;
  occupation?: string;
  education?: string;
  interests: string[];
  verified?: boolean;
}

export interface Match {
  id: string;
  user: User;
  matchedAt: Date;
  lastMessage?: {
    text: string;
    timestamp: Date;
    fromMe: boolean;
  };
}

export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  fromMe: boolean;
}
