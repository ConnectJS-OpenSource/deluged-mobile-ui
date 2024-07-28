import {Torrent, TorrentActions} from "../types";

export interface IAppService
{
  login(): Promise<Torrent[]>;
  getTorrents(): Promise<Torrent[]>;
  getTorrentStatus(torrentId: string): Promise<Torrent>;
  executeTorrentAction(torrentId: string, action: TorrentActions): Promise<{ message: string }>;
  add_torrent(path: string, type: string): Promise<{ message: string }>;
}
