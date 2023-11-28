import React from 'react';
import { Layout, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Header } = Layout;
function HeaderView() {
  console.log('header');

  return (
    <Header style={{ padding: 0, background: 'skyblue' }}>
      <Button
        type="text"
        icon={<MenuFoldOutlined />}
        onClick={() => {}}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
    </Header>
  );
}

export default HeaderView;
