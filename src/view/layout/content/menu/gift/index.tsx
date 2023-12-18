import React from 'react';
import { Button, Popconfirm, Table, Tabs, TabsProps } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface IColumnsType {
  key: React.Key;
  gift: string;
  goldCoin: number;
  creationTime: string;
}

const data: IColumnsType[] = [
  {
    key: '1',
    gift: 'sss',
    goldCoin: 7889,
    creationTime: new Date().toString(),
  },
];

const columns: ColumnsType<IColumnsType> = [
  {
    title: '礼物',
    dataIndex: 'gift',
    key: 'gift',
    render: (_, record) => <div>{record.gift}</div>,
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
    render: (_, record) => (
      <div style={{ display: 'flex' }}>
        <Button type="primary" ghost style={{ marginRight: '10px' }}>
          修改
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
];
function Gift(): React.ReactElement {
  return <Tabs defaultActiveKey="1" items={items} />;
}

export default Gift;
