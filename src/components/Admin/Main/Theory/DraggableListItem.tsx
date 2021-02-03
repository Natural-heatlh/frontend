import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Tooltip } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import styled from 'styled-components';

const type = 'DragableUploadList';

const Item = styled.div<{
  isOver?: boolean;
  isOverType?: string;
}>`
  ${(props) =>
    props.isOver &&
    props.isOverType === 'up' &&
    `
    &:before{
      content: '';
      display: block;
      height: 22px;
      width: 100%;
      border: 1px dashed #000;
    }
    `}

  ${(props) =>
    props.isOver &&
    props.isOverType === 'down' &&
    `
    &:after{
      content: '';
      display: block;
      height: 22px;
      width: 100%;
      border: 1px dashed #000;
    }`
}
`;

type Props = {
  originNode: React.ReactElement;
  moveRow: (
    fileList: UploadFile[],
    dragIndex: number,
    hoverIndex: number
  ) => void;
  file: UploadFile;
  fileList: UploadFile[];
};

const DraggableUploadListItem = ({
  originNode,
  moveRow,
  file,
  fileList
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const index = fileList.indexOf(file);
  const [{ isOver, isOverType }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        isOverType: dragIndex < index ? 'down' : 'up'
      };
    },
    drop: (item: any) => {
      moveRow(fileList, item.index, index);
    }
  });

  const [, drag] = useDrag({
    item: { type, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  drop(drag(ref));

  const errorNode = (
    <Tooltip title="Upload Error" getPopupContainer={() => document.body}>
      {originNode.props.children}
    </Tooltip>
  );

  return (
    <React.Fragment>
      <Item
        ref={ref}
        isOver={isOver}
        isOverType={isOverType}
        style={{
          cursor: 'move'
        }}
      >
        {file.status === 'error' ? errorNode : originNode}
      </Item>
    </React.Fragment>
  );
};

export default DraggableUploadListItem;
