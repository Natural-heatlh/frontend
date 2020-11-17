import React, { useCallback, useState } from 'react';
import { Input, Form, Button } from 'antd';
import { Editor } from '@tinymce/tinymce-react';

const Video = () => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  // const editContent = useCallback(
  //   (content) => {
  //     setContent(content);
  //   },
  //   [setContent]
  // );

  return (
    <React.Fragment>
      <Form>
        <Form.Item
          label="Заголовок видео"
          name="videoTitle"
          rules={[
            {
              message: 'Пожалуйста введите заголовок видео!'
            }
          ]}
        >
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Ссылка на видео"
          name="videoLink"
        >
          <Input value={link} onChange={(e) => setLink(e.target.value)} />
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};

export default Video;
