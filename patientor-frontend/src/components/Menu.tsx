import React, { useState } from 'react';
import {Menu as SMenu,Input} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

const Menu = (props:{activeItem:string, handleLogOut:()=>void}):JSX.Element => {
    const {activeItem} = props;
    const [item,setItem] = useState<string>(activeItem);
    return(
        <SMenu>
            <SMenu.Item
                name='home'
                active={item === 'home'}
                onClick={()=>{setItem('home');}}
                as={Link} to='/home'
            />
            <SMenu.Item
                name='diagnosis'
                active={item === 'diagnosis'}
                onClick={()=>{setItem('diagnosis');}}
                as={Link} to='/home'
            />
            <SMenu.Item
                name='friends'
                active={item === 'friends'}
                onClick={()=>{setItem('friends');}}
                as={Link} to='/home'
            />
            <SMenu.Menu position='right'>
                <SMenu.Item>
                    <Input icon='search' placeholder='Search...' />
                </SMenu.Item>
                <SMenu.Item
                    name='logout'
                    active={activeItem === 'logout'}
                    onClick={()=>{props.handleLogOut();}}
                    as={Link} to='/'
                />
            </SMenu.Menu>
        </SMenu>
    );
};

export default Menu;