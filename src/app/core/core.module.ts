import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShoppinglistService, AuthService } from './services';
import { AuthGuard } from './guards/auth.guard';
import { storageServiceProvider } from './services/storage.service';
import { appInterceptorProvider } from './app.interceptor';
import { ItemService } from './services/item.service';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  providers: [
    storageServiceProvider,
    ShoppinglistService,
    AuthService,
    ItemService,
    AuthGuard,
    appInterceptorProvider
  ],
  exports: [
    FooterComponent,
  ],
})
export class CoreModule { }
