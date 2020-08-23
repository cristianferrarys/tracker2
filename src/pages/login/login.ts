import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,AlertController } from 'ionic-angular';
import { ViewChild, AfterViewInit } from '@angular/core';
import { Slides } from 'ionic-angular';

import { UsuarioProvider } from '../../providers/usuario/usuario';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage  implements AfterViewInit{
  @ViewChild(Slides) slides: Slides;
  clave:string = "";

  constructor(public navCtrl: NavController, 
            public navParams: NavParams,
            private _us:UsuarioProvider,
            private loadingCtrl: LoadingController,
            private alertCtrl: AlertController) {
  }

  continuar(){

   let loading =this.loadingCtrl.create({
       content: "Cargando Contenido ...",
       
   });
   loading.present();


    this._us.verificar_usuario(this.clave)
      .then( valido => {
        loading.dismiss();
        if(valido){
            this.slides.lockSwipes(false);
            this.slides.slideNext();
            this.slides.lockSwipes(true);
        }else{
          this.alertCtrl.create({
            title: "El usuario no es correcto ",
            subTitle: "Por favor verifique su clave ",
            buttons: ['OK!']
          }).present();

        }

      })
      .catch( error => {
        loading.dismiss();
        console.log("Error en la promesa "+ JSON.stringify(error));
      })
      
      ;


  }

  ingresar(){
    this.navCtrl.setRoot(HomePage);
  }

  ngAfterViewInit(){
    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
    this.slides.paginationType = "progress";
  }

/*
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
*/
}
