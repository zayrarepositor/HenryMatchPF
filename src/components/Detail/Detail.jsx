/* import React from 'react';
import { useUIContext } from '../Context/ContextUI';
import { IconButton, Slide } from'@mui/material';
import '../Detail/Detail.css';
import CloseIcon from '@mui/icons-material/Close';


function Detail() {

    const { showDetailBox, setshowDetailBox } = useUIContext();

    return (
    
            <Slide direction='right' in={showDetailBox} timeout={500}>
            <div className='detailContainer'>
                <h4> Detail, la idea es que salga de la carta </h4>
                <IconButton
                    onClick={() => setshowDetailBox(false)}
                    sx={{
                        position:'absolute',
                        top:10,
                        right:10
                    }}
                >
                    <CloseIcon sx={{fontSize:'2rem'}} />
                </IconButton>
            </div>
            </Slide>
        
  )
}

export default Detail */