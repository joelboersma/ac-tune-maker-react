import { FC, useEffect, useRef, useState } from 'react';
import { Howler } from 'howler';
import NoteSliderTable from './Components/NoteSliderTable';
import SoundManager from './Components/SoundManager';
import SharePopup from './Components/SharePopup';
import SoundFiles from './Modules/SoundFiles';
import NoteValue from './Modules/NoteValue';
import NotePlay from './Modules/NotePlay';
import Note from './Modules/Note';
import './App.scss';

const App: FC = () => {
  const NUM_NOTES = 16;
  const NUM_NOTE_VALUES = 16;
  
  const [notes, setNotes] = useState(
    Array(NUM_NOTES).fill(0).map((_, j) => new Note(j, 0))
  );

  useEffect(() => {
    // Grab URL path (without '/')
    const path = window.location.pathname.replaceAll('/', '');

    // If path is 16 characters, construct new notes
    if (path.length === NUM_NOTES) {
      let urlNotes: Note[] = [];
      for (let i = 0; i < NUM_NOTES; i++) {
        const hexDigit = parseInt(path[i], NUM_NOTE_VALUES);
        if (isNaN(hexDigit)) {
          // Bad hex digit, abort new array construction
          return
        }
        else {
          urlNotes.push(new Note(i, hexDigit));
        }
      }
      // @path is 16-character hex string - set notes
      setNotes(urlNotes);
    }
  }, []);

  const [soundsPlaying, setSoundsPlaying] = useState(
    Array<boolean>(SoundFiles.length).fill(false)
  );
  const soundsPlayingRef = useRef(soundsPlaying)

  const [currentNoteDuration, setCurrentNoteDuration] = useState(0)
  const [currentNotePlaying, setCurrentNotePlaying] = useState(0)

  const [songPlaying, setSongPaying] = useState(false);

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

  const [sharePopupEnabled, setsharePopupEnabled] = useState(false)

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
    for (const note of notes) {
      switch(note.value) {
        case NoteValue.Hold:
          if (notePlays.length > 0) {
            notePlays[notePlays.length - 1].lenInMs += ONE_NOTE_LENGTH;
          }
          else {
            notePlays.push(new NotePlay(NoteValue.Sleep, curStart, ONE_NOTE_LENGTH));
          }
          break;
        case NoteValue.Random:
          const valToUse = Math.round(Math.random() * 13 + 2);
          notePlays.push(new NotePlay(valToUse, curStart, ONE_NOTE_LENGTH));
          break;
        default:
          notePlays.push(new NotePlay(note.value, curStart, ONE_NOTE_LENGTH));
      }
      curStart += ONE_NOTE_LENGTH;
    }

    // Song is playing (make sliders & buttons non-interactable)
    setSongPaying(true);

    // Schedule the Note Plays
    for (const np of notePlays) {
      setTimeout(() => {
        console.log(np);
        playNote(np.value, np.lenInMs);
      }, np.startTime);
    }

    // Schedule song completion (make sliders & buttons interactable)
    setTimeout(() => setSongPaying(false), ONE_NOTE_LENGTH * NUM_NOTES);
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

  const openSharePopup = () => {
    setsharePopupEnabled(true);
  }

  const closeSharePopup = () => {
    setsharePopupEnabled(false);
  }

  return (
    <div className="App">
      <header>
        <h1>React Tune Maker</h1>
      </header>
      <main>
        <NoteSliderTable notes={notes} disabled={songPlaying} sliderOnChange={changeNote}/>
        <section className="buttonRow">
          <button id="Share" onClick={openSharePopup} disabled={songPlaying}>Share</button>
          <button id="Play" onClick={playSong} disabled={songPlaying}>Play</button>
          <button id="Reset" onClick={reset} disabled={songPlaying}>Reset</button>
        </section>
      </main>
      <footer>
        <a href="https://joelboersma.github.io">Made by Joel Boersma</a>
      </footer>
      <SharePopup notes={notes} enabled={sharePopupEnabled} closeHandler={closeSharePopup}/>
      <SoundManager soundsPlaying={soundsPlaying}/>
    </div>
  );
}

export default App;
