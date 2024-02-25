import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Table, Tabs, TabsProps, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import instance from '../../../../../request/api';

interface IUSERINOF {
  id: number; // 用户id
  username: string; // 用户名
  avatar: string; // 用户头像
}

interface IColumnsType {
  id: number; // ID
  no: string; // 订单号
  user: IUSERINOF; // 关联用户
  price: number; // 价格
  status: string; // 支付状态
  // eslint-disable-next-line @typescript-eslint/naming-convention
  created_time: string; // 创建时间
}

function Order(): React.ReactElement {
  const [count, setCount] = useState<number>(1); // 数据总数
  const [currentPage, setCurrentPage] = useState<number>(1); // 当前页
  const [orderList, setOrderList] = useState<IColumnsType[]>([]);

  const getOrderList = async (page: number = 1, limit: number = 5) => {
    await instance.get(`/admin/order?page=${page}&limit=${limit}`).then(res => {
      if (res && res.status === 200) {
        console.log(res);

        setCount(res.data.result.count);
        setOrderList(res.data.result.rows);
      } else {
        setOrderList([]);
      }
    });
  };

  useEffect(() => {
    getOrderList();
  }, []);

  const delOrder = async (id: number): Promise<void> => {
    const { status, data } = await instance.get(`/admin/order/delete/${id}`);
    if (status === 200) {
      message.success(data.msg);
      getOrderList();
    }
  };

  const pagingRequest = (page: number) => {
    setCurrentPage(page);
    getOrderList(page);
  };

  const columns: ColumnsType<IColumnsType> = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
      render: (_, record) => <div>{record.id}</div>,
    },
    {
      title: '订单号',
      dataIndex: 'orderID',
      key: 'orderID',
      render: (_, record) => <div>{record.no}</div>,
    },
    {
      title: '用户',
      dataIndex: 'user',
      key: 'user',
      render: (_, record) => (
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
          <span>{record.user.username}</span>
        </div>
      ),
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
        return record.status === 'success' ? (
          <div style={{ color: '#52c41a' }}>支付成功</div>
        ) : (
          <div style={{ color: '#fa541c' }}>未支付/支付失败</div>
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'creationTime',
      key: 'creationTime',
      render: (_, record) => <div>{record.created_time}</div>,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <div style={{ display: 'flex' }}>
          <Button danger>
            <Popconfirm
              title="确定删除吗？"
              onConfirm={() => {
                delOrder(record.id);
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
      children: (
        <Table
          dataSource={orderList}
          columns={columns}
          pagination={{
            simple: true,
            total: count,
            pageSize: 5,
            showSizeChanger: false,
            onChange: pagingRequest,
          }}
        />
      ),
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
}

export default Order;
