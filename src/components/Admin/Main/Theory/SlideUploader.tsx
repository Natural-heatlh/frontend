import React, { useCallback, useRef, useState } from 'react';
import { Button, Form, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/es/upload/interface';
import { DndProvider, createDndContext } from 'react-dnd';
import { UploadChangeParam } from 'antd/lib/upload';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { API_URL } from '../../../../helpers/getApiUrl';
import DraggableUploadListItem from './DraggableListItem';

const RNDContext = createDndContext(HTML5Backend);

const swap = (array: any[], moveIndex: number, hoverIndex: number) => {
  const temp = array[moveIndex];
  array.splice(moveIndex, 1);
  array.splice(hoverIndex, 0, temp);

  return [...array];
}

type Props = {
  slides: any;
};

const SlideUploader = ({ slides }: Props) => {
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
      updateSlideList(info.fileList);
    },
    [updateSlideList]
  );

  const moveRow = useCallback(
    (fileList, dragIndex, hoverIndex) => {
      updateSlideList(swap(fileList, dragIndex, hoverIndex));
    },
    [updateSlideList]
  );

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const manager = useRef(RNDContext);

  return (
    <DndProvider manager={manager.current?.dragDropManager as any}>
      <Form.Item
        valuePropName="fileList"
        getValueFromEvent={normFile}
        name="uploadSlides"
        label="Слайды"
      >
        <Upload
          defaultFileList={slides}
          fileList={slideList}
          onChange={handleOnChange}
          beforeUpload={beforeSlideUpload}
          action={`${API_URL}/upload-files`}
          multiple
          itemRender={(originNode, file, currFileList) => (
            <DraggableUploadListItem
              originNode={originNode}
              file={file}
              fileList={currFileList as UploadFile[]}
              moveRow={moveRow}
            />
          )}
        >
          <Button icon={<UploadOutlined />}>Загрузить слайд</Button>
        </Upload>
      </Form.Item>
    </DndProvider>
  );
};

export default SlideUploader;
