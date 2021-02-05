import React from 'react';
import Slider from '../Slider';
import AudioPlayer from '../Audio';
import { Slide, Theory as TheoryType } from '../../graphql';
import TheoryContent from './TheoryContent';

type Props = {
  lecture?: TheoryType;
  addProgress: () => void;
  isCompleted?: boolean;
  next?: string | null;
};

const Theory = ({ lecture, addProgress, isCompleted, next }: Props) => {
  return (
    <>
      {lecture?.slides ? (
        <Slider
          addProgress={addProgress}
          isCompleted={isCompleted}
          slides={lecture?.slides as Slide[]}
          next={next}
        />
      ) : null}
      {lecture?.content ? (
        <TheoryContent>{lecture.content}</TheoryContent>
      ) : null}
      {lecture?.audio?.url ? (
        <AudioPlayer
          addProgress={addProgress}
          isCompleted={isCompleted}
          url={lecture?.audio?.url}
        />
      ) : null}
    </>
  );
};

export default Theory;
