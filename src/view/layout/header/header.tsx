import React from 'react';
import { Layout, Button, FloatButton, Popover, message } from 'antd';
import { MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router';
import useStore from '../../../store/index';
import './index.less';
import instance from '../../../request/api';

const { Header } = Layout;

function HeaderView() {
  const { collapsed, setCollapsed } = useStore().globalStore;
  const { currentAdmin } = useStore().adminStore;
  const navigate = useNavigate();

  const loginOut = async () => {
    await instance.get('/admin/logout').then(res => {
      if (res.status === 200) {
        localStorage.removeItem('currentAdmin');
        navigate('/login');
        message.success(res.data.result);
      }
    });
  };
  const content = (
    <div>
      <p style={{ textAlign: 'center' }}>
        {currentAdmin ? currentAdmin.username : ''}
      </p>
      <Button style={{ border: 'none' }} onClick={loginOut}>
        退出登录
      </Button>
    </div>
  );

  return (
    <Header style={{ padding: 0, background: 'skyblue' }}>
      <Button
        type="text"
        icon={<MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
      <Popover content={content} trigger="hover">
        <FloatButton icon={<UserOutlined />} />
      </Popover>
    </Header>
  );
}

export default observer(HeaderView);
