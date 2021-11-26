import { FC, useState } from 'react';
import { Howl, Howler } from 'howler';
import NoteSliderTable from './Components/NoteSliderTable/NoteSliderTable';
import NoteValue from './Types/NoteValue';
import Note from './Types/Note';
import './App.scss';

const App: FC = () => {
  const noteSounds = Array(13).map((_, index) => new Howl({
    src: [`${index}.mp3`],
    rate: 2
  }));

  const [notes, setNotes] = useState(() => {
    let notes: Note[] = []
  
    for (let i = 0; i < 16; i++) {
      notes.push({id: i, value: 0});
    }
  
    return notes;
  });

  const changeNote = async (noteToChange: Note) => {
    setNotes(notes.map((note) => 
      note.id === noteToChange.id ? {id: note.id, value: noteToChange.value} : note
    ));
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
