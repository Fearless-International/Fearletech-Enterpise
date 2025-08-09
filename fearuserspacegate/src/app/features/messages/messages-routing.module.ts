import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageDetailsComponent } from './message-details/message-details.component';

const routes: Routes = [
  { 
    path: '', 
    component: MessageListComponent 
  },
  { 
    path: ':id', 
    component: MessageDetailsComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }