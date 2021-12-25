import NoteValue from "./NoteValue";

export default class NotePlay {
   value: NoteValue;
   startTime: number;
   lenInMs: number;
   constructor(value: NoteValue, startTime: number, duration: number) {
      this.value = value;
      this.startTime = startTime;
      this.lenInMs = duration;
   }
}