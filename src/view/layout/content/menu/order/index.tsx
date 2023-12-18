import React from 'react';
import { Button, Popconfirm, Table, Tabs, TabsProps } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface IColumnsType {
  key: number;
  orderID: string;
  user: string;
  price: number;
  status: number;
  creationTime: string;
}

const data: IColumnsType[] = [
  {
    key: 1, // 订单id
    orderID: 'sss',
    user: 'sssdd',
    price: 7889,
    status: 1,
    creationTime: new Date().toString(),
  },
];

const columns: ColumnsType<IColumnsType> = [
  {
    title: 'ID',
    dataIndex: 'key',
    key: 'key',
    render: (_, record) => <div>{record.key}</div>,
  },
  {
    title: '订单号',
    dataIndex: 'orderID',
    key: 'orderID',
    render: (_, record) => <div>{record.orderID}</div>,
  },
  {
    title: '用户',
    dataIndex: 'user',
    key: 'user',
    render: (_, record) => <div>{record.user}</div>,
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
    render: (_, record) => <div>{record.price}</div>,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (_, record) => {
      return record.status ? <div>支付成功</div> : <div>未支付</div>;
    },
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
function Order(): React.ReactElement {
  return <Tabs defaultActiveKey="1" items={items} />;
}

export default Order;
