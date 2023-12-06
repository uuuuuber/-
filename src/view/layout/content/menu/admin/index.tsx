import { Button, Form, Input, Modal, Popconfirm } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import './index.less';
import instance from '../../../../../request/api';

interface IDataType {
  key: React.Key;
  user: string;
  createdTime: string;
}
type FieldType = {
  username?: string;
  password?: string;
};

const columns: ColumnsType<IDataType> = [
  {
    title: '用户',
    dataIndex: 'user',
    render: (_, record) => <span>{record.user}</span>,
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    render: (_, record) => <span>{record.createdTime}</span>,
  },
  {
    title: '操作',
    key: 'action',
    width: 400,
    render: (_, record) => (
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
    ),
  },
];

const data: IDataType[] = [
  {
    key: 1,
    user: '用户1',
    createdTime: '222',
  },
];

function Admin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const getAdminList = () => {
    instance.get('/admin/manager').then(res => console.log(res));
  };
  return (
    <div className="admin">
      <h2>直播间服务器情况</h2>
      <div className="adminTable">
        <Button
          type="primary"
          style={{ marginBottom: '20px' }}
          onClick={showModal}
        >
          创建管理员
        </Button>
        <Table columns={columns} dataSource={data} />
      </div>
      <Modal
        title="新增管理员"
        open={isModalOpen}
        onOk={getAdminList}
        cancelText="取消"
        okText="确定"
        onCancel={() => setIsModalOpen(false)}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          autoComplete="off"
          onFinish={values => {
            console.log('Success:', values);
          }}
          onFinishFailed={e => console.log('Failed:', e)}
        >
          <Form.Item<FieldType>
            label="账号"
            name="username"
            rules={[{ required: true, message: '请输入账号!' }]}
          >
            <Input
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Admin;
