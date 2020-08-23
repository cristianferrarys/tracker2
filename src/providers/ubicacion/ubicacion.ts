import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { UsuarioProvider } from '../usuario/usuario';

@Injectable()
export class UbicacionProvider {

usua: FirebaseObjectObservable<any[]>;
private watch:any;
  constructor(private geolocation: Geolocation,
            private af:AngularFireDatabase,
            private _us: UsuarioProvider
            ) {
      this.usua = this.af.object('/usuarios/'+ this._us.clave);
    
  }

  cargar_ubicacion(){

    this.watch = this.geolocation.watchPosition()
          .subscribe((data) => {
          if(!this._us.clave){
            return;
          }
            this.usua.update({ lat: data.coords.latitude, lng: data.coords.longitude });
        });
  }


detener_watch(){
  this.watch.unsubscribe();

}

}
