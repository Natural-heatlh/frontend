import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { Video as VideoType } from '../../graphql';

type Props = {
  lecture: VideoType;
  addProgress: () => void;
};

const StyledPlayer = styled(ReactPlayer)`
  width: 100%;
  height: 622px;
`;

const Video = ({ lecture, addProgress }: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (addProgress) {
        addProgress();
      }
    }, 1000 * 60 * 2);

    return () => {
      clearTimeout(timer);
    };
  }, [addProgress]);
  return (
    <StyledPlayer width="100%" height="622px" url={lecture.url as string} />
  );
};

export default Video;
