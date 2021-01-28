import React from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { Video as VideoType } from '../../graphql';

type Props = {
  lecture: VideoType;
};

const StyledPlayer = styled(ReactPlayer)`
  width: 100%;
  height: 622px;
`;

const Video = ({ lecture }: Props) => {
  return (
    <StyledPlayer
      width="100%"
      height="622px"
      url={lecture.url as string}
    />
  );
};

export default Video;
