import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IAppService} from "./IAppService";
import {Torrent, TorrentActions} from "../types";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QbitAppServiceService implements IAppService{
  api_base: string = environment.api_base;
  constructor(private httpClient: HttpClient) { }

  add_torrent(path: string, type: string): Promise<{ message: string }> {
    return Promise.resolve({message: ""});
  }

  executeTorrentAction(torrentId: string, action: TorrentActions): Promise<{ message: string }> {
    return Promise.resolve({message: ""});
  }

  getTorrentStatus(torrentId: string): Promise<Torrent> {
    return Promise.resolve({} as Torrent);
  }

  async getTorrents(): Promise<Torrent[]> {
    document.cookie = 'SID=VkneRG3vHPYs2lmOj4KxF90727LuiNo5'
    let torrents = await lastValueFrom(this.httpClient.get<any[]>(`${this.api_base}/torrents/info`));
    return torrents.map(m => {
      return {
        hash: m.hash,
        name: m.name,
        save_path: m.save_path,
        is_finished: m.progress === 1,
        download_payload_rate: m.dlspeed,
        progress: m.progress * 100,
        paused: m.state === 'pausedDL'
      } as Torrent
    });
  }

  login(): Promise<Torrent[]> {
    return Promise.resolve([]);
  }
}
