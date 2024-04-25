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
import {
  createMicrophoneAudioTrack,
  createCameraVideoTrack,
} from "agora-rtc-sdk-ng/esm";

import type {
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
} from "agora-rtc-sdk-ng/esm";

import { useEffect, useState } from "react";

interface Props {
  appID: string;
  channelName: string;
}

const VideoChat = ({ appID, channelName }: Props) => {
  const [cameraOn, setCameraOn] = useState(true);
  const [microphoneOn, setMicrophoneOn] = useState(true);

  let audioTrack: IMicrophoneAudioTrack;
  let cameraTrack: ICameraVideoTrack;

  const getTracks = async () => {
    // Grab local client tracks.
    console.log("Getting local tracks");
    audioTrack = await createMicrophoneAudioTrack();
    cameraTrack = await createCameraVideoTrack();
  };

  // Array that contains all users that join the channel, updates when users leave channel.
  const remoteUsers = useRemoteUsers();

  //   Joins client to channel and leaves channel when component unmounts.
  useJoin(
    {
      appid: "b56d676e5b474e97b520bd702c7191a0",
      channel: channelName,
      token: null,
    },
    true
  );

  useEffect(() => {
    getTracks();
  }, []);

  //   Publish tracks when component mounts, unpublishes when component unmounts.
  // usePublish([localMicrophoneTrack, localCameraTrack]);

  const { audioTracks } = useRemoteAudioTracks(remoteUsers);
  // audioTracks.forEach((track) => track.play());

  return (
    <div>
      <h2>{channelName}</h2>
      <div className="flex justify-center">
        <div className="grid grid-cols-2 gap-5 ">
          {cameraTrack && <LocalVideoTrack track={cameraTrack} play={true} />}
          {remoteUsers.map((user) => {
            console.log("USER: ", user);
            return (
              <div
                key={user.uid}
                className="remote-user w-[300px] h-[300px] rounded-md overflow-hidden"
              >
                <RemoteUser user={user} className={`${String(user.uid)}`} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default VideoChat;
