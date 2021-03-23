import React from 'react';
import NoteSlider from '../NoteSlider/NoteSlider';

function NoteSliderTable() {
  return (
    <div className="NoteSliderTable">
      <div className="NoteSliderTableRow">
        <NoteSlider/>
        <NoteSlider/>
        <NoteSlider/>
        <NoteSlider/>
      </div>
      <div className="NoteSliderTableRow">
        <NoteSlider/>
        <NoteSlider/>
        <NoteSlider/>
        <NoteSlider/>
      </div>
    </div>
  );
}

export default NoteSliderTable;