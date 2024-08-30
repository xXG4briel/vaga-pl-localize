import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  async toast(message: string) {
    const toast = await this.alertController.create({
      message,
    });
    toast.present();
  }

  async confirm(message: string, callback: () => void) {
    const alert = await this.alertController.create({
      message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }, {
          text: 'Ok',
          handler: () => {
            callback();
          }
        }
      ]
    });
    await alert.present();
  }

  async alert(message: string) {
    const alert = await this.alertController.create({
      message,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await alert.present();
  }

  async loading() {
    const spinner = await this.loadingController.create({
      message: 'Carregando...',
      spinner: 'crescent',
    })

    spinner.present();

    return spinner;
  }
}
