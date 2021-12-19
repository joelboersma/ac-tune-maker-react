import { FC } from 'react'
import ReactHowler from 'react-howler'
import SoundFiles from '../Modules/SoundFiles'

interface SoundManagerProps {
  soundsPlaying: boolean[]
}

const SoundManager: FC<SoundManagerProps> = (props: SoundManagerProps) => {
  return (
    <div>
      {
        Array(SoundFiles.length).fill(0).map((_, i) => 
          <ReactHowler
            key={i}
            src={SoundFiles[i]}
            preload={true}
            playing={props.soundsPlaying[i]}
          />
        )
      }
    </div>
  )
}

export default SoundManager
