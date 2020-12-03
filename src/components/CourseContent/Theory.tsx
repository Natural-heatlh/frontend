import React from 'react';
import Slider from '../Slider';
import AudioPlayer from '../Audio';
import { Slide, Theory as TheoryType } from '../../graphql';
import TheoryContent from './TheoryContent';

type Props = {
  lecture?: TheoryType;
};

const Theory = ({ lecture }: Props) => {
  return (
    <>
      {lecture?.slides ? <Slider slides={lecture?.slides as Slide[]} /> : null}
      {lecture?.content ? (
        <TheoryContent>{lecture.content}</TheoryContent>
      ) : null}
      <AudioPlayer url={lecture?.audio} />
    </>
  );
};

export default Theory;
