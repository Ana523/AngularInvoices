import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { InvoicesComponent } from './invoices.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';

import { AuthGuard } from '../auth/auth.guard';

const invoicesRoutes: Routes = [
    { path: '', component: InvoicesComponent, canActivate: [AuthGuard], children: [
        { path: 'new', component: EditInvoiceComponent },
        { path:':id/edit', component: EditInvoiceComponent },
        { path: 'view', component: InvoiceDetailComponent },
        { path: 'list', component: InvoiceListComponent }
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(invoicesRoutes)],
    exports: [RouterModule]
})

export class InvoicesRoutingModule {}