import Note from '../Modules/Note';
import Popup from './Popup';
import './styles/SharePopup.scss'

interface SharePopupProps {
   notes: Note[];
   enabled: boolean;
   closeHandler: React.MouseEventHandler<HTMLButtonElement>
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
      <Popup enabled={props.enabled} closeHandler={props.closeHandler}>
         <h2>Share</h2>
         <p>Use the link to share your tune!</p>
         <input readOnly={true} value={SHARE_URL}></input>
         <button id="CopyButton" onClick={copyUrl}>Copy</button>
      </Popup>
   )
};

export default SharePopup;
