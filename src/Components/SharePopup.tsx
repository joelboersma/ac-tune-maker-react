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

   return (
      <div id="PopupBackground" className={props.enabled ? '' : 'disabled'}>
         <div className="card">
            <h2>Share</h2>
            <p>Use the link to share your tune!</p>
            <input readOnly={true} value={parseUrl()}></input>
         </div>
      </div>
   )
};

export default SharePopup;
