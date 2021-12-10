import { FC, useState } from 'react';
import { Howl, Howler } from 'howler';
import NoteSliderTable from './Components/NoteSliderTable/NoteSliderTable';
import NoteValue from './Modules/NoteValue';
import SoundFiles from './Modules/SoundFiles';
import Note from './Modules/Note';
import './App.scss';

// Howler.autoUnlock = true;

const App: FC = () => {
  const noteSounds = Array(14).fill(0).map((_, i) => new Howl({
    src: SoundFiles[i],
    preload: true,
    html5: true,
    onloaderror: (id: number, e: any) => {
      console.error(`Howl load error: ${e}`);
    }
  }));

  const [notes, setNotes] = useState(
    Array(16).fill(0).map((_, i) => new Note(i, 0))
  );

  const changeNote = async (noteToChange: Note) => {
    playNote(noteToChange.value);
    setNotes(notes.map((note) => 
      note.id === noteToChange.id ? {id: note.id, value: noteToChange.value} : note
    ));
  }

  const playNote = (val: NoteValue) => {
    if (val >= NoteValue.g && val <= NoteValue.E) {
      // console.log(Howler.ctx.state);
      const soundIndex = val - NoteValue.g;
      console.log(noteSounds[soundIndex].state());
      noteSounds[soundIndex].play();
    }
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
    </div>
  );
}

export default App;
