import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ContactsComponent } from './contacts.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactListComponent } from './contact-list/contact-list.component';

import { AuthGuard } from '../auth/auth.guard';

const contactsRoutes: Routes = [
    { path: '', component: ContactsComponent, canActivate: [AuthGuard], children: [
        { path: 'new', component: EditContactComponent },
        { path:':id/edit', component: EditContactComponent },
        { path: 'view', component: ContactDetailComponent },
        { path: 'list', component: ContactListComponent }
    ]}
]

@NgModule({
    imports: [RouterModule.forChild(contactsRoutes)],
    exports: [RouterModule]
})

export class ContactsRoutingModule {}