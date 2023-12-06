import { makeAutoObservable, observable, action } from 'mobx';
import { makePersistable, stopPersisting } from 'mobx-persist-store'; // 引入makePersistable方法进行持久化存储
import { IAdminDataType, IAdminStore } from '../Interfaces/IAdminStore';

export default class AdminStore implements IAdminStore {
  public adminList: IAdminDataType[] = [];

  constructor() {
    // 对初始化数据进行响应式处理
    makeAutoObservable(this);
    stopPersisting(this); // 停止先前的持久化
    // 持久化
    makePersistable(this, {
      name: 'adminData',
      properties: ['adminList'],
      storage: window.localStorage, // 你的数据需要用那种方式存储，常见的就是localStorage
    });
  }

  public setAdminDataList = (v: IAdminDataType[]): void => {
    this.adminList = v;
  };
}
