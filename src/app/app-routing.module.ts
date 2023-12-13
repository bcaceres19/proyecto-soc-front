import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {MenuComponent} from "./menu/menu.component";
import {AdministracionComponent} from "./administracion/administracion.component";
import * as path from "path";
import {DestalleReporteComponent} from "./destalle-reporte/destalle-reporte.component";
import {RegistroReporteComponent} from "./registro-reporte/registro-reporte.component";
import {RegistroComponent} from "./registro/registro.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes =[
  {
    path: '',
    component:LoginComponent
  },
  {
    path:'administrador',
    component:MenuComponent,
    children: [
      {
        path: 'inicio',
        component: AdministracionComponent
      },
      {
        path:'',
        redirectTo:'inicio',
        pathMatch:'full'
      },
      {
        path: 'reporte',
        component: DestalleReporteComponent
      },
      {
        path:'reporte/:codigo',
        component: RegistroReporteComponent
      },
      {
        path: 'registraradmin',
        component: RegistroComponent
      },
      {
        path: 'registroreporte',
        component: RegistroReporteComponent
      }
    ]
  },
  {
    path: 'crearusuario',
    component: RegistroComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
