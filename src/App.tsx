import React, { Suspense, useState } from 'react';
import { Layout } from 'antd';
import SiderView from './view/layout/sider/sider';
import HeaderView from './view/layout/header/header';
import ContentView from './view/layout/content/content';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Layout hasSider>
        <SiderView />
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <HeaderView />
            <ContentView />
          </Suspense>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
