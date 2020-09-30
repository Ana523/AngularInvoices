import { NgModule } from "@angular/core";

import { RouterModule } from '@angular/router';
import { ContactsRoutingModule } from './contacts-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ContactsComponent } from './contacts.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactListComponent } from './contact-list/contact-list.component';

@NgModule({
    declarations: [
        ContactsComponent,
        EditContactComponent,
        ContactDetailComponent,
        ContactListComponent
    ],
    imports: [
        RouterModule,
        ContactsRoutingModule,
        SharedModule
    ]
})

export class ContactsModule {}