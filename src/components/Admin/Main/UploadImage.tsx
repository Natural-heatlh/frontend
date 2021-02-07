import { Form, message, Upload, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useCallback, useState, useEffect } from 'react';
import { UploadFile } from 'antd/es/upload/interface';
import { UploadChangeParam } from 'antd/lib/upload';
import { v4 as uuid } from 'uuid';
import { usePrevious } from '../../../utils';
import { API_URL } from '../../../helpers/getApiUrl';

interface Props {
  onChange: (value: UploadFile<any> | string) => void;
  imageUrl?: string;
}

const ImageUploader = ({ onChange, imageUrl }: Props) => {
  const [image, updateImage] = useState<any>([]);
  const [isImageExist, setIsImageExist] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>(imageUrl || '');
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);

  useEffect(() => {
    if (imageUrl) {
      updateImage([
        {
          uid: uuid(),
          status: 'done',
          url: imageUrl
        }
      ]);
    }
  }, [imageUrl, updateImage]);

  const beforeUpload = useCallback((file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Вы можете загружать картинку только в формате jpeg/png!');
    }
    return isJpgOrPng;
  }, []);

  const prevState = usePrevious(image);

  useEffect(() => {
    if (prevState?.length !== image.length) {
      if (!image?.length) {
        setIsImageExist(false);
      } else if (image?.length) {
        setIsImageExist(true);
      }
    }
  }, [image, prevState]);

  const handleOnChange = useCallback(
    (info: UploadChangeParam) => {
      const link =
        info?.fileList[info?.fileList?.length - 1]?.response?.fileLocation ||
        '';
      onChange(link);
      updateImage(info.fileList.filter((file) => !!file.status));
    },
    [onChange]
  );

  const handlePreview = useCallback(() => {
    setPreviewImage(image[0]?.response?.fileLocation || image[0]?.url);
    setPreviewVisible(true);
  }, [image]);

  return (
    <Form.Item label="Картинка" name="image">
      <>
        <Upload
          action={`${API_URL}/upload-files`}
          beforeUpload={beforeUpload}
          onChange={handleOnChange}
          fileList={image}
          multiple={false}
          listType="picture-card"
          onPreview={handlePreview}
          withCredentials
        >
          {!isImageExist && <UploadOutlined />}
        </Upload>
        <Modal
          visible={previewVisible}
          title="Предпросмотр картинки"
          footer={null}
          onCancel={() => setPreviewVisible(false)}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    </Form.Item>
  );
};

export default ImageUploader;
