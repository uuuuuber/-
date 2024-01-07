/* eslint-disable @typescript-eslint/naming-convention */
export enum EN_FROMWHO {
  WATCH = '观看记录',
  GIFT = '礼物记录',
  SCROLLING = '弹幕记录',
}

export interface IWatchData {
  id: number;
  username: string;
  avatar: string;
  created_time: string;
}

export interface IGiftData {
  username: string;
  avatar: string;
  created_time: string;
  gift_name: string;
  gift_coin: number;
  gift_image: string;
}

export interface ICommentData {
  content: string;
  created_time: string;
  username: string;
  avatar: string;
}

export interface IRoomModalStore {
  isOpen: boolean;
  title: string;
  modalCount: number;
  watchData: IWatchData[];
  giftData: IGiftData[];
  commentData: ICommentData[];
  currentRoomID: number;

  setIsOpen(val: boolean): void;
  setTitle(tle: string): void;
  setWatchData(data: IWatchData[]): void;
  setModalCount(val: number): void;
  setCurrentRoomID(val: number): void;
  setGiftData(data: IGiftData[]): void;
  setCommentData(data: ICommentData[]): void;
}
