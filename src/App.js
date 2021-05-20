import "./App.css";
import React, { useEffect, useReducer } from "react";
import { useSocket } from "./context/SocketContext";
import { useRTC } from "./context/RTCPeerContext";
import VideoPlayer from "./components/VideoPlayer";
import VideoDetails from "./components/VideoDetails";
import LiveChat from "./components/LiveChat";
import Header from "./components/Header";
import { VideoContainer, MainContainer } from "./styles/appStyles";

const appReducer = (state, action) => {
  switch (action.type) {
    case "initStream": {
      return { ...state, stream: action.stream };
    }
    case "info": {
      return { ...state, viewers: action.viewers };
    }
    case "chat": {
      return { ...state, chat: state.chat.concat(action.chatMessage) };
    }

    default: {
      return { ...state };
    }
  }
};

const initialState = {
  stream: null,
  viewers: null,
  chat: [],
};

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { pc } = useRTC();
  const { socket } = useSocket();

  // Offer to receive 1 audio, and 1 video tracks
  pc.addTransceiver("audio", { direction: "recvonly" });
  // pc.addTransceiver('video', { 'direction': 'recvonly' })
  pc.addTransceiver("video", { direction: "recvonly" });

  pc.ontrack = (event) => {
    const {
      track: { kind },
      streams,
    } = event;

    if (kind === "video") {
      dispatch({ type: "initStream", stream: streams[0] });
    }
  };

  pc.onicecandidate = (e) => {
    const { candidate } = e;
    if (candidate) {
      console.log("Candidate success");
      socket.send(
        JSON.stringify({
          event: "candidate",
          data: e.candidate,
        })
      );
    }
  };

  if (socket) {
    socket.onmessage = async (event) => {
      const msg = JSON.parse(event.data);

      if (!msg) {
        console.log("Failed to parse msg");
        return;
      }

      const offerCandidate = msg.data;

      if (!offerCandidate) {
        console.log("Failed to parse offer msg data");
        return;
      }

      switch (msg.event) {
        case "chat":
          dispatch({"type": "chat", "chatMessage": msg.data});
          return;
        case "offer":
          console.log("Offer");
          pc.setRemoteDescription(offerCandidate);

          try {
            const answer = await pc.createAnswer();
            pc.setLocalDescription(answer);
            socket.send(
              JSON.stringify({
                event: "answer",
                data: answer,
              })
            );
          } catch (e) {
            console.error(e.message);
          }

          return;
        case "candidate":
          console.log("Candidate");
          pc.addIceCandidate(offerCandidate);
          return;
        case "info":
          dispatch({
            type: "info",
            viewers: msg.data.no_connections,
          });
      }
    };
  }

  return (
    <>
      <Header></Header>
      <MainContainer>
        <VideoContainer className="video-container">
          <VideoPlayer src={state.stream} />
          <VideoDetails viewers={state.viewers} />
        </VideoContainer>
        <LiveChat
          chatMessages={state.chat}
          disable={!socket || socket.readyState !== WebSocket.OPEN}
        ></LiveChat>
      </MainContainer>
    </>
  );
};

export default App;
