import React, { useCallback, useEffect, useState } from 'react';
import { Button, Drawer, Select, Form } from 'antd';
import { v4 as uuid } from 'uuid';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { SectionChildren } from '../../../types';
import { setSectionChild, editSectionChild } from '../../../slices/actions';
import ChildrenTable from '../Components/ChildrenTable';
import Video from './Video';
import TestComponent from './Test';
import TheoryComponent from './Theory';

const { Option } = Select;

const StyledSelect = styled(Select)`
  width: 120px;
  margin-right: 10px;
`;

type Props = {
  activeSection?: string;
};

const AddSectionChild = ({ activeSection }: Props) => {
  const [selected, setSelected] = useState<SectionChildren>(
    SectionChildren.THEORY
  );
  const [editableChild, setEditable] = useState<any>(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (editableChild) {
      setSelected(editableChild.type);
    }
  }, [editableChild, setSelected]);

  const [drawerIsOpened, setIsOpened] = useState(false);

  const handleSetEditable = useCallback(
    (child) => {
      setEditable(child);
      setIsOpened(true);
    },
    [setEditable, setIsOpened]
  );

  const resetEditable = useCallback(() => {
    setEditable(null);
    setIsOpened(false);
    form.resetFields();
  }, [setEditable, setIsOpened, form]);

  const handleChange = useCallback(
    (value) => {
      setSelected(value);
    },
    [setSelected]
  );

  const onSubmit = useCallback(
    (child) => {
      const childWithId = { ...child, lectureId: child?.lectureId || uuid() };

      const payload = {
        child: childWithId,
        sectionId: activeSection
      };

      if (editableChild) {
        dispatch(editSectionChild(payload));
        resetEditable();
      } else {
        dispatch(setSectionChild(payload));
        setIsOpened(false);
      }
    },
    [
      dispatch,
      resetEditable,
      activeSection,
      setIsOpened,
      editableChild
    ]
  );

  const handleDrawerClose = useCallback(() => {
    setIsOpened(false);
    form.resetFields();
    resetEditable();
  }, [setIsOpened, form, resetEditable]);

  const handleAddChild = useCallback(() => {
    resetEditable();
    setIsOpened(true);
  }, [resetEditable, setIsOpened]);

  return (
    <React.Fragment>
      <div>
        <StyledSelect
          onChange={handleChange}
          defaultValue={SectionChildren.THEORY}
          style={{ width: 220 }}
        >
          <Option value={SectionChildren.THEORY}>
            {SectionChildren.THEORY}
          </Option>
          <Option value={SectionChildren.VIDEO}>{SectionChildren.VIDEO}</Option>
          <Option value={SectionChildren.TEST}>{SectionChildren.TEST}</Option>
        </StyledSelect>
        <Button type="primary" onClick={handleAddChild} style={{ width: 120 }}>
          Добавить
        </Button>
      </div>

      <ChildrenTable
        onEdit={handleSetEditable}
        activeSectionId={activeSection}
      />

      <Drawer
        title={editableChild ? 'Редактировать элемент' : 'Добавить элемент'}
        placement="right"
        closable={false}
        width="80%"
        onClose={handleDrawerClose}
        visible={drawerIsOpened}
      >
        {selected === SectionChildren.THEORY && (
          <TheoryComponent
            onSubmit={onSubmit}
            content={editableChild}
            form={form}
          />
        )}
        {selected === SectionChildren.VIDEO && (
          <Video content={editableChild} onSubmit={onSubmit} form={form} />
        )}
        {selected === SectionChildren.TEST && (
          <TestComponent
            content={editableChild}
            form={form}
            onSubmit={onSubmit}
          />
        )}
      </Drawer>
    </React.Fragment>
  );
};

export default AddSectionChild;
