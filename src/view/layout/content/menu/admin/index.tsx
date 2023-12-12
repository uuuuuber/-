import { Button, Input, Modal, Popconfirm, message } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import './index.less';
import instance from '../../../../../request/api';
import useStore from '../../../../../store';
import { IAdminDataType } from '../../../../../Interfaces/IAdminStore';

function Admin() {
  const [count, setCount] = useState<number>(1); // 数据总数
  const [currentPage, setCurrentPage] = useState<number>(1); // 当前页
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { adminList, setAdminDataList } = useStore().adminStore;

  const columns: ColumnsType<IAdminDataType> = [
    {
      title: '用户',
      key: 'username',
      dataIndex: 'username',
      render: (_, record) => <span>{record.username}</span>,
    },
    {
      title: '创建时间',
      key: 'created_time',
      dataIndex: 'created_time',
      render: (_, record) => <span>{record.created_time}</span>,
    },
    {
      title: '操作',
      key: 'action',
      width: 400,
      render: (_, record) => (
        <Button danger>
          <Popconfirm
            title="确定删除吗？"
            okText="确定"
            cancelText="取消"
            onConfirm={() => {
              delAdmin(record.id);
            }}
          >
            <span style={{ cursor: 'pointer', color: '#ff4d4f' }}>删除</span>
          </Popconfirm>
        </Button>
      ),
    },
  ];

  const getAdminList = async (page: number = 1, limit: number = 10) => {
    await instance
      .get(`/admin/manager?page=${page}&limit=${limit}`)
      .then(res => {
        if (res && res.status === 200) {
          const { rows, count } = res.data.result;
          setCount(count);
          setAdminDataList(rows);
        }
      });
  };

  useEffect(() => {
    getAdminList();
  }, []);

  const setAdminList = async () => {
    if (!username && !password) {
      message.error('请输入账号或密码');
      return;
    }
    const { status, data } = await instance.post('/admin/manager/save', {
      username,
      password,
    });
    if (status === 200) {
      setUsername('');
      setPassword('');
      setAdminDataList([data.result, ...adminList]);
      message.success(data.msg);
      setIsModalOpen(false);
    }
  };

  const pagingRequest = (page: number) => {
    setCurrentPage(page);
    getAdminList(page);
  };

  const delAdmin = async (id: number) => {
    const { status, data } = await instance.get(`/admin/manager/delete/${id}`);
    if (status === 200) {
      message.success(data.msg);
    }
    getAdminList(currentPage);
  };

  return (
    <div className="admin">
      <h2>直播间服务器情况</h2>
      <div className="adminTable">
        <Button
          type="primary"
          style={{ marginBottom: '20px' }}
          onClick={() => setIsModalOpen(true)}
        >
          创建管理员
        </Button>
        <Table
          columns={columns}
          dataSource={adminList}
          pagination={{ total: count, pageSize: 10, onChange: pagingRequest }}
        />
      </div>
      <Modal
        title="新增管理员"
        open={isModalOpen}
        onOk={setAdminList}
        cancelText="取消"
        okText="确定"
        onCancel={() => setIsModalOpen(false)}
      >
        <div className="row">
          <span className="lable">
            账号 <span style={{ color: '#ff4d4f' }}>*</span>
          </span>
          <Input value={username} onChange={e => setUsername(e.target.value)} />
          {!username && <span className="tip">账号不能为空!</span>}
        </div>

        <div className="row">
          <span className="lable">
            账号 <span style={{ color: '#ff4d4f' }}>*</span>
          </span>
          <Input value={password} onChange={e => setPassword(e.target.value)} />
          {!password && <span className="tip">密码不能为空!</span>}
        </div>
      </Modal>
    </div>
  );
}

export default observer(Admin);
