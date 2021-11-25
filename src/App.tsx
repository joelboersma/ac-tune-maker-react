import React, { FC } from 'react';
import './App.scss';
import NoteSliderTable from './Components/NoteSliderTable/NoteSliderTable'

const App: FC = () => {
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
      <footer>
        <a href="https://joelboersma.github.io">Made by Joel Boersma</a>
      </footer>
    </div>
  );
}

export default App;
