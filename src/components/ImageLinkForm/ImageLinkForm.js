import React from 'react'
import './ImageLinkForm.css';
const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className='f3'>
        
            </p>
      <div className='center'>
        <div className='form pa2 br4'>
          <input
            className='f4 pa2 w-70 br4' type='text'
            placeholder='Enter image url here'
            onInput={onInputChange} autofocus />
          <button
            className='w-30 grow f4 link ph3 pv2 dib'
            onClick={onButtonSubmit}>Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;