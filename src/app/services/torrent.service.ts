import {Inject, Injectable} from '@angular/core';
import {IAppServiceProvider, Torrent} from "../types";
import {IAppService} from "./IAppService";

@Injectable({
  providedIn: 'root'
})
export class TorrentService {
  public torrents: Torrent[] = [];
  constructor(
    @Inject(IAppServiceProvider.provide) private appService: IAppService
  ) { }


  async populateTorrentCollection(){
    this.torrents = await this.appService.getTorrents();
  }

}
