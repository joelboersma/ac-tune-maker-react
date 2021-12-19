import React, { FC, useRef } from 'react'
import ReactHowler from 'react-howler'

interface SoundWrapperProps {
   key: number,
   src: any,  // mp3 file
   playing: boolean,
}

const SoundWrapper: FC <SoundWrapperProps> = (props: SoundWrapperProps) => {
   let howlerRef = useRef(null);
   return (
      <ReactHowler
         key={props.key}
         src={props.src}
         preload={true}
         playing={props.playing}
         ref={howlerRef}
         onPause={() => {
            if (howlerRef != null && howlerRef.current != null) {
               (howlerRef.current as ReactHowler).stop()
            }
         }}
      />
   )
}

export default SoundWrapper
