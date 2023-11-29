import React, { Suspense } from 'react';
import { Layout } from 'antd';
import SiderView from './view/layout/sider/sider';
import HeaderView from './view/layout/header/header';
import ContentView from './view/layout/content/content';
import './App.css';

const { Footer } = Layout;

function App() {
  return (
    <div className="app">
      <Layout hasSider>
        <SiderView />
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <HeaderView />
            <ContentView />
          </Suspense>
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

export default App;
