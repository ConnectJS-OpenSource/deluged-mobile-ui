import {Component, Inject, OnInit} from '@angular/core';
import {ActionSheetController, AlertController, IonicModule} from '@ionic/angular';
import {DelugedAppService} from "../services/deluged-app-service.service";
import {NgForOf, NgIf} from "@angular/common";
import {IAppServiceProvider, Torrent, TorrentActions} from "../types";
import {ProgressBarComponent} from "../progress-bar/progress-bar.component";
import {TorrentService} from "../services/torrent.service";
import {humanFileSize} from "../helpers";
import {RouterLink} from "@angular/router";
import {environment} from "../../environments/environment";
import {IAppService} from "../services/IAppService";
import * as magnet from 'magnet-uri'


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ProgressBarComponent, NgForOf, NgIf, RouterLink],
})
export class Tab1Page implements OnInit{
  poll_handler: number = 0;
  constructor(
    @Inject(IAppServiceProvider.provide) private appService: IAppService,
    private torrentService: TorrentService,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController) {

  }
  protected readonly Math = Math;

  get torrents(): Torrent[]{
    return this.torrentService.torrents;
  }

  get admin_center(){
    return environment.admin_center;
  }

  poll = async () => {

    const inComplete = this.torrents.filter(m => !m.is_finished);

    for (let i = 0; i < inComplete.length; i++) {
      let torrent = inComplete[i];
      let _t = await this.appService.getTorrentStatus(torrent.hash);
      if(_t){
        torrent.download_payload_rate = _t.download_payload_rate;
        torrent.progress = _t.progress;
        torrent.paused = _t.paused;
      }

    }

    this.poll_handler = window.setTimeout(this.poll, 2000);
  }

  async ngOnInit() {
    await this.torrentService.populateTorrentCollection();
    if(this.poll_handler > 0){
      clearTimeout(this.poll_handler);
      this.poll_handler = 0;
    }

    this.poll().finally();
  }

  download_rate(speed: number){
    return humanFileSize(speed) + "/s";
  }

  torrent_trackBy(index: number, torrent: Torrent){
    return torrent.hash;
  }

  async torrentClick(torrent: Torrent){
    const actionSheet = await this.actionSheetCtrl.create({
      header: torrent.name,
      buttons: [
        {
          text: 'Start',
          handler: async () => {
            await this.appService.executeTorrentAction(torrent.hash, TorrentActions.Start);
            await this.ngOnInit();
          }
        },
        {
          text: 'Stop',
          handler: async () => {
            await this.appService.executeTorrentAction(torrent.hash, TorrentActions.Stop);
            await this.ngOnInit();
          }
        },
        {
          text: 'Delete',
          handler: async () => {
            await this.appService.executeTorrentAction(torrent.hash, TorrentActions.Delete);
            await this.ngOnInit();
          }
        },
        {
          text: 'Delete With Data',
          handler: async () => {
            await this.appService.executeTorrentAction(torrent.hash, TorrentActions.DeleteWithData);
            await this.ngOnInit();
          }
        },
      ],
    });

    await actionSheet.present();
  }

  async handleRefresh($event: any) {
    clearInterval(this.poll_handler);
    await this.login();
    await this.ngOnInit();
    $event.target.complete();
  }

  async login() {
    await this.appService.login();
    await this.ngOnInit();
  }

  async pasteLink(){
    let content = await navigator.clipboard.readText();
    let valid = content.indexOf('magnet:?') === 0;
    let alert: HTMLIonAlertElement | undefined = undefined;

    if(valid){
      let uri: any = magnet.decode(content);
      let selected = 'movie'
      alert = await this.alertController.create({
        header: 'Valid',
        message: uri.dn,
        inputs: [{
          label: 'Movie',
          type: 'radio',
          value: 'movie',
          checked: selected === 'movie',
          handler: () => selected = 'movie'
        },{
          label: 'TV',
          type: 'radio',
          value: 'tv',
          checked: selected === 'tv',
          handler: () => selected = 'tv'
        }],
        buttons: [
          {
            text: 'Add',
            handler: async () => {
              await this.appService.add_torrent(content, selected);
              await alert?.dismiss();
            }
          }, {
          text: 'Cancel',
          role: 'cancel'
        }]
      });
    }
    else
      alert = await this.alertController.create({
        header:'Invalid Link',
        message: content,
        buttons: ['Cancel'],
      });

    if(alert)
      await alert.present();
  }
}
