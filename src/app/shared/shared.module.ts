import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AlertComponent } from '../shared/alert/alert.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';

import { DropdownDirective } from '../shared/dropdown.directive';
import { PlaceholderDirective } from './placeholder/placeholder.directive';

@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        DropdownDirective,
        PlaceholderDirective
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxPaginationModule
    ],
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        DropdownDirective,
        PlaceholderDirective,
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule
    ]
})

export class SharedModule {}