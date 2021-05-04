import React, { FC } from 'react';
import NoteSlider from '../NoteSlider/NoteSlider';
import './NoteSliderTable.scss'

const NoteSliderTable: FC = () => {
  return (
    <div className="NoteSliderTable">
      <div className="NoteSliderTableRow" id="Row1">
        <NoteSlider id={0}/>
        <NoteSlider id={1}/>
        <NoteSlider id={2}/>
        <NoteSlider id={3}/>
        <NoteSlider id={4}/>
        <NoteSlider id={5}/>
        <NoteSlider id={6}/>
        <NoteSlider id={7}/>
      </div>
      <div className="NoteSliderTableRow" id="Row2">
        <NoteSlider id={8}/>
        <NoteSlider id={9}/>
        <NoteSlider id={10}/>
        <NoteSlider id={11}/>
        <NoteSlider id={12}/>
        <NoteSlider id={13}/>
        <NoteSlider id={14}/>
        <NoteSlider id={15}/>
      </div>
    </div>
  );
}

export default NoteSliderTable;