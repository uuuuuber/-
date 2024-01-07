/* eslint-disable camelcase */
import { makeAutoObservable } from 'mobx';
import {
  ICommentData,
  IGiftData,
  IRoomModalStore,
  IWatchData,
} from '../Interfaces/IRoomModalStroe';

export default class RoomModalStore implements IRoomModalStore {
  public isOpen: boolean = false;

  public title: string = '';

  public modalCount: number = 0;

  public watchData: IWatchData[] = [];

  public currentRoomID: number = 0;

  public giftData: IGiftData[] = [];

  public commentData: ICommentData[] = [];

  constructor() {
    // 对初始化数据进行响应式处理
    makeAutoObservable(this);
  }

  public setIsOpen = (val: boolean): void => {
    this.isOpen = val;
    if (!val) {
      this.setModalCount(0);
    }
  };

  public setTitle = (tle: string): void => {
    this.title = tle;
  };

  public setModalCount = (val: number): void => {
    this.modalCount = val;
  };

  public setWatchData = (data: IWatchData[]): void => {
    this.watchData = data;
  };

  public setCurrentRoomID = (val: number): void => {
    this.currentRoomID = val;
  };

  public setGiftData = (data: IGiftData[]): void => {
    this.giftData = data;
  };

  public setCommentData = (data: ICommentData[]): void => {
    this.commentData = data;
  };
}
