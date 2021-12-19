import { FC, useRef, useState } from 'react';
import NoteSliderTable from './Components/NoteSliderTable';
import SoundManager from './Components/SoundManager';
import SoundFiles from './Modules/SoundFiles';
import NoteValue from './Modules/NoteValue';
import Note from './Modules/Note';
import './App.scss';

const App: FC = () => {
  const [notes, setNotes] = useState(
    Array(16).fill(0).map((_, i) => new Note(i, 0))
  );
  const [soundsPlaying, setSoundsPlaying] = useState(
    Array<boolean>(SoundFiles.length).fill(false)
  );
  const soundsPlayingRef = useRef(soundsPlaying)

  const setSoundPlaying = (index: number, value?: boolean) => {
    // Howler.stop();
    if (value === undefined) {
      // Set soundsPlaying[i] to true and all others to false
      setSoundsPlaying(soundsPlaying.map((_, i) => 
        i === index
      ));
    }
    else {
      // Set soundsPlaying[i] to @value and leave the others alone
      setSoundsPlaying(soundsPlayingRef.current.map((val, i) => 
        i === index ? value : val
      ));
    }
  }

  const changeNote = async (noteToChange: Note) => {
    playNote(noteToChange.value);
    setNotes(notes.map((note) => 
      note.id === noteToChange.id ? {id: note.id, value: noteToChange.value} : note
    ));
  }

  const playNote = (val: NoteValue, duration: number = 600) => {
    const soundIndexToPlay = val - NoteValue.g;
    setSoundPlaying(soundIndexToPlay, true)
    setTimeout(() => {
      const soundPlaying = soundsPlayingRef.current[soundIndexToPlay]
      console.log(soundPlaying)
      if (soundPlaying) {
        console.log("hi")
        setSoundPlaying(soundIndexToPlay, false)
      }
    }, duration)
  }

  const playSong = () => {
    const noteStrings = notes.map(note => NoteValue[note.value]);
    console.table(noteStrings)
  }

  const reset = async () => {
    setNotes(notes.map((note) => {
      return {id: note.id, value: 0}
    }));
  }

  return (
    <div className="App">
      <header>
        <h1>Animal Crossing Town Tune Maker React</h1>
      </header>
      <main>
        <NoteSliderTable notes={notes} sliderOnChange={changeNote}/>
        <section className="buttonRow">
          <button id="Help">Help</button>
          <button id="Play" onClick={playSong}>Play</button>
          <button id="Reset" onClick={reset}>Reset</button>
        </section>
      </main>
      <footer>
        <a href="https://joelboersma.github.io">Made by Joel Boersma</a>
      </footer>
      <SoundManager soundsPlaying={soundsPlaying}/>
    </div>
  );
}

export default App;
