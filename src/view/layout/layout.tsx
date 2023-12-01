import React from 'react';
import { Layout } from 'antd';
import SiderView from './sider/sider';
import HeaderView from './header/header';
import ContentView from './content/content';
import './layout.less';

const { Footer } = Layout;

function LayoutView() {
  return (
    <div className="layout">
      <Layout hasSider>
        <SiderView />
        <Layout>
          <HeaderView />
          <ContentView />
          <Footer
            style={{
              textAlign: 'center',
              color: 'rgba(0, 0, 0, 0.88)',
              fontSize: '14px',
            }}
          >
            陶瓷直播间后台管理系统@2023-11-29
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default LayoutView;
