import { Injectable } from '@angular/core';
import {Torrent} from "../types";
import {AppService} from "./app-service.service";

@Injectable({
  providedIn: 'root'
})
export class TorrentService {
  public torrents: Torrent[] = [];
  constructor(private appService: AppService) { }


  async populateTorrentCollection(){
    this.torrents = await this.appService.getTorrents();
  }

}
