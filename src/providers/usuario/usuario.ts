import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';




@Injectable()
export class UsuarioProvider {

clave: string = null;
 // items: FirebaseListObservable<any[]>;
  constructor(
 /// private http: Http, 
  private af: AngularFireDatabase,
  private storage: Storage,
  private platform: Platform
  ) {
    
  }

verificar_usuario( clave:string){
  clave = clave.toLowerCase();

  let promesa =  new Promise((resolve, reject )=>{
    
  this.af.list('/usuarios/'+ clave)
    .subscribe( data =>{

      if(data.length === 0 ){
        resolve(false);
      }else{
        this.clave = clave; 
        this.guardar_storage();
        resolve(true);
      }

    })

  });

  return promesa;
}

 guardar_storage(){
  let promesa = new Promise((resolve, reject) => {
    if(this.platform.is('cordova')){

      if(this.clave){
        this.storage.set('clave', this.clave);
      }else{
        this.storage.remove('clave');
      }
         
    }else{
      if(this.clave){
        localStorage.setItem('clave', this.clave);
      }else{
        localStorage.removeItem('clave');
      }
    }

  });
  return promesa;

 }


 cargar_storage(){

  let promesa = new Promise(( resolve, reject ) => {

    if(this.platform.is('cordova')){
      this.storage.ready().then( () => {
        this.storage.get('clave').then( clave => {
          this.clave = clave;
          resolve();
        });

      });

    }else{
      this.clave = localStorage.getItem('clave');
      resolve();

    }

  });
  return promesa;

 }



borrar_usuario(){

this.clave = null;
this.guardar_storage();

} 






}
