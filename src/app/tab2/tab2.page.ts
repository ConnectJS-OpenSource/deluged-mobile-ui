import {Component, Inject} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {IAppServiceProvider, NewTorrentRequest} from "../types";
import {TorrentService} from "../services/torrent.service";
import {IAppService} from "../services/IAppService";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, NgForOf, NgIf, FormsModule]
})
export class Tab2Page {

  torrents: NewTorrentRequest[] = [];
  constructor(
    @Inject(IAppServiceProvider.provide) private appService: IAppService
    , private torrentService: TorrentService) {}

  add_new_line(){
    this.torrents.push({
      path : "",
      type : "movie"
    })
  }

  async process(){
    const torrents = this.torrents.filter(m => !!m.path);
    for (let i = 0; i < torrents.length; i++) {
      const t = torrents[i];
      const res = await this.appService.add_torrent(t.path, t.type);
      if(res.message === "OK")
        t.success = true;
    }
    this.torrents = [...this.torrents.filter(m => !m.success)];
    await this.torrentService.populateTorrentCollection();
  }

  removeLineItem(t: NewTorrentRequest){
    const index = this.torrents.findIndex(m => m == t);
    if(index > -1)
      this.torrents.splice(index, 1);
  }

}
