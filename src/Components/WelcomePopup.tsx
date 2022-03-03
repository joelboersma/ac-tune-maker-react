import React from 'react'
import Popup from './Popup'
import Note from '../Modules/Note'
import './styles/WelcomePopup.scss'
import NoteValue from '../Modules/NoteValue'

interface SharePopupProps {
   enabled: boolean;
   closeHandler: React.MouseEventHandler<HTMLButtonElement>;
   notes: Note[]
}

enum WelcomeMessage {
   scratch = "This is the React Tune Maker! Move the sliders to create your tune, and click the \"Play\" button to listen. Use the \"Share\" button to share your tune with your friends!",
   sharedSong = "Someone shared a song with you! Close this popup and click the \"Play\" button to hear their tune!"
}

const WelcomePopup = (props: SharePopupProps) => {
   const welcomeMessage = (() => {
      const ALL_SLEEPS = props.notes.map(note => note.value === NoteValue.Sleep).reduce((_, cur) => cur === true);
      return ALL_SLEEPS ? WelcomeMessage.scratch : WelcomeMessage.sharedSong;
   })();

   return (
      <Popup enabled={props.enabled} closeHandler={props.closeHandler}>
         <h2>Welcome!</h2>
         <p>{welcomeMessage}</p>
         <button id="StartButton" onClick={props.closeHandler}>Get Started</button>
      </Popup>
   )
}

export default WelcomePopup