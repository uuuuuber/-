import { makeAutoObservable, observable, action } from 'mobx';
import { IGlobalStore } from '../Interfaces/IGlobalStore';

export default class GlobalStore implements IGlobalStore {
  public collapsed = false;

  constructor() {
    // 对初始化数据进行响应式处理
    makeAutoObservable(this, {
      collapsed: observable,
      setCollapsed: action,
    });
  }

  public setCollapsed = (v: boolean): void => {
    this.collapsed = v;
  };
}
