/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Table, Tabs, TabsProps, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { observer } from 'mobx-react-lite';
import instance from '../../../../../request/api';
import useStore from '../../../../../store';
import {
  ICommentRoomList,
  IGiftRoomList,
  IWatchRoomList,
  closeRoom,
  delRoom,
  getCommentList,
  getGiftRoomList,
  getWatchRoomList,
} from './roomModal/roomApi/watchApi';

// eslint-disable-next-line @typescript-eslint/naming-convention
enum EN_RoomStatus {
  // 0未开播
  NO = '未开播',
  // 1直播中
  PROCEED = '直播中',
  // 2暂停直播
  PAUSE = '暂停直播',
  // 3直播结束
  END = '直播结束',
}

interface IColumnsType {
  id: React.Key;
  title: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  look_count: number;
  coin: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  create_time: string;
  cover: string;
  status: number;
}

function Room(): React.ReactElement {
  const [count, setCount] = useState<number>(1); // 直播间数据总数
  const [currentPage, setCurrentPage] = useState<number>(1); // 当前页
  const [currentData, setCurrentData] = useState<IColumnsType[]>([]);
  const [currentStatus, setCurrentStatus] = useState<string | undefined>();

  const {
    setIsOpen,
    setTitle,
    setWatchData,
    setModalCount,
    setCurrentRoomID,
    setGiftData,
    setCommentData,
  } = useStore().roomModalStore;

  const pagingRequest = (page: number) => {
    setCurrentPage(page);
    // getUserList(page);
  };

  const getLiveRoomList = async (
    status?: string,
    page: number = 1,
    limit: number = 8
  ) => {
    await instance
      .get(`/admin/live?page=${page}&limit=${limit}&status=${status}`)
      .then(res => {
        if (res && res.status === 200) {
          const { rows, count } = res.data.result;
          setCount(count);
          setCurrentData(rows);
        }
      });
  };

  useEffect(() => {
    getLiveRoomList();
  }, []);

  const columns: ColumnsType<IColumnsType> = [
    {
      title: '直播间',
      dataIndex: 'room',
      key: 'room',
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={record.cover}
            alt=""
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              marginRight: '10px',
            }}
          />
          <div>{record.title}</div>
        </div>
      ),
    },
    {
      title: '直播状态',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => (
        <div>
          {record.status === 0 && EN_RoomStatus.NO}
          {record.status === 1 && EN_RoomStatus.PROCEED}
          {record.status === 2 && EN_RoomStatus.PROCEED}
          {record.status === 3 && EN_RoomStatus.END}
        </div>
      ),
    },
    {
      title: '观看人数',
      dataIndex: 'viewership',
      key: 'viewership',
      render: (_, record) => <div>{record.look_count}</div>,
    },
    {
      title: '金币数',
      dataIndex: 'goldCoin',
      key: 'goldCoin',
      render: (_, record) => <div>{record.coin}</div>,
    },
    {
      title: '创建时间',
      dataIndex: 'creationTime',
      key: 'creationTime',
      render: (_, record) => <div>{record.create_time}</div>,
    },
    {
      title: '操作',
      key: 'action',
      width: 400,
      align: 'center',
      render: (_, record) => (
        <div style={{ display: 'flex' }}>
          <Button
            type="primary"
            ghost
            style={{ marginRight: '10px' }}
            onClick={async () => {
              const WatchRoomList = await getWatchRoomList(Number(record.id));
              if (WatchRoomList) {
                const { count, lookData } = WatchRoomList as IWatchRoomList;
                setWatchData(lookData);
                setModalCount(count);
                setIsOpen(true);
                setTitle('观看记录');
                setCurrentRoomID(Number(record.id));
              }
            }}
          >
            观看记录
          </Button>
          <Button
            type="primary"
            ghost
            style={{ marginRight: '10px' }}
            onClick={async () => {
              const GiftRoomList = await getGiftRoomList(Number(record.id));
              if (GiftRoomList) {
                const { count, data } = GiftRoomList as IGiftRoomList;
                setGiftData(data);
                setModalCount(count);
                setIsOpen(true);
                setTitle('礼物记录');
                setCurrentRoomID(Number(record.id));
              }
            }}
          >
            礼物记录
          </Button>
          <Button
            type="primary"
            ghost
            style={{ marginRight: '10px' }}
            onClick={async () => {
              const CommentRoomList = await getCommentList(Number(record.id));
              if (CommentRoomList) {
                const { count, data } = CommentRoomList as ICommentRoomList;
                setCommentData(data);
                setModalCount(count);
                setIsOpen(true);
                setTitle('弹幕记录');
                setCurrentRoomID(Number(record.id));
              }
            }}
          >
            弹幕记录
          </Button>
          {record.status !== 3 && record.status !== 0 && (
            <Button danger>
              <Popconfirm
                title="确定关闭吗？"
                onConfirm={async () => {
                  const res = await closeRoom(Number(record.id));
                  if (res && res.status === 200) {
                    message.success(res.data.result);
                  }
                  await getLiveRoomList(currentStatus, currentPage);
                }}
              >
                <span style={{ cursor: 'pointer', color: '#ff4d4f' }}>
                  关闭直播间
                </span>
              </Popconfirm>
            </Button>
          )}
          {(record.status === 3 || record.status === 0) && (
            <Button danger>
              <Popconfirm
                title="确定删除吗？"
                onConfirm={async () => {
                  const res = await delRoom(Number(record.id));
                  if (res && res.status === 200) {
                    message.success('删除成');
                  }
                  await getLiveRoomList(currentStatus, currentPage);
                }}
              >
                <span style={{ cursor: 'pointer', color: '#ff4d4f' }}>
                  删除该直播间
                </span>
              </Popconfirm>
            </Button>
          )}
        </div>
      ),
    },
  ];

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '全部',
      children: (
        <Table
          dataSource={currentData}
          columns={columns}
          pagination={{ total: count, pageSize: 7, onChange: pagingRequest }}
        />
      ),
    },
    {
      key: '2',
      label: '直播中',
      children: <Table dataSource={currentData} columns={columns} />,
    },
    {
      key: '3',
      label: '未开播',
      children: <Table dataSource={currentData} columns={columns} />,
    },
    {
      key: '4',
      label: '直播结束',
      children: <Table dataSource={currentData} columns={columns} />,
    },
  ];
  return (
    <Tabs
      defaultActiveKey="1"
      items={items}
      onTabClick={(key: string) => {
        const Reflection = {
          1: undefined,
          2: '1',
          3: '0',
          4: '3',
        };
        setCurrentStatus(Reflection[key]);
        switch (key) {
          case '1': // 全部
            getLiveRoomList(undefined, 1, 8);
            break;
          case '2': // 直播中
            getLiveRoomList('1', 1, 8);
            break;
          case '3': // 未开播
            getLiveRoomList('0', 1, 8);
            break;
          case '4': // 直播结束
            getLiveRoomList('3', 1, 8);
            break;
          default:
            break;
        }
      }}
    />
  );
}

export default observer(Room);
