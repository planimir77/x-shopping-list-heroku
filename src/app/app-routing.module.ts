import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { PrivacyPolicyPageComponent } from './shared/components/privacy-policy/page/privacy-policy-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomeComponent,
        data: { title: 'Home Page' }
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'shoppinglist',
        loadChildren: () => import('./shoppinglist/shoppinglist.module').then(m => m.ShoppinglistModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyPageComponent,
        data: { title: 'Privacy Policy' },
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
