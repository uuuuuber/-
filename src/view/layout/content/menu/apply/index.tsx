/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Table, Tabs, TabsProps, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import instance from '../../../../../request/api';
import { imgUrl } from '../../../../../request/config';
import morenImg from '../../../../../assets/yh.png';

interface IColumnsType {
  id: number; // ID
  username: string; // 申请人
  avatar: string; // 申请头像
  created_time: string; // 申请时间
}

function Apply(): React.ReactElement {
  const [count, setCount] = useState<number>(1); // 数据总数
  const [currentPage, setCurrentPage] = useState<number>(1); // 当前页
  const [goodOrderList, setGoodOrderList] = useState<IColumnsType[]>([]);

  const getGoodOrderList = async (page: number = 1, limit: number = 5) => {
    await instance
      .get(`/admin/user/ismerchant/1?page=${page}&limit=${limit}`)
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

  const grantRequest = async (id: number): Promise<void> => {
    console.log(typeof id);

    const { status, data } = await instance.post(`/api/becomeMerchant`, {
      id,
      ismerchant: 2,
    });
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
      title: '申请人',
      dataIndex: 'username',
      key: 'username',
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={record.avatar ? imgUrl + record.avatar : morenImg}
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
      title: '申请时间',
      dataIndex: 'creationTime',
      key: 'creationTime',
      render: (_, record) => <div>{record.created_time}</div>,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <div style={{ display: 'flex' }}>
          <Button
            type="primary"
            onClick={() => grantRequest(Number(record.id))}
          >
            <span style={{ cursor: 'pointer' }}>同意</span>
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

export default Apply;
