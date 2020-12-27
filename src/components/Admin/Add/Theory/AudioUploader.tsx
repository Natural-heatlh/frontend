import { Button, Form, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useCallback, useState } from 'react';
import { UploadFile } from 'antd/es/upload/interface';
import { UploadChangeParam } from 'antd/lib/upload';

const AudioUploader = () => {
  const [audioList, updateAudioList] = useState<UploadFile[]>([]);
  const beforeAudioUpload = useCallback((file) => {
    const isAudio = file.type === 'audio/mpeg';
    if (!isAudio) {
      message.error('Вы можете загружать аудио только в формате mp3!');
    }
    return isAudio;
  }, []);

  const handleOnChange = useCallback(
    (info: UploadChangeParam) => {
      updateAudioList(info.fileList.filter((file) => !!file.status));
    },
    [updateAudioList]
  );

  return (
    <Form.Item label="Ссылка на аудио" name="audio">
      <Upload
        action="http://localhost:3000/upload-files"
        multiple={false}
        listType="text"
        beforeUpload={beforeAudioUpload}
        onChange={handleOnChange}
        fileList={audioList}
      >
        <Button icon={<UploadOutlined />}>Загрузить аудио</Button>
      </Upload>
    </Form.Item>
  );
};

export default AudioUploader;
