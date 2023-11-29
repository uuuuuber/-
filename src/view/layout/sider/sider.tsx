import React from 'react';
import { Layout, Menu } from 'antd';
import './sider.less';
import {
  GiftOutlined,
  HomeTwoTone,
  ShoppingCartOutlined,
  TeamOutlined,
  UserAddOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import useStore from '../../../store/index';

const { Sider } = Layout;

function SiderView() {
  const { collapsed } = useStore().globalStore;

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="title">{collapsed ? 'live' : 'live 后台管理'}</div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            icon: <HomeTwoTone twoToneColor="#fff" />,
            label: '主面板',
          },
          {
            key: '2',
            icon: <TeamOutlined twoToneColor="#fff" />,
            label: '用户管理',
          },
          {
            key: '3',
            icon: <VideoCameraOutlined twoToneColor="#fff" />,
            label: '直播间管理',
          },
          {
            key: '4',
            icon: <GiftOutlined twoToneColor="#fff" />,
            label: '礼物管理',
          },
          {
            key: '5',
            icon: <ShoppingCartOutlined twoToneColor="#fff" />,
            label: '订单管理',
          },
          {
            key: '6',
            icon: <UserAddOutlined twoToneColor="#fff" />,
            label: '管理员管理',
          },
        ]}
      />
    </Sider>
  );
}

export default observer(SiderView);
