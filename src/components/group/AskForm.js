import React from 'react';
import {TiDelete} from 'react-icons/ti';

const CreateForm = (props) => {

    return (
    <section className="popup">
        <span className="overlay" onClick={props.handleClose}></span>
        <section className="popup-content">
            <header className='popup-header'>
                <h2>Are you sure?</h2>
                <span className="popup-icon-close" onClick={props.handleClose}><TiDelete className="popup-icon-close"/></span>
            </header>
            <div className="buttons">
                    <button className='yes' onClick={props.action}>Yes</button>
                    <button className='no' onClick={props.handleClose}>No</button>
            </div>
        </section>
    </section>
  )
}

export default CreateForm