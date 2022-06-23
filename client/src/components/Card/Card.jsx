import React, { useState } from 'react'
import '../Card/Card.css'
import CardUser from 'react-tinder-card'
import InfoIcon from '@mui/icons-material/Info';
import { IconButton } from '@mui/material';
import { useUIContext } from '../Context/ContextUI';

const Card = () => {

    const { setshowDetailBox } = useUIContext()

    const [user, setUser] = useState([
        {
            name: 'Ro',
            url: 'https://cdn.pixabay.com/photo/2016/04/26/07/57/woman-1353825_960_720.png'
        },
        {
            name: 'Pepe',
            url: 'https://cdn.pixabay.com/photo/2016/11/29/07/16/balancing-1868051_960_720.jpg'
        },

    ])
  return (
    <div >
     
        <div className='tarjetasTinder'>
         <div className='tarjetasTinder__contenedor'>  
            {user.map(p =>(
                <CardUser
                    className='swipe'
                    key={p.name}
                    preventSwipe={['up','down']}
                    >
                    <div
                    className='tarjeta'
                    style={{backgroundImage:`url(${p.url})`}}
                    >
                    <h2>{p.name}</h2>
                    <IconButton sx={{left:555, top:-5} } >
                        <InfoIcon onClick={()=> setshowDetailBox(true)} />
                    </IconButton>
                    </div>
                </CardUser>
            ))}
           </div>
        </div>
    </div>
  )
}

export default Card