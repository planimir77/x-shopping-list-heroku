import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { MaterialModule } from '../material/material.module';
import { EndWithSPipe } from './pipes/end-with-s.pipe';
import { TwoRowsPipe } from './pipes/two-rows.pipe';
import { LoadingComponent } from './components/loading/loading.component';
import { PrivacyPolicyDialogComponent } from './components/privacy-policy/dialog/privacy-policy-dialog.component';
import { PrivacyPolicyContentComponent } from './components/privacy-policy/content/privacy-policy-content.component';
import { PrivacyPolicyPageComponent } from './components/privacy-policy/page/privacy-policy-page.component';
import { InfoComponent } from './components/info/info.component';



@NgModule({
  declarations: [
    CapitalizePipe,
    LoadingComponent,
    EndWithSPipe,
    TwoRowsPipe,
    PrivacyPolicyDialogComponent,
    PrivacyPolicyContentComponent,
    PrivacyPolicyPageComponent,
    InfoComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    CapitalizePipe,
    LoadingComponent,
    EndWithSPipe,
    TwoRowsPipe,
    PrivacyPolicyDialogComponent,
    PrivacyPolicyPageComponent,
  ],
})
export class SharedModule { }
