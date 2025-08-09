export interface Message {
  id: number;
  subject: string;
  content: string;
  sender: {
    id: number;
    name: string;
    email: string;
  };
  recipient: {
    id: number;
    name: string;
    email: string;
  };
  read: boolean;
  responses: MessageResponse[];
  createdAt?: string;
  updatedAt?: string;
}

export interface MessageResponse {
  id: number;
  content: string;
  sender: {
    id: number;
    name: string;
    email: string;
  };
  createdAt: string;
}

export interface MessageStats {
  totalMessages: number;
  unreadMessages: number;
  processedMessages: number;
  pendingMessages: number;
}