/* eslint-disable jsx-a11y/anchor-is-valid */
import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import {
  ProConfigProvider,
  ProForm,
  ProFormText,
} from '@ant-design/pro-components';
import React from 'react';
import { message, theme } from 'antd';
import './index.less';
import { useNavigate } from 'react-router';
import instance from '../../../request/api';

function Registration() {
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const registrationAdmin = async (values: any) => {
    const { password, username, mobile } = values;
    console.log(values);

    await instance
      .post('/admin/manager/save', { username, password, mobile })
      .then(res => {
        if (res) {
          const { status, data } = res;
          if (status === 200 && data.result) {
            navigate('/');
            message.success('注册成功');
          }
        }
      });
  };

  return (
    <ProConfigProvider hashed={false}>
      <div
        className="registration"
        style={{
          backgroundColor: token.colorBgContainer,
        }}
      >
        <ProForm
          onFinish={async values => {
            registrationAdmin(values);
          }}
        >
          <h2>新用户注册</h2>
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className="prefixIcon" />,
            }}
            placeholder="用户名"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <ProFormText
            fieldProps={{
              size: 'large',
              prefix: <MobileOutlined className="prefixIcon" />,
            }}
            name="mobile"
            placeholder="手机号"
            rules={[
              {
                required: true,
                message: '请输入手机号！',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误！',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className="prefixIcon" />,
              strengthText:
                '密码由数字、字母和特殊字符组成，长度至少为8个字符。',

              // eslint-disable-next-line react/no-unstable-nested-components
              statusRender: value => {
                const getStatus = () => {
                  if (value && value.length > 12) {
                    return 'ok';
                  }
                  if (value && value.length > 6) {
                    return 'pass';
                  }
                  return 'poor';
                };
                const status = getStatus();
                if (status === 'pass') {
                  return (
                    <div style={{ color: token.colorWarning }}>强度：中</div>
                  );
                }
                if (status === 'ok') {
                  return (
                    <div style={{ color: token.colorSuccess }}>强度：强</div>
                  );
                }
                return <div style={{ color: token.colorError }}>强度：弱</div>;
              },
            }}
            placeholder="密码"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <a
              style={{
                marginBottom: '24px',
              }}
              href="#"
              onClick={() => navigate('/login')}
            >
              已有账号去登陆
            </a>
          </div>
        </ProForm>
      </div>
    </ProConfigProvider>
  );
}

export default Registration;
