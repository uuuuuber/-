/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Table, Tabs, TabsProps, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import instance from '../../../../../request/api';
import { imgUrl } from '../../../../../request/config';

interface IColumnsType {
  id: number; // ID
  price: number; // 价格
  goodcover: string; // 商品入口图片
  goodtitle: string; // 商品描述
  shopmanager: string; // 商家
  created_time: string; // 创建时间
}

function UserGood(): React.ReactElement {
  const [count, setCount] = useState<number>(1); // 数据总数
  const [currentPage, setCurrentPage] = useState<number>(1); // 当前页
  const [goodOrderList, setGoodOrderList] = useState<IColumnsType[]>([]);

  const getGoodOrderList = async (page: number = 1, limit: number = 5) => {
    await instance
      .get(`/admin/order/takeGoods?page=${page}&limit=${limit}`)
      .then(res => {
        if (res && res.status === 200) {
          console.log(res);

          setCount(res.data.result.count);
          setGoodOrderList(res.data.result.rows);
        } else {
          setGoodOrderList([]);
        }
      });
  };

  useEffect(() => {
    getGoodOrderList();
  }, []);

  const delGoodOrderList = async (id: number): Promise<void> => {
    const { status, data } = await instance.get(
      `/admin/order/delTakeGoods/${id}`
    );
    if (status === 200) {
      message.success(data.msg);
      getGoodOrderList();
    }
  };

  const pagingRequest = (page: number) => {
    setCurrentPage(page);
    getGoodOrderList(page);
  };

  const columns: ColumnsType<IColumnsType> = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
      render: (_, record) => <div>{record.id}</div>,
    },
    {
      title: '店家',
      dataIndex: 'shopmanager',
      key: 'shopmanager',
      render: (_, record) => <span>{record.shopmanager}</span>,
    },
    {
      title: '带货商品',
      dataIndex: 'good',
      key: 'good',
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={record.goodcover}
            alt=""
            style={{
              background: 'bule',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              marginRight: '20px',
            }}
          />
          <span>{record.goodtitle}</span>
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
                delGoodOrderList(record.id);
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
          dataSource={goodOrderList}
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

export default UserGood;
