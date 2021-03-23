import React from 'react';
import NoteSlider from '../NoteSlider/NoteSlider';
import './NoteSliderTable.scss'

function NoteSliderTable() {
  return (
    <div className="NoteSliderTable">
      <div className="NoteSliderTableRow" id="Row1">
        <NoteSlider/>
        <NoteSlider/>
        <NoteSlider/>
        <NoteSlider/>
        <NoteSlider/>
        <NoteSlider/>
        <NoteSlider/>
        <NoteSlider/>
      </div>
      <div className="NoteSliderTableRow" id="Row2">
        <NoteSlider/>
        <NoteSlider/>
        <NoteSlider/>
        <NoteSlider/>
        <NoteSlider/>
        <NoteSlider/>
        <NoteSlider/>
        <NoteSlider/>
      </div>
    </div>
  );
}

export default NoteSliderTable;