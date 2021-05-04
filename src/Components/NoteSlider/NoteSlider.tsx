import React, { FC } from 'react'
import ReactSlider from 'react-slider'
import './NoteSlider.scss'

enum SliderValue {
  Sleep,
  Hold,
  g,
  a,
  b,
  c,
  d,
  e,
  f,
  G,
  A,
  B,
  C,
  D,
  E,
  Random
}

interface SliderProps {
  id: number;
  value?: SliderValue;
}

function sliderValueChanged(val: number | number[] | null | undefined) {
  if (val as number >= 0) {
    const num = Number(val)
    console.log('onChange value:', SliderValue[num])
  }
  else {
    console.error("Error: slider returned non-number value:", val, typeof val)
  }
}

const NoteSlider: FC <SliderProps> = (props: SliderProps) => {
  let value;
  if (props.value === undefined) {
    value = 0;
  }
  else {
    value = props.value;
  }
  return (
    <ReactSlider
      className="NoteSlider"
      marks
      min={SliderValue.Sleep}
      max={SliderValue.Random}
      markClassName="SimpleMark"
      thumbClassName="SimpleThumb"
      trackClassName="SimpleTrack"
      orientation="vertical"
      invert
      onChange={sliderValueChanged}
      renderThumb={(props, state) => <div {...props}>{SliderValue[state.valueNow]}</div>}
      value={value}
    />
  );
}

export default NoteSlider;