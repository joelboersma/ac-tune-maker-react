import React from 'react'
import './styles/Popup.scss'

interface PopupProps {
   children: React.ReactElement[]
   enabled: boolean
   closeHandler: React.MouseEventHandler<HTMLButtonElement>
}

const Popup = (props: PopupProps) => {
   return (
      <div className={'popupBackground' + (props.enabled ? '' : ' disabled')}>
         <div className="card">
            {props.children}
            <button id="CloseButton" onClick={props.closeHandler}>X</button>
         </div>
      </div>
   )
}

export default Popup