import { FC } from 'react'
import SoundFiles from '../Modules/SoundFiles'
import SoundWrapper from './SoundWrapper'

interface SoundManagerProps {
  soundsPlaying: boolean[]
}

const SoundManager: FC <SoundManagerProps> = (props: SoundManagerProps) => {
  return (
    <div>
      {
        Array(SoundFiles.length).fill(0).map((_, i) => 
          <SoundWrapper
            key={i}
            src={SoundFiles[i]}
            playing={props.soundsPlaying[i]}
          />
        )
      }
    </div>
  )
}

export default SoundManager
