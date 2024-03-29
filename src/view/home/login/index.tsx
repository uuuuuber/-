/* eslint-disable jsx-a11y/anchor-is-valid */
import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Tabs, message, theme } from 'antd';
import React, { useState } from 'react';
import './index.less';
import { useNavigate } from 'react-router';
import instance from '../../../request/api';
import useStore from '../../../store';

// type LoginType = 'phone' | 'account';
type LoginType = 'account';

function Login() {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState<LoginType>('account');
  const { setCurrentAdmin } = useStore().adminStore;

  const loginAction = async (values: any) => {
    if (loginType === 'account') {
      const { password, username } = values;
      await instance
        .post('/admin/loginevent', { username, password })
        .then(res => {
          if (res) {
            const { status, data } = res;
            if (status === 200 && data.result) {
              console.log(data.result.token);

              localStorage.setItem('token', data.result.token);
              const current = data.result.manager;
              delete current.password;
              setCurrentAdmin(current);
              navigate('/');
              message.success('登录成功');
            }
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  return (
    <ProConfigProvider hashed={false}>
      <div
        className="login"
        style={{
          backgroundColor: token.colorBgContainer,
        }}
      >
        <LoginForm
          logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
          title="LIVE"
          subTitle="陶瓷直播间后台管理系统"
          onFinish={async values => {
            loginAction(values);
          }}
        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={activeKey => setLoginType(activeKey as LoginType)}
          >
            <Tabs.TabPane key="account" tab="账号密码登录" />
            {/* <Tabs.TabPane key="phone" tab="手机号登录" /> */}
          </Tabs>
          {loginType === 'account' && (
            <>
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
                        <div style={{ color: token.colorWarning }}>
                          强度：中
                        </div>
                      );
                    }
                    if (status === 'ok') {
                      return (
                        <div style={{ color: token.colorSuccess }}>
                          强度：强
                        </div>
                      );
                    }
                    return (
                      <div style={{ color: token.colorError }}>强度：弱</div>
                    );
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
            </>
          )}
          {/* {loginType === 'phone' && (
            <>
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
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className="prefixIcon" />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder="请输入验证码"
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'获取验证码'}`;
                  }
                  return '获取验证码';
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！',
                  },
                ]}
                onGetCaptcha={async () => {
                  message.success('验证码已发送到手机');
                }}
              />
            </>
          )} */}
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <Button
              style={{
                float: 'left',
                marginBottom: '24px',
              }}
              onClick={() => navigate('/registration')}
            >
              去注册
            </Button>
            <a
              style={{
                float: 'right',
                marginBottom: '24px',
              }}
            >
              忘记密码
            </a>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
}

export default Login;
