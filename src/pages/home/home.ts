import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
import { UsuarioProvider } from '../../providers/usuario/usuario';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuario:any = {};
/*  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;
  */
  constructor(public navCtrl: NavController, private _ubicacion: UbicacionProvider,
              private _us: UsuarioProvider) {
      this._ubicacion.cargar_ubicacion();

      this._ubicacion.usua
          .subscribe(data => {
            this.usuario = data;
          });
    }

salir(){
  this._us.borrar_usuario();
  this._ubicacion.detener_watch();
  this.navCtrl.setRoot("LoginPage");

}


}
