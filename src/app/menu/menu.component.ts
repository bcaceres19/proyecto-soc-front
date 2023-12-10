import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  abrir:boolean = false;

  cambiarEstado(){
    this.abrir=!this.abrir
    console.log(this.abrir)
  }

}
