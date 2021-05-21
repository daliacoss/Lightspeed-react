import React from "react";
import { useSocket } from "../context/SocketContext";
import {
  ChatContainer,
  ChatMain,
  ChatHeading,
  ChatBody,
  ChatMessageWindow,
  ChatUserName,
  ChatUserNameTextBox,
  ChatComposerForm,
  ChatComposerButton,
  ChatComposerTextBox,
  ChatMessage,
  ChatMessageAuthor
} from "../styles/liveChatStyles";

const formatMessageList = (chatMessages) => {
  return chatMessages.map(x => `${x.author}: ${x.message}`);
}
            {/*formatMessageList(chatMessages).map((x,i) => (
              <ChatMessage key={`chat-message-${i}`}>{x}</ChatMessage>
            ))*/}

const LiveChat = ({chatMessages, disable}) => {

  const [messageText, setMessageText] = React.useState("");
  const [userName, _setUserName] = React.useState(
    `User-${Math.random().toString(16).substr(2,6)}`
  );
  const setUserName = (v) => {
    _setUserName(v.replace(/^\s+|\s+$/g, '').replace(/(?:\s)/g, "-"));
  }
  const { socket } = useSocket();

  const submitMessage = () => {
    const strippedText = messageText.replace(/^\s+|\s+$/g, '').replace(/(?:\r\n|\r|\n)/g, " ");
    if (!strippedText || !userName) {
      return;
    }
    const msg = {event: "chat", data: {"author": userName, "message": strippedText}};
    socket.send(JSON.stringify(msg));
    setMessageText("");
  }

  const handleSendButtonClick = (e) => {
    e.preventDefault();
    submitMessage();
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  }
  
  const handleComposerChange = (e) => {
    setMessageText(e.target.value);
  };

  const handleComposerKeyDown = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false){
      e.preventDefault();
      submitMessage();
    }
  }

  const chatMessageWindowRef = React.useRef(null);
  const chatContainerRef = React.useRef(null);

  React.useEffect( () => {
    chatMessageWindowRef.current.scrollTop = chatMessageWindowRef.current.scrollHeight;
  }, [chatMessages]);


  return (
    <ChatContainer className="chat-container" ref={chatContainerRef}>
      <ChatMain>
        <ChatHeading>
          <h6>Live Chat Room</h6>
          {/*<i className="fas fa-long-arrow-up arrow"></i>*/}
        </ChatHeading>

        <ChatBody className="chat-body">
          <ChatUserName>
            <label htmlFor="username">User name</label>
            <ChatUserNameTextBox
              type="text"
              id="username"
              value={userName}
              onChange={handleUserNameChange}
            ></ChatUserNameTextBox>
          </ChatUserName>
          <ChatMessageWindow
            id="main-chat-message-window"
            className="chat-message-window"
            disabled={true}
            ref={chatMessageWindowRef}
          >
            {chatMessages.map((x, i) => {
              return (
                <ChatMessage key={`chat-message-${i}`}>
                  <ChatMessageAuthor>{x.author}:</ChatMessageAuthor> {x.message}
                </ChatMessage>
              )
            })}
          </ChatMessageWindow>
          <ChatComposerForm className="chat-composer-form">
            <ChatComposerTextBox
              type="text"
              id="chat-message-input"
              aria-label="Compose message"
              onChange={handleComposerChange}
              onKeyDown={handleComposerKeyDown}
              value={messageText}
              disabled={disable}
            ></ChatComposerTextBox>
            <ChatComposerButton
              onClick={handleSendButtonClick}
              disabled={disable}
            >Send</ChatComposerButton>
          </ChatComposerForm>
        </ChatBody>
      </ChatMain>
    </ChatContainer>
  );
};

export default LiveChat;

LiveChat.propTypes = {
  chatMessages: PropTypes.array,
  disable: PropTypes.bool,
};
