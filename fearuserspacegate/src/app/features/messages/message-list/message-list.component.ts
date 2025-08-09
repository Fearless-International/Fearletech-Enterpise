import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService as PrimeMessageService } from 'primeng/api';
import { MessageService } from '../services/message.service';
import { Message } from '../models/message.model';

// PrimeNG Modules
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    CardModule,
    TableModule,
    PaginatorModule,
    BadgeModule,
    AvatarModule,
    ProgressSpinnerModule,
    TooltipModule,
    ToastModule
  ]
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];
  loading: boolean = false;
  totalRecords: number = 0;
  rows: number = 10;
  first: number = 0;
  
  readOptions = [
    { label: 'All Messages', value: '' },
    { label: 'Unread', value: 'false' },
    { label: 'Read', value: 'true' }
  ];
  
  selectedReadStatus: string = '';
  searchQuery: string = '';

  constructor(
    private messageService: MessageService,
    private router: Router,
    private primeMessageService: PrimeMessageService
  ) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(page: number = 0): void {
    this.loading = true;
    
    const filters: any = {
      'pagination[page]': page + 1,
      'pagination[pageSize]': this.rows,
      'sort': 'createdAt:desc'
    };
    
    if (this.selectedReadStatus !== '') {
      filters['filters[read][$eq]'] = this.selectedReadStatus === 'true';
    }
    
    if (this.searchQuery) {
      filters['filters[$or][0][subject][$containsi]'] = this.searchQuery;
      filters['filters[$or][1][content][$containsi]'] = this.searchQuery;
      filters['filters[$or][2][sender.name][$containsi]'] = this.searchQuery;
      filters['filters[$or][3][sender.email][$containsi]'] = this.searchQuery;
    }
    
    this.messageService.getMessages(filters).subscribe({
      next: (response: any) => {
        this.messages = response.data.map((item: any) => ({
          id: item.id,
          subject: item.attributes.subject,
          content: item.attributes.content,
          sender: item.attributes.sender ? {
            name: item.attributes.sender.name || 'Unknown',
            email: item.attributes.sender.email || ''
          } : { name: 'Unknown', email: '' },
          recipient: item.attributes.recipient || '',
          read: item.attributes.read || false,
          responses: item.attributes.responses || [],
          createdAt: item.attributes.createdAt,
          updatedAt: item.attributes.updatedAt
        }));
        this.totalRecords = response.meta.pagination.total;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading messages:', error);
        this.primeMessageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load messages. Please try again.'
        });
        this.loading = false;
      }
    });
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    this.loadMessages(event.page);
  }

  onReadStatusChange(): void {
    this.first = 0;
    this.loadMessages(0);
  }

  onSearch(): void {
    this.first = 0;
    this.loadMessages(0);
  }
  
  clearSearch(): void {
    this.searchQuery = '';
    this.onSearch();
  }

  viewMessage(id: number): void {
    this.router.navigate(['/messages', id]);
  }

  markAsRead(id: number, event: Event): void {
    event.stopPropagation();
    
    this.messageService.markAsRead(id).subscribe({
      next: () => {
        // Update the local message object to reflect the read status
        const updatedMessage = this.messages.find(m => m.id === id);
        if (updatedMessage) {
          updatedMessage.read = true;
        }
        
        this.primeMessageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Message marked as read'
        });
      },
      error: (error) => {
        console.error('Error marking message as read:', error);
        this.primeMessageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to mark message as read'
        });
      }
    });
  }

  getInitials(name: string): string {
    if (!name) return 'U';
    
    const parts = name.split(' ');
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }
  
  getAvatarColor(name: string): string {
    if (!name) return '#757575';
    
    const colors = [
      '#1E88E5', // Blue
      '#43A047', // Green
      '#E53935', // Red
      '#FB8C00', // Orange
      '#8E24AA', // Purple
      '#00ACC1', // Cyan
      '#3949AB', // Indigo
      '#00897B', // Teal
      '#7CB342'  // Light Green
    ];
    
    // Generate a simple hash from the name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Use the hash to pick a color
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  }
  
  formatPreview(content: string): string {
    if (!content) return '';
    
    // Strip HTML tags and limit to 100 characters
    const stripped = content.replace(/<[^>]*>/g, '');
    return stripped.length > 100 ? stripped.substring(0, 100) + '...' : stripped;
  }
}