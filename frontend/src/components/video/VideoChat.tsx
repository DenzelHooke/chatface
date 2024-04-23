import {
  AgoraRTCProvider,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteAudioTracks,
  useRemoteUsers,
  RemoteUser,
  LocalVideoTrack,
} from "agora-rtc-react";
import { useEffect } from "react";

interface Props {
  appID: string;
  channelName: string;
}

const VideoChat = ({ appID, channelName }: Props) => {
  // Grab local client tracks.
  //@ts-ignore
  const { isLoading: isLoadingMic, localMicrophoneTrack } =
    useLocalMicrophoneTrack();
  //@ts-ignore
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();

  // Array that contains all users that join the channel, updates when users leave channel.
  const remoteUsers = useRemoteUsers();

  //   Publish tracks when component mounts, unpublishes when component unmounts.
  usePublish([localMicrophoneTrack, localCameraTrack]);

  //   Joins client to channel and leaves channel when component unmounts.
  useJoin({
    appid: appID,
    channel: channelName,
    token: null,
  });

  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  useEffect(() => {
    if (audioTracks) {
      audioTracks.forEach((track) => track.play());
    }
  }, [audioTracks]);

  return (
    <div>
      <h2>{channelName}</h2>
      <LocalVideoTrack track={localCameraTrack} play={true} />
      {remoteUsers.map((user) => (
        <RemoteUser user={user} />
      ))}
    </div>
  );
};
export default VideoChat;
