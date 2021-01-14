import { Button, Form, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useCallback, useState } from 'react';
import { UploadFile } from 'antd/es/upload/interface';
import { UploadChangeParam } from 'antd/lib/upload';

const SlideUploader = () => {
  const [slideList, updateSlideList] = useState<UploadFile[]>([]);

  const beforeSlideUpload = useCallback((file) => {
    const isImg =
      file.type === 'image/jpeg' ||
      file.type === 'image/jpg' ||
      file.type === 'image/png';
    if (!isImg) {
      message.error(
        'Вы можете загружать только изображения в формате jpg или png!'
      );
    }
    return isImg;
  }, []);

  const handleOnChange = useCallback(
    (info: UploadChangeParam) => {
      console.log(info.fileList.filter(file => console.log(file)));
      updateSlideList(info.fileList.filter((file) => !!file.status));
    },
    [updateSlideList]
  );

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  return (
    <Form.Item
      valuePropName="fileList"
      getValueFromEvent={normFile}
      name="uploadSlides"
      label="Слайды"
    >
      <Upload
        fileList={slideList}
        onChange={handleOnChange}
        beforeUpload={beforeSlideUpload}
        action="http://localhost:3000/upload-files"
      >
        <Button icon={<UploadOutlined />}>Загрузить слайд</Button>
      </Upload>
    </Form.Item>
  );
};

export default SlideUploader;
