import { FC } from 'react'
import ReactSlider from 'react-slider'
import NoteValue from '../Modules/NoteValue'
import Note from '../Modules/Note'
import './styles/NoteSlider.scss'

interface NoteSliderProps {
  key: number;
  id: number;
  value?: NoteValue;
  onChange: Function;
}

const NoteSlider: FC <NoteSliderProps> = (props: NoteSliderProps) => {
  const sliderValueChanged = (val: NoteValue) => {
    const newNote: Note = {
      value: val,
      id: props.id
    }
    // console.log(`Slider ${props.id}: ${NoteValue[newNote.value]}`)
    props.onChange(newNote)
  }

  return (
    <ReactSlider
      className="NoteSlider"
      marks
      min={NoteValue.Sleep}
      max={NoteValue.Random}
      markClassName="SimpleMark"
      thumbClassName="SimpleThumb"
      trackClassName="SimpleTrack"
      orientation="vertical"
      invert
      onChange={sliderValueChanged}
      renderThumb={(props, state) => <div {...props}>{NoteValue[state.valueNow]}</div>}
      value={props.value}
    />
  );
}

export default NoteSlider;