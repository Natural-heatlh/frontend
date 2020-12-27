import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import {
  PauseOutlined,
  CaretRightOutlined,
  SoundOutlined
} from '@ant-design/icons';
import { RoundButton } from '../Buttons';
import './range.less';

const PlayerWrapper = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 40px;
  padding-right: 25px;
  min-width: 0;
`;

const Seek = styled.input`
  display: block;
  max-width: 100%;
  border: none;
`;

const SeekWrapper = styled.div`
  padding-left: 16px;
  padding-right: 30px;
  max-width: calc(100% - 140px);
  width: 100%;
  display: flex;
  align-items: center;
`;

const VolumeSeek = styled.input`
  margin-left: 10px;
`;

const VolumeWrapper = styled.div`
  max-width: 100px;
  width: 100%;
  display: flex;
  align-items: center;
`;

const StyledButton = styled(RoundButton)`
  padding: 0;
  margin-right: 0;
  min-width: 34px;
`;

const PlayIcon = styled(CaretRightOutlined)`
  color: #fff;
  margin-left: 2px;
`;

const PauseIcon = styled(PauseOutlined)`
  color: #fff;
`;

const SoundIconWrapper = styled.div<{ muted?: boolean }>`
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  margin-right: 8px;
  color: #007d75;
  font-size: 20px;
  position: relative;
  cursor: pointer;

  ${(props) =>
    props.muted &&
    `
    &:after {
      content: '';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 0;
      height: 100%;
      width: 2px;
      background: #007D75;
      transform: rotate(-45deg);
    }
  `}
`;

const Timer = styled.span`
  color: #262626;
  padding-left: 16px;
`;

const format = (seconds: number) => {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds());
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`;
  }
  return `${mm}:${ss}`;
};

const pad = (str: number) => {
  return ('0' + str).slice(-2);
};

const COMPLETE_PERCENT = 80;

type Props = {
  url?: string | null;
  addProgress: () => void;
  isCompleted?: boolean;
};

const AudioPlayer = ({ url, addProgress, isCompleted }: Props) => {
  const ref = useRef<ReactPlayer>(null);
  const [state, setState] = useState({
    url: null,
    controls: false,
    playing: false,
    volume: 0.8,
    muted: false,
    played: 0,
    duration: 0,
    loop: false,
    seeking: false,
    playedSeconds: 0
  });

  const seconds = state.duration * (1 - state.played);

  const handleTogglePlay = () => {
    setState({ ...state, playing: !state.playing });
  };

  const handleVolumeChange = (e: any) => {
    setState({ ...state, volume: parseFloat(e?.target?.value || 0) });
  };

  const handleSeekMouseDown = (e: any) => {
    setState({ ...state, seeking: true });
  };

  const handleSeekChange = (e: any) => {
    setState({ ...state, played: parseFloat(e.target.value) });
  };

  const handleSeekMouseUp = (e: any) => {
    setState({ ...state, seeking: false });
    ref.current?.seekTo(parseFloat(e.target.value));
  };

  const handleDuration = (duration: number) => {
    setState({ ...state, duration });
  };

  const handleProgress = (progressState: any) => {
    if (progressState.played * 100 > COMPLETE_PERCENT && !isCompleted) {
      addProgress();
    }
    setState({ ...state, played: progressState.played });
  };

  const handleMute = () => {
    setState({ ...state, muted: !state.muted });
  };

  return (
    <div>
      <ReactPlayer
        url={url as string}
        width="400px"
        height="50px"
        ref={ref}
        playing={state.playing}
        controls={state.controls}
        volume={state.volume}
        muted={state.muted}
        onDuration={handleDuration}
        onProgress={handleProgress}
      />

      <PlayerWrapper>
        <StyledButton onClick={handleTogglePlay}>
          {!state.playing ? <PlayIcon /> : <PauseIcon />}
        </StyledButton>
        <SeekWrapper>
          <Seek
            type="range"
            min={0}
            max={0.9999999}
            step="any"
            value={state.played}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
          />
          <Timer>{format(seconds)}</Timer>
        </SeekWrapper>
        <VolumeWrapper>
          <SoundIconWrapper muted={state.muted} onClick={handleMute}>
            <SoundOutlined />
          </SoundIconWrapper>
          <VolumeSeek
            type="range"
            className="volume"
            min={0}
            max={1}
            step="any"
            value={state.volume}
            onChange={handleVolumeChange}
          />
        </VolumeWrapper>
      </PlayerWrapper>
    </div>
  );
};

export default AudioPlayer;
