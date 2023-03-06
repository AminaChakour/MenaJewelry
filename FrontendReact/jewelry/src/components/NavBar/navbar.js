import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';

export const Nav = styled.nav`
    background-color: #fff;
    height: 120px;
    display: flex;
    justify-content: space-between;
    z-index: 10;

    
`

export const NavLink = styled(Link)`
    color: gray;
    display: flex;
    align-items: center;
    font-family: monospace;
    text-decoration: none;
    border:none;
    padding: 0 1.5rem;
    height: 100%;
    cursor: pointer;
    &.active{
        color:#948D48;
        font-weight:bold;
     

    }
    &:hover{
        transition:all 0.2s ease-in-out;
        
        color:#948D48 ;
    }


    @media screen and (max-width:768px){
        padding: 0 0.5rem;
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
height:100%;


@media screen and (max-width:1000px){
    
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
width:70px;
height:70px;
text-decoration:none;
color:#AEAA80;
border-radius:100%;
margin-top:25px;
&:hover{
    transition:all 0.2s ease-in-out;
    background:aliceblue;
    color:#948D48;

}


`


export const NavPhoto=styled.div`

display:flex;
align-items:center;
margin-left:20px;
margin-right:-95px;
width:70px;
height:70px;
margin-top:25px;
text-decoration:none;
color:#AEAA80;
border-radius:100%;
&:hover{
    transition:all 0.2s ease-in-out;
    background:aliceblue;
    color:#948D48;

}


`