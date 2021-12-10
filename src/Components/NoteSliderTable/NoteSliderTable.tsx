import { FC } from 'react';
import NoteSlider from '../NoteSlider/NoteSlider';
import Note from '../../Modules/Note'
import './NoteSliderTable.scss'

interface NoteSliderTableProps {
  notes: Note[]
  sliderOnChange: Function
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
          />
        )
      }
    </div>
  );
}

export default NoteSliderTable;