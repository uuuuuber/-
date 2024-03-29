import React from 'react';
import { Layout, Menu } from 'antd';
import './sider.less';
import {
  AccountBookOutlined,
  CopyOutlined,
  FormOutlined,
  GiftOutlined,
  HomeTwoTone,
  ShoppingCartOutlined,
  TeamOutlined,
  UserAddOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import useStore from '../../../store/index';

const { Sider } = Layout;

function SiderView() {
  const { collapsed } = useStore().globalStore;
  const navigate = useNavigate();
  const toggleRoute = (item: any) => {
    navigate(item.key);
  };
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="title">{collapsed ? 'live' : 'live 后台管理'}</div>
      <Menu
        theme="dark"
        mode="inline"
        onClick={item => toggleRoute(item)}
        defaultSelectedKeys={['1']}
        items={[
          // {
          //   key: '/main',
          //   icon: <HomeTwoTone twoToneColor="#fff" />,
          //   label: '主面板',
          // },
          {
            key: '/user',
            icon: <TeamOutlined twoToneColor="#fff" />,
            label: '用户管理',
          },
          {
            key: '/room',
            icon: <VideoCameraOutlined twoToneColor="#fff" />,
            label: '直播间管理',
          },
          {
            key: '/gift',
            icon: <GiftOutlined twoToneColor="#fff" />,
            label: '礼物管理',
          },
          {
            key: '/order',
            icon: <ShoppingCartOutlined twoToneColor="#fff" />,
            label: '充值订单管理',
          },
          {
            key: '/goodorder',
            icon: <AccountBookOutlined twoToneColor="#fff" />,
            label: '商品订单管理',
          },
          {
            key: '/apply',
            icon: <CopyOutlined twoToneColor="#fff" />,
            label: '带货申请管理',
          },
          {
            key: '/usergood',
            icon: <FormOutlined twoToneColor="#fff" />,
            label: '主播带货管理',
          },
          {
            key: '/admin',
            icon: <UserAddOutlined twoToneColor="#fff" />,
            label: '管理员管理',
          },
        ]}
      />
    </Sider>
  );
}

export default observer(SiderView);
