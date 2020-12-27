import React from 'react';
import Slider from '../Slider';
import AudioPlayer from '../Audio';
import { Slide, Theory as TheoryType } from '../../graphql';
import TheoryContent from './TheoryContent';

type Props = {
  lecture?: TheoryType;
  addProgress: () => void;
  isCompleted?: boolean;
};

const Theory = ({ lecture, addProgress, isCompleted }: Props) => {
  console.log(lecture);
  return (
    <>
      {lecture?.slides ? (
        <Slider
          addProgress={addProgress}
          isCompleted={isCompleted}
          slides={lecture?.slides as Slide[]}
        />
      ) : null}
      {lecture?.content ? (
        <TheoryContent>{lecture.content}</TheoryContent>
      ) : null}
      <AudioPlayer
        addProgress={addProgress}
        isCompleted={isCompleted}
        url={lecture?.audio}
      />
    </>
  );
};

export default Theory;
