import React, { FC } from 'react';
import NoteSlider from '../NoteSlider/NoteSlider';
import './NoteSliderTable.scss'

const NoteSliderTable: FC = () => {
  // TODO: make vals SliderValue type
  let sliderVals: Number[] = Array(16).fill(0);
  
  return (
    <div className="NoteSliderTable">
      {
        sliderVals.map((val, index) => <NoteSlider key={index}/>)
      }
    </div>
  );
}

export default NoteSliderTable;