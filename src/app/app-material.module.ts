import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
    exports: [
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatTabsModule,
        MatListModule,
        MatGridListModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatStepperModule,
        MatAutocompleteModule,
        MatCheckboxModule,
    ],
})
export class AppMaterialModule {}
