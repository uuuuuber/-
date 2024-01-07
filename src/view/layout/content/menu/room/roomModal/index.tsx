import React, { useState } from 'react';
import { Modal, Table } from 'antd';
import { observer } from 'mobx-react-lite';
import useStore from '../../../../../../store';
import { EN_FROMWHO } from '../../../../../../Interfaces/IRoomModalStroe';
import {
  IGiftRoomList,
  IWatchRoomList,
  getGiftRoomList,
  getWatchRoomList,
} from './roomApi/watchApi';

function RoomModal(): React.ReactElement {
  // const [currentPage, setCurrentPage] = useState<number>(1); // 当前页
  // 在组件内部使用 props，组件返回值需要是 React 元素
  const {
    isOpen,
    title,
    watchData,
    giftData,
    commentData,
    modalCount,
    currentRoomID,
    setIsOpen,
    setWatchData,
    setGiftData,
  } = useStore().roomModalStore;

  const pagingRequest = async (page: number) => {
    // setCurrentPage(page);
    if (title === EN_FROMWHO.WATCH) {
      const WatchRoomList = await getWatchRoomList(currentRoomID, page);
      if (WatchRoomList) {
        const { lookData } = WatchRoomList as IWatchRoomList;
        setWatchData(lookData);
      }
      return;
    }

    if (title === EN_FROMWHO.GIFT) {
      const GiftRoomList = await getGiftRoomList(currentRoomID, page);
      if (GiftRoomList) {
        const { data } = GiftRoomList as IGiftRoomList;
        setGiftData(data);
      }
    }
  };
  return (
    <div>
      <Modal
        title={title}
        open={isOpen}
        width="50%"
        onOk={() => setIsOpen(false)}
        cancelText="取消"
        okText="确定"
        onCancel={() => setIsOpen(false)}
      >
        {/* --------------观看记录----------------------- */}
        {title === EN_FROMWHO.WATCH && (
          <Table
            dataSource={watchData}
            pagination={{
              total: modalCount,
              pageSize: 5,
              onChange: pagingRequest,
            }}
            columns={[
              {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
                render: (_, record) => {
                  return (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src=""
                        alt=""
                        style={{
                          background: 'bule',
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          marginRight: '20px',
                        }}
                      />
                      <span>{record.username}</span>
                    </div>
                  );
                },
              },
              {
                title: '注册时间',
                dataIndex: 'creationTime',
                key: 'creationTime',
                render: (_, record) => <div>{record.created_time}</div>,
              },
            ]}
          />
        )}

        {/* -------------------观看记录end------------------------------ */}

        {/* -------------------礼物记录----------------------------- */}
        {title === EN_FROMWHO.GIFT && (
          <Table
            dataSource={giftData}
            pagination={{
              total: modalCount,
              pageSize: 5,
              onChange: pagingRequest,
            }}
            columns={[
              {
                title: '礼物名称',
                dataIndex: 'username',
                key: 'username',
                render: (_, record) => {
                  return (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span>{record.gift_name}</span>
                    </div>
                  );
                },
              },
              {
                title: '礼物图标',
                dataIndex: 'creationTime',
                key: 'creationTime',
                render: (_, record) => (
                  <div>
                    <img
                      src={record.gift_image}
                      alt=""
                      style={{
                        background: 'bule',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        marginRight: '20px',
                      }}
                    />
                  </div>
                ),
              },
              {
                title: '礼物金币',
                dataIndex: 'creationTime',
                key: 'creationTime',
                render: (_, record) => <div>{record.gift_coin}</div>,
              },
              {
                title: '赠送者',
                dataIndex: 'creationTime',
                key: 'creationTime',
                render: (_, record) => <div>{record.username}</div>,
              },
              {
                title: '赠送时间',
                dataIndex: 'creationTime',
                key: 'creationTime',
                render: (_, record) => <div>{record.created_time}</div>,
              },
            ]}
          />
        )}

        {/* ---------------------礼物记录end-------------------- */}

        {/* ---------------------弹幕记录----------------------- */}
        {title === EN_FROMWHO.SCROLLING && (
          <Table
            dataSource={commentData}
            pagination={{
              total: modalCount,
              pageSize: 5,
              onChange: pagingRequest,
            }}
            columns={[
              {
                title: '内容',
                dataIndex: 'username',
                key: 'username',
                render: (_, record) => {
                  return (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span>{record.content}</span>
                    </div>
                  );
                },
              },
              {
                title: '发送人',
                dataIndex: 'creationTime',
                key: 'creationTime',
                render: (_, record) => (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={record.avatar}
                      alt=""
                      style={{
                        background: 'bule',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        marginRight: '20px',
                      }}
                    />
                    <span>{record.username}</span>
                  </div>
                ),
              },
              {
                title: '发送时间',
                dataIndex: 'creationTime',
                key: 'creationTime',
                render: (_, record) => <div>{record.created_time}</div>,
              },
            ]}
          />
        )}
      </Modal>
    </div>
  );
}

export default observer(RoomModal);
