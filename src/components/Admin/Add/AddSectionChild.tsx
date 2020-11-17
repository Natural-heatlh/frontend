import React, { useCallback, useState } from 'react';
import { Button, Drawer, Select } from 'antd';
import styled from 'styled-components';
import { SectionChildren } from '../../../types';
import Theory from './Theory';
import Video from './Video';
import Test from './Test';

const { Option } = Select;

const StyledSelect = styled(Select)`
  width: 120px;
  margin-right: 10px;
`;

const AddSectionChild = () => {
  const [selected, setSelected] = useState<SectionChildren>(
    SectionChildren.THEORY
  );

  const [drawerIsOpened, setIsOpened] = useState(false);

  const handleChange = useCallback(
    (value) => {
      setSelected(value);
    },
    [setSelected]
  );

  return (
    <React.Fragment>
      <div>
        <StyledSelect
          onChange={handleChange}
          defaultValue={SectionChildren.THEORY}
          style={{ width: 120 }}
        >
          <Option value={SectionChildren.THEORY}>
            {SectionChildren.THEORY}
          </Option>
          <Option value={SectionChildren.VIDEO}>{SectionChildren.VIDEO}</Option>
          <Option value={SectionChildren.TEST}>{SectionChildren.TEST}</Option>
        </StyledSelect>
        <Button type="primary" onClick={() => setIsOpened(true)}>
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
        {selected === SectionChildren.THEORY && <Theory />}
        {selected === SectionChildren.VIDEO && <Video />}
        {selected === SectionChildren.TEST && <Test />}
      </Drawer>
    </React.Fragment>
  );
};

export default AddSectionChild;
