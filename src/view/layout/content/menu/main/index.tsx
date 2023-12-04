import React from 'react';
import './index.less';

function Main() {
  return (
    <>
      <h2>直播间服务器情况</h2>
      <div className="status">
        <div className="cad">
          <div className="top">
            <div className="left" style={{ background: 'salmon' }}>
              os
            </div>
            <div className="right">
              <span>arch: x64</span>
            </div>
          </div>
          <div className="bottom">linux</div>
        </div>
        <div className="cad">
          <div className="top">
            <div className="left" style={{ background: '#6bb047' }}>
              cpu
            </div>
            <div className="right">
              <span>num: 1</span>
            </div>
          </div>
          <div className="bottom">speed: 2499</div>
        </div>
        <div className="cad">
          <div className="top">
            <div className="left" style={{ background: '#fcbb29' }}>
              内存
            </div>
            <div className="right">
              <span>总： 1.04GB</span>
            </div>
          </div>
          <div className="bottom">已用： 229MB</div>
        </div>
        <div className="cad">
          <div className="top">
            <div className="left" style={{ background: '#d72d35' }}>
              运行时长
            </div>
          </div>
          <div className="bottom">1分24秒</div>
        </div>
      </div>
    </>
  );
}

export default Main;
