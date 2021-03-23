import React from 'react'
import ReactSlider from 'react-slider'

function NoteSlider() {
  return (
    <ReactSlider
      className="horizontal-slider"
      marks
      markClassName="example-mark"
      min={0}
      max={9}
      orientation="vertical"
      thumbClassName="example-thumb"
      trackClassName="example-track"
      renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
    />
  );
}

export default NoteSlider;