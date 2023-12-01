import React, { Suspense } from 'react';
import { Layout, Spin } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

function ContentView() {
  console.log('content');

  return (
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        background: '#fff',
      }}
    >
      <Suspense
        fallback={
          <Spin
            size="large"
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        }
      >
        <Outlet />
      </Suspense>
    </Content>
  );
}

export default ContentView;
