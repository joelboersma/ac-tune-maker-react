import { FC, useState } from 'react';
import NoteSliderTable from './Components/NoteSliderTable/NoteSliderTable';
import Note from './Types/Note';
import './App.scss';

const App: FC = () => {
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

  return (
    <div className="App">
      <header>
        <h1>Animal Crossing Town Tune Maker React</h1>
      </header>
      <main>
        <NoteSliderTable notes={notes} sliderOnChange={changeNote}/>
        <section className="buttonRow">
          <button id="Help">Help</button>
          <button id="Play">Play</button>
          <button id="Restart">Restart</button>
        </section>
      </main>
      <footer>
        <a href="https://joelboersma.github.io">Made by Joel Boersma</a>
      </footer>
    </div>
  );
}

export default App;
