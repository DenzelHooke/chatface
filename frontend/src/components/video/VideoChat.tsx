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
  ILocalTrack,
} from "agora-rtc-sdk-ng/esm";

import { useEffect, useState } from "react";

interface Props {
  appID: string;
  channelName: string;
  client: IAgoraRTCClient;
}

const VideoChat = ({ appID, channelName, client }: Props) => {
  const [cameraOn, setCameraOn] = useState(true);
  const [microphoneOn, setMicrophoneOn] = useState(true);

  // const [audioTrack, setAudioTrack] = useState<null | IMicrophoneAudioTrack>(
  //   null
  // );
  // const [cameraTrack, setCameraTrack] = useState<null | ICameraVideoTrack>(
  //   null
  // );

  const [microphoneTrack, setMicrophoneTrack] =
    useState<IMicrophoneAudioTrack | null>();

  // const [cameraTrack, setCameraTrack] = useState<ILocalTrack>();
  let cameraTrack: ILocalTrack;

  const getTracks = async () => {
    // Grab local client tracks.
    console.log("Getting local tracks");
    try {
      client.on("user-published", onRemotePublish);

      await Promise.all([
        createMicrophoneAudioTrack(),
        createCameraVideoTrack(),
      ]).then((data) => {
        console.log("Playing local camera");
        setMicrophoneTrack(data[0]);
        cameraTrack = data[1];
        data[1].play("local-camera");
        data[0].play();
      });
    } catch (error) {
      console.error("Error retrieving tracks");
    }

    return {
      microphoneTrack,
      cameraTrack,
    };
  };

  const joinChannel = async (appID: string, channelName: string) => {
    try {
      console.log("Joining channel ", channelName);

      return await client.join(appID, channelName, null);
    } catch (error) {
      console.error("Error while joining channel");
      console.error(error);
    }
  };

  const publishTracks = async () => {
    try {
      console.log(cameraTrack);
      await client.publish(cameraTrack);
      if (cameraTrack) {
        console.log("Publishing camera track to channel");
      }

      // if (microphoneTrack) {
      //   console.log("Publishing audio track to channel");
      //   await client.publish(microphoneTrack);
      // }
    } catch (error) {
      console.error("Error while publishing tracks");
      console.error(error);
    }

    return true;
  };
  // Array that contains all users that join the channel, updates when users leave channel.
  // const remoteUsers = useRemoteUsers();

  //   Joins client to channel and leaves channel when component unmounts.
  // useJoin(
  //   {
  //     appid: "b56d676e5b474e97b520bd702c7191a0",
  //     channel: channelName,
  //     token: null,
  //   },
  //   true
  // );

  const onRemotePublish = async (
    user: IAgoraRTCRemoteUser,
    mediaType: "video" | "audio"
  ) => {
    console.log("remote user connecting!!", user, mediaType);
    if (mediaType == "video") {
      const remoteTrack = await client.subscribe(user, mediaType);
      //! Generate UUID and create a new element for this remote track
      remoteTrack.play("remote");
    }

    if (mediaType == "audio") {
      const remoteTrack = await client.subscribe(user, mediaType);

      remoteTrack.play();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getTracks();

        await joinChannel(appID, channelName);

        await publishTracks();
      } catch (error) {
        console.error("Error fetching data for agora");
        console.log(error);
      }
    };

    fetchData();
  }, []);

  //   Publish tracks when component mounts, unpublishes when component unmounts.
  // usePublish([localMicrophoneTrack, localCameraTrack]);

  // const { audioTracks } = useRemoteAudioTracks(remoteUsers);
  // audioTracks.forEach((track) => track.play());

  return (
    <div>
      <h2>{channelName}</h2>
      <div className="flex justify-center">
        <div className="grid grid-cols-2 gap-5 ">
          <div
            id="local-camera"
            className="h-[400px] w-[500px] object-fill rounded-lg overflow-hidden"
          >
            1
          </div>
          <div
            id="remote"
            className="h-[400px] w-[500px] object-fill rounded-lg overflow-hidden"
          >
            2
          </div>
          {/* {remoteUsers.map((user) => {
            console.log("USER: ", user);
            return (
              <div
                key={user.uid}
                className="remote-user w-[300px] h-[300px] rounded-md overflow-hidden"
              >
                <RemoteUser user={user} className={`${String(user.uid)}`} />
              </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
};
export default VideoChat;
