import React, { useEffect, useState } from 'react';
import {
  Button,
  InputNumber,
  Popconfirm,
  Table,
  Tabs,
  TabsProps,
  message,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import instance from '../../../../../request/api';

interface IColumnsType extends IServe {
  isedit: boolean;
}

interface IServe {
  id: number;
  username: string;
  coin: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  created_time: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  updated_time: string;
  avatar: string;
}

function User(): React.ReactElement {
  const [userList, setUserList] = useState<IColumnsType[]>([]);
  const [isedit, setIsedit] = useState<boolean>(false);
  const [coinNum, setCoinNum] = useState<number>(0);
  const [count, setCount] = useState<number>(1); // 数据总数
  const [currentPage, setCurrentPage] = useState<number>(1); // 当前页

  const getUserList = async (page: number = 1, limit: number = 8) => {
    await instance.get(`/admin/user?page=${page}&limit=${limit}`).then(res => {
      if (res && res.status === 200) {
        const { rows, count } = res.data.result;
        setCount(count);
        const newRows = rows.map((row: IServe) => {
          return {
            ...row,
            isedit: false,
          };
        });
        setUserList(newRows);
      }
    });
  };

  const edit = async (data: IColumnsType) => {
    await instance
      .post(`/admin/user/edit/${data.id}`, { coinNum })
      .then(res => {
        if (res.status === 200) {
          const updatedUserList = userList.map(user => {
            if (user.id === data.id) {
              return {
                ...user,
                coin: coinNum,
                isedit: false,
              };
            }
            return user;
          });
          setUserList(updatedUserList);
          setCoinNum(0);
          message.success('修改成功');
        }
      });
  };
  const delUser = async (id: number) => {
    const { status, data } = await instance.get(`/admin/user/delete/${id}`);
    if (status === 200) {
      message.success(data.msg);
    }
    getUserList(currentPage);
  };

  const pagingRequest = (page: number) => {
    setCurrentPage(page);
    getUserList(page);
  };

  useEffect(() => {
    getUserList();
  }, []);

  const columns: ColumnsType<IColumnsType> = [
    {
      title: '用户',
      dataIndex: 'user',
      key: 'user',
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
      title: '金币数',
      dataIndex: 'goldCoin',
      width: 345,
      key: 'goldCoin',
      render: (_, record) => {
        return record.isedit ? (
          <InputNumber
            width={200}
            value={record.coin ?? coinNum}
            onChange={val => setCoinNum(Number(val))}
          />
        ) : (
          <div>{record.coin}</div>
        );
      },
    },
    {
      title: '注册时间',
      dataIndex: 'creationTime',
      key: 'creationTime',
      render: (_, record) => <div>{record.created_time}</div>,
    },
    {
      title: '操作',
      key: 'action',
      width: 400,
      render: (_, record) => {
        return record.isedit ? (
          <div style={{ display: 'flex' }}>
            <Button type="primary" ghost onClick={() => edit(record)}>
              确定
            </Button>
            <Button
              type="primary"
              ghost
              style={{ marginLeft: '10px' }}
              onClick={() => {
                setUserList(
                  userList.map(user => {
                    if (user.id === record.id) {
                      return {
                        ...user,
                        isedit: false,
                      };
                    }
                    return user;
                  })
                );
              }}
            >
              取消
            </Button>
          </div>
        ) : (
          <div style={{ display: 'flex' }}>
            <Button
              type="primary"
              ghost
              style={{ marginRight: '10px' }}
              onClick={() => {
                const updatedUserList = userList.map(user => {
                  if (user.id === record.id) {
                    return {
                      ...user,
                      isedit: true,
                    };
                  }
                  return user;
                });
                setUserList(updatedUserList);
              }}
            >
              修改
            </Button>
            <Button danger>
              <Popconfirm
                title="确定删除吗？"
                okText="确定"
                cancelText="取消"
                onConfirm={() => {
                  delUser(record.id);
                }}
              >
                <span style={{ cursor: 'pointer', color: '#ff4d4f' }}>
                  删除
                </span>
              </Popconfirm>
            </Button>
          </div>
        );
      },
    },
  ];

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '全部',
      children: (
        <Table
          dataSource={userList}
          columns={columns}
          pagination={{
            simple: true,
            total: count,
            pageSize: 10,
            onChange: pagingRequest,
          }}
        />
      ),
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
}

export default User;
