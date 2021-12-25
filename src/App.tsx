import { FC, useEffect, useRef, useState } from 'react';
import { Howler } from 'howler';
import NoteSliderTable from './Components/NoteSliderTable';
import SoundManager from './Components/SoundManager';
import SoundFiles from './Modules/SoundFiles';
import NoteValue from './Modules/NoteValue';
import NotePlay from './Modules/NotePlay';
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

  const [currentNoteDuration, setCurrentNoteDuration] = useState(0)
  const [currentNotePlaying, setCurrentNotePlaying] = useState(0)

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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSoundPlaying(currentNotePlaying, false)
    }, currentNoteDuration)

    return () => {
      clearTimeout(timeoutId);
    }
  }, [currentNotePlaying, currentNoteDuration, setSoundPlaying])

  const changeNote = async (noteToChange: Note) => {
    playNote(noteToChange.value);
    setNotes(notes.map((note) => 
      note.id === noteToChange.id ? {id: note.id, value: noteToChange.value} : note
    ));
  }

  const playNote = (val: NoteValue, duration: number = 600) => {
    Howler.stop();
    const soundIndexToPlay = val - NoteValue.g;
    setSoundPlaying(soundIndexToPlay, true)
    setCurrentNotePlaying(soundIndexToPlay)
    setCurrentNoteDuration(duration)
  }

  const playSong = () => {
    const ONE_NOTE_LENGTH = 260;

    // Determine which notes to play, when, and how long
    let notePlays: Array<NotePlay> = [];
    let curStart = 0;
    let previousValue: NoteValue = NoteValue.Sleep;
    for (const note of notes) {
      switch(note.value) {
        case NoteValue.Hold:
          if (notePlays.length > 0) {
            notePlays[notePlays.length - 1].lenInMs += ONE_NOTE_LENGTH;
          }
          else {
            notePlays.push(new NotePlay(NoteValue.Sleep, curStart, ONE_NOTE_LENGTH));
            previousValue = NoteValue.Sleep;
          }
          break;
        case NoteValue.Random:
          const valToUse = Math.round(Math.random() * 13 + 2);
          notePlays.push(new NotePlay(valToUse, curStart, ONE_NOTE_LENGTH));
          previousValue = valToUse;
          break;
        default:
          notePlays.push(new NotePlay(note.value, curStart, ONE_NOTE_LENGTH));
          previousValue = note.value;
      }
      curStart += ONE_NOTE_LENGTH;
    }

    // Schedule the Note Plays
    for (const np of notePlays) {
      setTimeout(() => {
        console.log(np);
        playNote(np.value, np.lenInMs);
      }, np.startTime);
    }
  }

  const printNotes = () => {
    const noteStrings = notes.map(note => NoteValue[note.value]);
    console.table(noteStrings);
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
