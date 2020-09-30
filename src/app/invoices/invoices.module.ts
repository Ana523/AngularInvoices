import { NgModule } from "@angular/core";

import { RouterModule } from "@angular/router";
import { InvoicesRoutingModule } from "./invoices-routing.module";
import { SharedModule } from '../shared/shared.module';

import { InvoicesComponent } from './invoices.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';

@NgModule({
    declarations: [
        InvoicesComponent,
        EditInvoiceComponent,
        InvoiceDetailComponent,
        InvoiceListComponent
    ],
    imports: [
        RouterModule,
        InvoicesRoutingModule,
        SharedModule
    ],
})

export class InvoicesModule {}
