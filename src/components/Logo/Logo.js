import React from 'react';
import Tilt from 'react-tilt';
import logoImg from './logo.png';


const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt" options={{ max: 40 }} style={{ height: 200, width: 200 }} >
                <div className="Tilt-inner">
                    <img src={logoImg} alt="logo" /> 
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;