import { AxiosResponse } from 'axios';
import {
  ICommentData,
  IGiftData,
  IWatchData,
} from '../../../../../../../Interfaces/IRoomModalStroe';
import instance from '../../../../../../../request/api';

export interface IWatchRoomList {
  count: number;
  lookData: IWatchData[];
}
export const getWatchRoomList = async (
  id: number,
  page: number = 1,
  limit: number = 5
): Promise<IWatchRoomList | boolean> => {
  const res = await instance
    .get(`/admin/live/look/${id}?page=${page}&limit=${limit}`)
    .catch(e => console.log(e));
  if (res && res.status === 200) {
    const { lookData, count } = res.data.result;
    return {
      lookData,
      count,
    };
  }
  return false;
};

export interface IGiftRoomList {
  count: number;
  data: IGiftData[];
}

export interface ICommentRoomList {
  count: number;
  data: ICommentData[];
}

export const getGiftRoomList = async (
  id: number,
  page: number = 1,
  limit: number = 5
): Promise<IGiftRoomList | boolean> => {
  const res = await instance
    .get(`/admin/live/gift/${id}?page=${page}&limit=${limit}`)
    .catch(e => console.log(e));
  if (res && res.status === 200) {
    const { data, count } = res.data.result;
    return {
      data,
      count,
    };
  }
  return false;
};

export const getCommentList = async (
  id: number,
  page: number = 1,
  limit: number = 5
): Promise<ICommentRoomList | boolean> => {
  const res = await instance
    .get(`/admin/live/comment/${id}?page=${page}&limit=${limit}`)
    .catch(e => console.log(e));
  if (res && res.status === 200) {
    const { data, count } = res.data.result;
    return {
      data,
      count,
    };
  }
  return false;
};

export const closeRoom = async (id: number): Promise<AxiosResponse> => {
  const res = await instance.get(`/admin/live/close/${id}`);
  console.log(res);

  return res;
};

export const delRoom = async (id: number): Promise<AxiosResponse> => {
  const res = await instance.get(`/admin/live/delete/${id}`);
  console.log(res);
  return res;
};
