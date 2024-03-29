import React, { useEffect, useState } from 'react';
import {
  Button,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Table,
  Tabs,
  TabsProps,
  Upload,
  message,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './index.less';
import { RcFile } from 'antd/es/upload';
import instance from '../../../../../request/api';
import { imgUrl } from '../../../../../request/config';

interface IColumnsType {
  id: React.Key;
  name: string;
  coin: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  created_time: string;
  image: string;
}
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片不能超过2MB!');
  }
  return isJpgOrPng && isLt2M;
};

function Gift(): React.ReactElement {
  const [count, setCount] = useState<number>(1); // 数据总数
  const [currentPage, setCurrentPage] = useState<number>(1); // 当前页
  const [currentRow, setCurrentRow] = useState<IColumnsType>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [giftName, setgiftName] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [goldCoin, setGoldCoin] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>();
  const [giftList, setGiftList] = useState<IColumnsType[]>();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const ResetFormData = () => {
    setgiftName('');
    setImageUrl('');
    setGoldCoin(0);
    setFormData(undefined);
    setIsModalOpen(false);
  };

  const pagingRequest = (page: number) => {
    setCurrentPage(page);
    getGiftList(page);
  };

  const delGift = async (id: number): Promise<void> => {
    const { status, data } = await instance.get(`/admin/gift/delete/${id}`);
    if (status === 200) {
      message.success(data.msg);
      getGiftList();
    }
  };

  const columns: ColumnsType<IColumnsType> = [
    {
      title: '礼物',
      dataIndex: 'gift',
      key: 'gift',
      render: (_, record) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={imgUrl + record.image}
              alt={record.name}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                marginRight: '10px',
                border: '1px solid #eee',
              }}
            />
            <div>{record.name}</div>
          </div>
        );
      },
    },
    {
      title: '金币值',
      dataIndex: 'goldCoin',
      key: 'goldCoin',
      render: (_, record) => <div>{record.coin}</div>,
    },
    {
      title: '创建时间',
      dataIndex: 'creationTime',
      key: 'creationTime',
      render: (_, record) => <div>{record.created_time}</div>,
    },
    {
      title: '操作',
      key: 'action',
      width: 400,
      render: (_, record) => (
        <div style={{ display: 'flex' }}>
          <Button
            type="primary"
            ghost
            style={{ marginRight: '10px' }}
            onClick={() => {
              setCurrentRow(record);
              setIsEdit(true);
              setIsModalOpen(true);
            }}
          >
            修改
          </Button>
          <Button danger>
            <Popconfirm
              title="确定删除吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={() => {
                delGift(Number(record.id));
              }}
            >
              <span style={{ cursor: 'pointer', color: '#ff4d4f' }}>删除</span>
            </Popconfirm>
          </Button>
        </div>
      ),
    },
  ];

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '全部',
      children: (
        <Table
          dataSource={giftList}
          columns={columns}
          pagination={{
            simple: true,
            total: count,
            pageSize: 5,
            onChange: pagingRequest,
          }}
        />
      ),
    },
  ];

  const getGiftList = async (page: number = 1, limit: number = 5) => {
    await instance.get(`/admin/gift?page=${page}&limit=${limit}`).then(res => {
      if (res && res.status === 200) {
        const { rows, count } = res.data.result;
        setCount(count);
        setGiftList(rows);
      } else {
        setGiftList([]);
      }
    });
  };

  useEffect(() => {
    getGiftList();
  }, []);

  const onChange = (info: any) => {
    // 获取上传文件的信息
    setLoading(true);
    const { file } = info;

    // 创建FormData对象，并向其中添加文件数据
    const formData = new FormData();
    formData.append('file', file);
    setFormData(formData);

    getBase64(file as RcFile, url => {
      setLoading(false);
      if (isEdit) {
        setCurrentRow(row => ({
          ...row!,
          image: url,
        }));
      } else {
        setImageUrl(url);
      }
    });
  };

  const confirmUpload = async () => {
    if (isEdit) {
      // 修改
      await instance
        .post('/admin/upload', formData)
        .then(async ({ status, data }) => {
          if (status === 200 && data) {
            const imgSrc = data.result.url;
            const res = await instance.post(`/admin/gift/${currentRow?.id}`, {
              id: currentRow?.id,
              name: currentRow?.name,
              image: imgSrc,
              coin: currentRow?.coin,
            });
            if (res.status === 200) {
              message.success(res.data.msg);
              ResetFormData();
              getGiftList();
            }
          }
        })
        .catch(() => {
          ResetFormData();
        });
    } else {
      // 创建
      if (!giftName || !imageUrl || !goldCoin) {
        return;
      }
      if (formData) {
        await instance
          .post('/admin/upload', formData)
          .then(async ({ status, data }) => {
            if (status === 200 && data) {
              const imgSrc = data.result.url;
              const res = await instance.post('/admin/gift/save', {
                name: giftName,
                image: imgSrc,
                coin: goldCoin,
              });
              if (res.status === 200) {
                message.success(res.data.msg);
                ResetFormData();
                getGiftList();
              }
            }
          })
          .catch(() => {
            ResetFormData();
          });
      }
    }
  };

  return (
    <div className="gift">
      <Modal
        title={isEdit ? '修改礼物' : '新增礼物标识'}
        className="giftModal"
        open={isModalOpen}
        onOk={confirmUpload}
        cancelText="取消"
        okText="确定"
        onCancel={() => ResetFormData()}
      >
        {isEdit ? (
          <div>
            <div className="row">
              <h3>礼物名称qq</h3>
              <Input
                value={currentRow?.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setCurrentRow(row => ({
                    ...row!,
                    name: e.target.value,
                  }));
                }}
              />
              {!currentRow?.name && (
                <span className="tip">礼物名称不能为空!</span>
              )}
            </div>

            <div className="row" style={{ height: '70px' }}>
              <h3>礼物图标</h3>
              <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                customRequest={onChange}
              >
                {currentRow?.image ? (
                  <img
                    src={`http://houtai.5xtuding.plus${currentRow?.image}`}
                    alt="avatar"
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                    }}
                  />
                ) : (
                  <div>
                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
              {!currentRow?.image && (
                <span className="tip">礼物图标不能为空!</span>
              )}
            </div>

            <div className="row">
              <h3>金币值</h3>
              <InputNumber
                value={currentRow?.coin}
                onChange={val =>
                  setCurrentRow(row => {
                    return {
                      ...row!,
                      coin: Number(val),
                    };
                  })
                }
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="row">
              <h3>礼物名称</h3>
              <Input
                value={giftName}
                onChange={(e: any) => setgiftName(e.target.value)}
              />
              {!giftName && <span className="tip">礼物名称不能为空!</span>}
            </div>

            <div className="row" style={{ height: '70px' }}>
              <h3>礼物图标</h3>
              <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                customRequest={onChange}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                    }}
                  />
                ) : (
                  <div>
                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
              {!imageUrl && <span className="tip">礼物图标不能为空!</span>}
            </div>

            <div className="row">
              <h3>金币值</h3>
              <InputNumber
                value={goldCoin}
                onChange={val => setGoldCoin(val!)}
              />
            </div>
          </div>
        )}
      </Modal>

      <Button
        type="primary"
        style={{ marginBottom: '20px' }}
        onClick={() => {
          setIsEdit(false);
          setIsModalOpen(true);
        }}
      >
        创建礼物
      </Button>

      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
}

export default Gift;
