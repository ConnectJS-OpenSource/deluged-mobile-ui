export interface Torrent{
  comment: string
  hash: string
  paused: boolean
  ratio: number
  message: string
  name: string
  is_seed: boolean
  is_finished: boolean
  queue: number
  save_path: string
  progress: number
  download_payload_rate: number
}

export enum TorrentActions{
  Start = "Start",
  Stop = "Stop",
  Delete = "Delete",
  DeleteWithData = "DeleteWithData"
}

export interface NewTorrentRequest{
  path: string
  type: string
  success?: boolean
}

