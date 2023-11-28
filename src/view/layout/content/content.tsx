import React from 'react';
import { Layout } from 'antd';

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
      Content
    </Content>
  );
}

export default ContentView;
