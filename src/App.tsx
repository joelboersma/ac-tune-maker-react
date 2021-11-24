import React from 'react';
import './App.scss';
import NoteSliderTable from './Components/NoteSliderTable/NoteSliderTable'

function App() {
  return (
    <div className="App">
      <header>
        <h1>Animal Crossing Town Tune Maker React</h1>
      </header>
      <main>
        <NoteSliderTable/>
        <section className="buttonRow">
          <button id="Help">Help</button>
          <button id="Play">Play</button>
          <button id="Restart">Restart</button>
        </section>
      </main>
    </div>
  );
}

export default App;
