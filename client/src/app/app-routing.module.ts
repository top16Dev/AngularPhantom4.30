import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent // Default Route
  },
  {
    path: 'thanks',
    component: ThankyouComponent, // Dashboard Route
  },
  {
    path: 'order/:slug',
    component: OrderComponent, // Order Route
  },
  {
    path: 'order',
    component: OrderComponent, // Order Route
  },
  
  { path: '**', component: HomeComponent } // "Catch-All" Route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
