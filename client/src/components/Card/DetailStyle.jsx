import styled from "styled-components";



export const DetailContainer = styled.div`
  width:460px;
  position: relative;
  overflow: hidden;

  border-radius: 0rem;
  transition: all .5s ease-in-out;
  img {
    width: 100%;
    height: 240px;
    object-fit: cover;
    z-index: -1;
    
  }
  :hover {
    transform: translate(0, 0px);
  }
  h3 {
    
    text-align: center;
    margin-bottom: 1%;
    margin-top: 2%;
    font-size: 2rem;
    
  }
`;


export const Info = styled.div`
  margin-top: 0;
  position: absolute;
  top: 147%;
  left:50%;
  transform: translate(-50%, -50%);
  transition: all .5s ease-in-out;
  
  h2 {
   
    margin-bottom: 0rem;
    font-family: 'Courier Prime', monospace;
  }
  p {
    font-size: 0.9rem;
    font-weight: bold;
   
    text-align: center;
  }
  span {
      font-size: 0.9rem;
      
      font-weight: bold;
  }
  
  :hover{
    top: 137px;
  }

`;
/* export const Icono = styled.div`
position: relative;
background: none;
text-align: left;
font-weight: bold;
left:35%

`; */
export const Box = styled.div`
background: linear-gradient(318deg, rgba(240,237,237,1) 0%, rgba(243,243,246,0.465721322708771) 100%);
width:460px;
height: 340px;
padding: 0.1rem;

`;


