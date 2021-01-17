import React, { useCallback, useEffect, useState } from 'react';
import { Button, Drawer, Select } from 'antd';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { SectionChildren } from '../../../types';
import { setSectionChild, editSectionChild } from '../../../slices/actions';
import { id } from '../../../utils';
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

  const dispatch = useDispatch();

  const [drawerIsOpened, setIsOpened] = useState(false);

  const handleSetEditable = useCallback(
    (child) => {
      setEditable(child);
      setIsOpened(true);
    },
    [setEditable]
  );

  const resetEditable = useCallback(() => {
    setEditable(null);
    setIsOpened(false);
  }, [setEditable, setIsOpened]);

  const handleChange = useCallback(
    (value) => {
      setSelected(value);
    },
    [setSelected]
  );

  const onSubmit = useCallback(
    (child) => {
      const childWithId = { ...child, id: child?.id || id() };

      const payload = {
        child: childWithId,
        activeSection
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
      setSectionChild,
      editSectionChild,
      activeSection,
      setIsOpened,
      editableChild
    ]
  );

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
        <Button
          type="primary"
          onClick={() => setIsOpened(true)}
          style={{ width: 120 }}
        >
          Добавить
        </Button>
      </div>

      <ChildrenTable
        onEdit={handleSetEditable}
        activeSectionName={activeSection}
      />

      <Drawer
        title={editableChild ? 'Редактировать элемент' : 'Добавить элемент'}
        placement="right"
        closable={false}
        width="80%"
        onClose={() => setIsOpened(false)}
        visible={drawerIsOpened}
      >
        {selected === SectionChildren.THEORY && (
          <TheoryComponent
            onSubmit={onSubmit}
            content={editableChild}
            open={drawerIsOpened}
          />
        )}
        {selected === SectionChildren.VIDEO && (
          <Video onSubmit={onSubmit} open={drawerIsOpened} />
        )}
        {selected === SectionChildren.TEST && (
          <TestComponent onSubmit={onSubmit} />
        )}
      </Drawer>
    </React.Fragment>
  );
};

export default AddSectionChild;
