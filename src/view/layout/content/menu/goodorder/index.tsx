/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Table, Tabs, TabsProps, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import instance from '../../../../../request/api';
import { imgUrl } from '../../../../../request/config';

interface IUSERINOF {
  username: string; // 用户名
  avatar: string; // 用户头像
}
interface IGOOD {
  goodtitle: string; // 商品描述
}

interface IColumnsType {
  id: number; // ID
  price: number; // 价格
  status: string; // 支付状态
  goods_num: number; // 购买商品数量
  goodcover: string; // 商品入口图片
  total_price: number; // 总价
  user: IUSERINOF; // 用户数据
  good: IGOOD; // 商品数据
  created_time: string; // 创建时间
}

function GoodOrder(): React.ReactElement {
  const [count, setCount] = useState<number>(1); // 数据总数
  const [currentPage, setCurrentPage] = useState<number>(1); // 当前页
  const [goodOrderList, setGoodOrderList] = useState<IColumnsType[]>([]);

  const getGoodOrderList = async (page: number = 1, limit: number = 5) => {
    await instance
      .get(`/admin/order/getGoodorderList?page=${page}&limit=${limit}`)
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
      `/admin/order/delGoodorder/${id}`
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
      title: '购买者',
      dataIndex: 'user',
      key: 'user',
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={imgUrl + record.user.avatar}
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
      title: '购买商品',
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
          <span>{record.good?.goodtitle}</span>
        </div>
      ),
    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
      render: (_, record) => <div>{record.price}</div>,
    },
    {
      title: '购买数量',
      dataIndex: 'goods_num',
      key: 'goods_num',
      render: (_, record) => <div>{record.goods_num}</div>,
    },
    {
      title: '总价',
      dataIndex: 'total_price',
      key: 'total_price',
      render: (_, record) => <div>{record.total_price}</div>,
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

export default GoodOrder;
