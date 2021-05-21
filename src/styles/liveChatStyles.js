import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  color: #fff;
  margin: 0 0.5em;
  max-width: 400px;
  flex: 0 0 400px;

  @media only screen and (max-width: 1024px) {
    margin: 1em 0.3em;
    width: unset;
    height: 500px;
    max-width: 100%;
    flex: unset;
  }
`;

export const ChatMain = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: #242731;
  border: 0.5px solid rgba(240, 243, 246, 0.2);
  border-radius: 32px;
`;

export const ChatHeading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;

  h6 {
    margin: 1em 0;
  }

  .arrow {
    margin-top: auto;
    margin-bottom: auto;
    transform: rotate(45deg);
  }
`;

export const ChatBody = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-bottom: 10px;
  width: 90%;
  height: 100%;
  border-top: 0.5px solid rgba(240, 243, 246, 0.1);
  border-radius: 32px;
  padding: 10px;

  i {
    font-weight: 900px;
  }

  @media only screen and (max-width: 1024px) {
    min-height: 300px;
  }
`;

export const ChatUserName = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
`;

export const ChatUserNameTextBox = styled.input`
  width: calc(100% - 8em);
  font-size: 0.8em;
`;

export const ChatMessageWindow = styled.div`
  resize: none;
  flex: 1 1 auto;
  height: 250px;
  margin-bottom: 10px;
  padding: .5em;
  border: 0px;
  background: #000;
  overflow-y: scroll;
  overflow-wrap: break-word;
`;

export const ChatComposerForm = styled.form`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const ChatComposerTextBox = styled.textarea`
  resize: none;
  height: 3em;
  width: calc(100% - 6em);
  border-radius: 10px;
  margin-right: 5px;
  font-family: monospace;
  font-size: 14px;
`;

export const ChatComposerButton = styled.button`
  padding: 4px;
  width: 5em;
  border-radius: 10px;
`;

export const ChatMessage = styled.p`
  font-family: monospace;
  font-size: 14px;
  line-height: 1.5em;
  margin-bottom: 0.25em;
`;

export const ChatMessageAuthor = styled.span`
  font: inherit;
  font-weight: bold;
`;
