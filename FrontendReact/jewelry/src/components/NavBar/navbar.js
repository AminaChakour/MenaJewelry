import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';

export const Nav = styled.nav`
    background-color: #fff;
    height: 80px;
    display: flex;
    justify-content: space-between;
    z-index: 10;

    
`

export const NavLink = styled(Link)`
    color: #101010;
    display: flex;
    align-items: center;
    font-family: 'Times New Roman', serif;
    text-decoration: none;
    border:none;
    padding: 0 1.5rem;
    height: 100%;
    cursor: pointer;
    &.active{
        color:#fcb315;
     

    }
    &:hover{
        transition:all 0.2s ease-in-out;
        
        color:#fcb315;
    }






`

export const NavMenu=styled.div`
display:flex;
align-items:center;
margin:auto;


`

export const NavImg=styled.div`
display:flex;
align-items:center;

@media screen and (max-width:768px){
    
    display:none;
}
`

export const NavBtn=styled.nav`

display:flex;
align-items:center;
margin-right:24px;

@media screen and (max-width:768px){
    display:none;
}
`
export const NavCart=styled(Link)`

display:flex;
align-items:center;
margin-left:-100px;
margin-right:30px;
width:40px;
height:40px;
background-color:wheat;
text-decoration:none;
color:black;
border-radius:100%;
margin-top:20px;
&:hover{
    transition:all 0.2s ease-in-out;
    background:aliceblue;
    color:#010606;
}


`

export const NavBtnLink=styled(Link)`
border-radius:4px;
background:#fcb315;
padding:10px 22px;
color:#fff;
border:none;
outline:none;
cursor:pointer;
transition:all 0.2s ease-in-out;
text-decoration:none;
&:hover{
    transition:all 0.2s ease-in-out;
    background:#fff;
    color:#010606;
}


`