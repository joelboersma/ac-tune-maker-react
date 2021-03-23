import React from 'react'
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

function NoteSlider() {
  return (
    <ReactSlider
      className="NoteSlider"
      marks
      markClassName="SimpleMark"
      min={SliderValue.Sleep}
      max={SliderValue.Random}
      orientation="vertical"
      invert
      thumbClassName="SimpleThumb"
      trackClassName="SimpleTrack"
      renderThumb={(props, state) => <div {...props}>{SliderValue[state.valueNow]}</div>}
    />
  );
}

export default NoteSlider;