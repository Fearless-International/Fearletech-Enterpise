import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { Message } from '../models/message.model';
import { AuthService } from '../../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  getMessages(filters: any = {}): Observable<Message[]> {
    const userId = this.authService.currentUserId;
    
    const params = {
      'populate': '*',
      'sort': 'createdAt:desc',
      'filters': {
        '$or': [
          {
            'sender': {
              'id': {
                '$eq': userId
              }
            }
          },
          {
            'recipient': {
              'id': {
                '$eq': userId
              }
            }
          }
        ]
      },
      ...filters
    };
    
    return this.apiService.get<any>('messages', params).pipe(
      map(response => {
        if (response.data) {
          return response.data.map((item: any) => this.mapMessageData(item));
        }
        return [];
      })
    );
  }

  getMessage(id: number): Observable<Message> {
    const userId = this.authService.currentUserId;
    
    return this.apiService.get<any>(`messages/${id}?populate=*`).pipe(
      map(response => {
        const message = this.mapMessageData(response.data);
        
        // Verify message belongs to current user (as sender or recipient)
        if (message.sender?.id !== userId && message.recipient?.id !== userId) {
          throw new Error('Unauthorized access to message');
        }
        
        return message;
      })
    );
  }

  sendMessage(message: Message): Observable<Message> {
    const userId = this.authService.currentUserId;
    
    const payload = {
      data: {
        subject: message.subject,
        content: message.content,
        recipient: message.recipient,
        sender: userId,
        read: false
      }
    };
    
    return this.apiService.post<any>('messages', payload).pipe(
      map(response => this.mapMessageData(response.data))
    );
  }

  deleteMessage(id: number): Observable<void> {
    // Get the message first to verify ownership, then delete
    return this.getMessage(id).pipe(
      switchMap(() => this.apiService.delete<void>(`messages/${id}`))
    );
  }

  respondToMessage(id: number, content: string): Observable<Message> {
    // Get the message first to verify ownership, then respond
    return this.getMessage(id).pipe(
      switchMap(() => {
        const payload = {
          data: {
            content: content
          }
        };

        return this.apiService.post<any>(`messages/${id}/responses`, payload).pipe(
          map(response => this.mapMessageData(response.data))
        );
      })
    );
  }

  markAsRead(id: number): Observable<Message> {
    // Get the message first to verify ownership, then mark as read
    return this.getMessage(id).pipe(
      switchMap(() => {
        const payload = {
          data: {
            read: true
          }
        };
        
        return this.apiService.put<any>(`messages/${id}`, payload).pipe(
          map(response => this.mapMessageData(response.data))
        );
      })
    );
  }

  private mapMessageData(data: any): Message {
    return {
      id: data.id,
      subject: data.attributes.subject,
      content: data.attributes.content,
      sender: data.attributes.sender && {
        id: data.attributes.sender.id,
        name: data.attributes.sender.name,
        email: data.attributes.sender.email
      },
      recipient: data.attributes.recipient && {
        id: data.attributes.recipient.id,
        name: data.attributes.recipient.name,
        email: data.attributes.recipient.email
      },
      read: data.attributes.read,
      createdAt: data.attributes.createdAt,
      updatedAt: data.attributes.updatedAt,
      responses: data.attributes.responses || []
    };
  }
}