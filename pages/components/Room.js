import React from "react";
import Controls from "./RoomControls.js/Controls";
import {
  useHMSStore,
  selectLocalPeer,
  selectPeers,
} from "@100mslive/react-sdk";
import VideoTile from "./VideoTile";
import VideoSpaces from "./VideoSpaces";

function Room() {
  const localPeer = useHMSStore(selectLocalPeer);
  const stage = localPeer.roleName === "stage";
  const viewer = localPeer.roleName === "viewer";
  const peers = useHMSStore(selectPeers);

  return (
    <div className=" relative h-screen flex justify-center items-center px-12 bg-slate-800 flex-row gap-8 overflow-hidden">
      <div className=" h-5/6 bg-slate-600 shadow-md w-3/5 rounded-2xl">
        <span className="flex flex-col w-full h-full">
          <div className=" h-3/5 w-full rounded-2xl">{/* Share screen */}</div>
          <span className=" h-2/5 w-full flex flex-col gap-8 py-3 px-5">
            <div className=" flex flex-row w-full gap-28">
              <div className=" text-white w-3/5">
                <h3 className=" text-4xl font-black">Live</h3>
                <h2 className=" text-2xl font-semibold">
                  Live Conference meeting
                </h2>
                <span className="text-2xl mt-4">
                  Welcome {localPeer && localPeer.name}
                </span>
                {/* display users name */}
              </div>
              <div className=" h-40 rounded-xl w-32 flec justify-center items-center">
                {stage
                  ? localPeer && <VideoTile peer={localPeer} isLocal={true} />
                  : peers &&
                    peers
                      .filter((peer) => !peer.isLocal)
                      .map((peer) => {
                        return (
                          <>
                            <VideoTile isLocal={false} peer={peer} />
                          </>
                        );
                      })}
                {/* Room owner video chat */}
              </div>
            </div>
            <div className="w-max px-4 bg-slate-500 h-12 rounded-md">
              {/* Controls */}
              <Controls />
            </div>
          </span>
        </span>
      </div>
      <span className=" z-10 rounded-md w-1/4 h-5/6">
        <div className=" relative h-full w-full">
          {/* Chat interface */}
          <div className=" relative w-full h-full bg-slate-700"></div>
          <div className=" absolute w-full rounded-2xl bottom-0 bg-slate-900 py-3 px-5 flex flex-row gap-4">
            <input
              type="text"
              placeholder="Write a Message"
              className=" focus:outline-none flex-1 px-2 py-3 rounded-md text-white bg-slate-900"
            />
            <button className=" btn flex-1 text-white bg-blue-600 py-3 px-10 rounded-md">
              Send
            </button>
          </div>
        </div>
      </span>
      {/* section for attendees videos chat interface */}
      <div className=" absolute h-full w-1/2 top-0 right-0 bg-slate-900 z-10 py-3 px-6 grid grid-cols-3 gap-3 overflow-y-auto">
        {localPeer && <VideoSpaces peer={localPeer} isLocal={true} />}
        {peers &&
          peers
            .filter((peer) => !peer.isLocal)
            .map((peer) => {
              return (
                <>
                  <VideoSpaces isLocal={false} peer={peer} />
                </>
              );
            })}
      </div>
    </div>
  );
}

export default Room;