import React, { useCallback, useState } from 'react';
import { Input, Form } from 'antd';
import { Editor } from '@tinymce/tinymce-react';

const Theory = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const editContent = useCallback(
    (content) => {
      setContent(content);
    },
    [setContent]
  );

  return (
    <React.Fragment>
      <Form>
        <Form.Item
          label="Заговок теории"
          name="theoryTitle"
          rules={[
            {
              message: 'Пожалуйста введите заголовок теории!'
            }
          ]}
        >
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>
        <Form.Item label="Контент" name="Content">
          <Editor
            initialValue={content}
            init={{
              height: 250,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help'
            }}
            onEditorChange={editContent}
          />
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};

export default Theory;
