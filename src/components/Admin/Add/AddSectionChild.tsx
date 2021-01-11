import React, { useCallback, useState } from 'react';
import { Button, Drawer, Select } from 'antd';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { SectionChildren } from '../../../types';
import { setSectionChild } from '../../../slices/actions';
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

  const dispatch = useDispatch();

  const [drawerIsOpened, setIsOpened] = useState(false);

  const handleChange = useCallback(
    (value) => {
      setSelected(value);
    },
    [setSelected]
  );

  const handleAddChild = useCallback(
    (child) => {
      const payload = {
        child,
        activeSection
      };
      dispatch(setSectionChild(payload));
      setIsOpened(false);
    },
    [dispatch, activeSection]
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
        <Button type="primary" onClick={() => setIsOpened(true)} style={{ width: 120 }}>
          Добавить
        </Button>
      </div>
      <Drawer
        title="Добавить элемент"
        placement="right"
        closable={false}
        width="80%"
        onClose={() => setIsOpened(false)}
        visible={drawerIsOpened}
      >
        {selected === SectionChildren.THEORY && (
          <TheoryComponent handleAddChild={handleAddChild} open={drawerIsOpened} />
        )}
        {selected === SectionChildren.VIDEO && (
          <Video handleAddChild={handleAddChild} open={drawerIsOpened} />
        )}
        {selected === SectionChildren.TEST && (
          <TestComponent handleAddChild={handleAddChild} />
        )}
      </Drawer>
    </React.Fragment>
  );
};

export default AddSectionChild;
