import React from 'react';
import { Button, Popconfirm, Table, Tabs, TabsProps } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface IColumnsType {
  key: React.Key;
  room: string;
  viewership: number;
  goldCoin: number;
  creationTime: string;
}

const data: IColumnsType[] = [
  {
    key: '1',
    room: 'sss',
    viewership: 555,
    goldCoin: 7889,
    creationTime: new Date().toString(),
  },
  {
    key: '2',
    room: 'sss',
    viewership: 555,
    goldCoin: 7889,
    creationTime: new Date().toString(),
  },
  {
    key: '3',
    room: 'sss',
    viewership: 555,
    goldCoin: 7889,
    creationTime: new Date().toString(),
  },
  {
    key: '4',
    room: 'sss',
    viewership: 555,
    goldCoin: 7889,
    creationTime: new Date().toString(),
  },
  {
    key: '5',
    room: 'sss',
    viewership: 555,
    goldCoin: 7889,
    creationTime: new Date().toString(),
  },
  {
    key: '6',
    room: 'sss',
    viewership: 555,
    goldCoin: 7889,
    creationTime: new Date().toString(),
  },
  {
    key: '7',
    room: 'sss',
    viewership: 555,
    goldCoin: 7889,
    creationTime: new Date().toString(),
  },
  {
    key: '8',
    room: 'sss',
    viewership: 555,
    goldCoin: 7889,
    creationTime: new Date().toString(),
  },
  {
    key: '9',
    room: 'sss',
    viewership: 555,
    goldCoin: 7889,
    creationTime: new Date().toString(),
  },
  {
    key: '10',
    room: 'sss',
    viewership: 555,
    goldCoin: 7889,
    creationTime: new Date().toString(),
  },
  {
    key: '11',
    room: 'sss',
    viewership: 555,
    goldCoin: 7889,
    creationTime: new Date().toString(),
  },
  {
    key: '12',
    room: 'sss',
    viewership: 555,
    goldCoin: 7889,
    creationTime: new Date().toString(),
  },
];

const columns: ColumnsType<IColumnsType> = [
  {
    title: '直播间',
    dataIndex: 'room',
    key: 'room',
    render: (_, record) => <div>{record.room}</div>,
  },
  {
    title: '观看人数',
    dataIndex: 'viewership',
    key: 'viewership',
    render: (_, record) => <div>{record.viewership}</div>,
  },
  {
    title: '金币数',
    dataIndex: 'goldCoin',
    key: 'goldCoin',
    render: (_, record) => <div>{record.goldCoin}</div>,
  },
  {
    title: '创建时间',
    dataIndex: 'creationTime',
    key: 'creationTime',
    render: (_, record) => <div>{record.creationTime}</div>,
  },
  {
    title: '操作',
    key: 'action',
    width: 400,
    align: 'center',
    render: (_, record) => (
      <div style={{ display: 'flex' }}>
        <Button type="primary" ghost style={{ marginRight: '10px' }}>
          观看记录
        </Button>
        <Button type="primary" ghost style={{ marginRight: '10px' }}>
          礼物记录
        </Button>
        <Button type="primary" ghost style={{ marginRight: '10px' }}>
          弹幕记录
        </Button>
        <Button danger>
          <Popconfirm
            title="确定删除吗？"
            onConfirm={() => {
              // this.delCustomTag(record);
            }}
          >
            <span style={{ cursor: 'pointer', color: '#ff4d4f' }}>删除</span>
          </Popconfirm>
        </Button>
      </div>
    ),
  },
];

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '全部',
    children: <Table dataSource={data} columns={columns} />,
  },
  {
    key: '2',
    label: '直播中',
    children: <Table dataSource={data} columns={columns} />,
  },
];
function Room(): React.ReactElement {
  return <Tabs defaultActiveKey="1" items={items} />;
}

export default Room;
