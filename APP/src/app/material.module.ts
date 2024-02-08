import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table'
import { MatSelectModule } from '@angular/material/select'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatProgressBarModule } from '@angular/material/progress-bar'

const materialComponents = [
  CommonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatExpansionModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatTableModule,
  MatSelectModule,
  MatSnackBarModule,
  MatProgressBarModule
]

@NgModule({
  declarations: [],
  imports: [
    materialComponents
  ],
  exports: [
    materialComponents
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]


})
export class MaterialModule { }