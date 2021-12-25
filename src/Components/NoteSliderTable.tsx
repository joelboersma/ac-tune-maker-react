import { FC } from 'react';
import NoteSlider from './NoteSlider';
import Note from '../Modules/Note';
import './styles/NoteSliderTable.scss'

interface NoteSliderTableProps {
  notes: Note[]
  sliderOnChange: Function
  disabled: boolean
}

const NoteSliderTable: FC <NoteSliderTableProps> = (props: NoteSliderTableProps) => {
  return (
    <div className="NoteSliderTable">
      {
        props.notes.map((note) => 
          <NoteSlider 
            key={note.id}
            id={note.id}
            value={note.value} 
            onChange={props.sliderOnChange}
            disabled={props.disabled}
          />
        )
      }
    </div>
  );
}

export default NoteSliderTable;