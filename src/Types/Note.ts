import NoteValue from './NoteValue'

class Note {
   id: number;
   value: NoteValue;
   constructor(id: number, value: NoteValue) {
      this.id = id;
      this.value = value;
   }
}

export default Note