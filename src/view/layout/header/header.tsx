import React from 'react';
import { Layout, Button } from 'antd';
import { MenuFoldOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import useStore from '../../../store/index';

const { Header } = Layout;
function HeaderView() {
  const { collapsed, setCollapsed } = useStore().globalStore;

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
    </Header>
  );
}

export default observer(HeaderView);
