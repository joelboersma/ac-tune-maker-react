import React, { FC } from 'react';
import {NoteSlider, SliderValue} from '../NoteSlider/NoteSlider';
import './NoteSliderTable.scss'

const NoteSliderTable: FC = () => {
  let sliderVals: SliderValue[] = Array(16).fill(0);
  
  return (
    <div className="NoteSliderTable">
      {
        sliderVals.map((val, index) => <NoteSlider key={index} value={val}/>)
      }
    </div>
  );
}

export default NoteSliderTable;