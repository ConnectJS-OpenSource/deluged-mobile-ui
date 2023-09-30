import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {lastValueFrom} from "rxjs";
import {Torrent, TorrentActions} from "../types";

@Injectable({
  providedIn: 'root',
})
export class AppService {
  api_base: string = environment.api_base;
  constructor(private httpClient: HttpClient) { }

  login(){
    return lastValueFrom(this.httpClient.get<Torrent[]>(`${this.api_base}/login`));
  }

  getTorrents(){
    return lastValueFrom(this.httpClient.get<Torrent[]>(`${this.api_base}/torrents`));
  }

  getTorrentStatus(torrentId: string){
    return lastValueFrom(this.httpClient.get<Torrent>(`${this.api_base}/torrent/${torrentId}`));
  }

  executeTorrentAction(torrentId: string, action: TorrentActions){
    return lastValueFrom(this.httpClient.get<{message: string}>(`${this.api_base}/torrent/${torrentId}/${action}`));
  }

  add_torrent(path: string, type: string){
    return lastValueFrom(this.httpClient.post<{message: string}>(`${this.api_base}/torrent`, {path: path, type: type}));
  }

}
