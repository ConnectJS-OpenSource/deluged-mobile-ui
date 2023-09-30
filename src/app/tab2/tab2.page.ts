import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AppService} from "../services/app-service.service";
import {NewTorrentRequest} from "../types";
import {TorrentService} from "../services/torrent.service";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, NgForOf, NgIf, FormsModule]
})
export class Tab2Page {

  torrents: NewTorrentRequest[] = [];
  constructor(private appService: AppService, private torrentService: TorrentService) {}

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

}
