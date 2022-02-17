import NoteValue from '../Modules/NoteValue';
import Note from '../Modules/Note';
import './styles/SharePopup.scss'

interface SharePopupProps {
   notes: Note[];
   enabled: boolean;
}

const SharePopup = (props: SharePopupProps) => {
   const parseUrl = () => {
      const NOTE_HEX = props.notes.map(note => note.value.toString(16)).join('');
      return `${window.location.origin}/${NOTE_HEX}`;
   }
   const SHARE_URL = parseUrl()

   const copyUrl = () => {
      navigator.clipboard.writeText(SHARE_URL)
   }

   return (
      <div id="PopupBackground" className={props.enabled ? '' : 'disabled'}>
         <div className="card">
            <h2>Share</h2>
            <p>Use the link to share your tune!</p>
            <input readOnly={true} value={SHARE_URL}></input>
            <button id="CopyButton" onClick={copyUrl}>Copy</button>
         </div>
      </div>
   )
};

export default SharePopup;
