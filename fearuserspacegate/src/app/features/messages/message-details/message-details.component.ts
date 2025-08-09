import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService as PrimeMessageService } from 'primeng/api';
import { MessageService } from '../services/message.service';
import { Message } from '../models/message.model';
import { AuthService } from '../../../core/services/auth.service';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextarea } from 'primeng/inputtextarea';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';


@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonModule,
    InputTextarea,
    AvatarModule,
    CardModule,
    BadgeModule,
    TableModule,
    ProgressSpinnerModule,
    DropdownModule,
    PaginatorModule,
    ToastModule,
    ConfirmDialogModule,
    TooltipModule,
  ]
})
export class MessageDetailsComponent implements OnInit {
  messageId: number = 0;
  message: Message | null = null;
  loading: boolean = true;
  responseForm: FormGroup;
  sendingResponse: boolean = false;
  currentUserId: number | null = null;
  
  // For the fixed date/time display
  currentTime: Date = new Date('2025-06-03 08:32:25');
  // For the fixed username display
  currentUser: string = 'fmjmadeit';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private primeMessageService: PrimeMessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.responseForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(5)]]
    });
    this.currentUserId = this.authService.currentUserId;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.messageId = +params['id'];
      this.loadMessage();
    });
  }

  loadMessage(): void {
    this.loading = true;
    this.messageService.getMessage(this.messageId).subscribe({
      next: (message: Message) => {
        this.message = message;
        
        // If message is not marked as read, mark it
        if (!message.read) {
          this.markAsRead();
        }
        
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading message details:', error);
        this.primeMessageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load message details'
        });
        this.loading = false;
      }
    });
  }

  markAsRead(): void {
    this.messageService.markAsRead(this.messageId).subscribe({
      next: (updatedMessage) => {
        if (this.message) {
          this.message.read = true;
        }
      },
      error: (error) => {
        console.error('Error marking message as read:', error);
      }
    });
  }

  sendResponse(): void {
    if (this.responseForm.invalid || this.sendingResponse) {
      return;
    }
    
    this.sendingResponse = true;
    const content = this.responseForm.value.content;
    
    this.messageService.respondToMessage(this.messageId, content).subscribe({
      next: (updatedMessage:any) => {
        this.message = updatedMessage;
        this.responseForm.reset();
        this.sendingResponse = false;
        
        this.primeMessageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Response sent successfully'
        });
      },
      error: (error:any) => {
        console.error('Error sending response:', error);
        this.primeMessageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to send response'
        });
        this.sendingResponse = false;
      }
    });
  }

  deleteMessage(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this message?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.deleteMessage(this.messageId).subscribe({
          next: () => {
            this.primeMessageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Message deleted successfully'
            });
            this.router.navigate(['/messages']);
          },
          error: (error:any) => {
            console.error('Error deleting message:', error);
            this.primeMessageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete message'
            });
          }
        });
      }
    });
  }

  // Modified to handle sender as an object
  isCurrentUserSender(sender: any): boolean {
    if (!sender || !this.currentUserId) return false;
    return sender.id === this.currentUserId;
  }

  // Modified to handle sender as an object
  isAdmin(sender: any): boolean {
    if (!sender) return false;
    return sender.name === 'admin' || sender.role?.name === 'Admin';
  }

  // Modified to handle sender as an object or string
  getInitials(sender: any): string {
    if (!sender) return 'U';
    
    // If sender is a string
    if (typeof sender === 'string') {
      const parts = sender.split(' ');
      if (parts.length === 1) {
        return parts[0].charAt(0).toUpperCase();
      }
      return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }
    
    // If sender is an object
    const name = sender.name || '';
    const parts = name.split(' ');
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }
  
  // Modified to handle sender as an object or string
  getAvatarColor(sender: any): string {
    if (!sender) return '#757575';
    
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
    
    // Get name from sender
    let name = '';
    if (typeof sender === 'string') {
      name = sender;
    } else {
      name = sender.name || sender.email || '';
    }
    
    // Generate a simple hash from the name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Use the hash to pick a color
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  }

  // Get display name for a sender
  getSenderName(sender: any): string {
    if (!sender) return 'Unknown';
    if (typeof sender === 'string') return sender;
    
    if (this.isAdmin(sender)) {
      return 'Admin';
    }
    
    if (this.isCurrentUserSender(sender)) {
      return 'You';
    }
    
    return sender.name || sender.email || 'Unknown';
  }

  goBack(): void {
    this.router.navigate(['/messages']);
  }
}