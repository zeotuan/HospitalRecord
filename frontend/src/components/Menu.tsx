import React, { useState } from 'react';
import {Menu as SMenu,Input} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

interface menuProps{
    activeItem: string;
    handleLogOut: () => void;
    userName: string|undefined;
}

const Menu = (props:menuProps):JSX.Element => {
    const {activeItem, userName} = props;
    const [item,setItem] = useState<string|undefined>(activeItem);
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
                as={Link} to='/diagnoses'
            />
            <SMenu.Menu position='right'>
                <SMenu.Item>
                    <Input icon='search' placeholder='Search...' />
                </SMenu.Item>
                <SMenu.Item
                    name= {userName}
                    active={item === userName}
                    onClick={()=>{setItem(userName);}}
                    as={Link} to='/home'
                />
                <SMenu.Item
                    name='logout'
                    active={activeItem === 'logout'}
                    onClick={()=>{props.handleLogOut();}}
                    as={Link} to='/login'
                />
            </SMenu.Menu>
        </SMenu>
    );
};

export default Menu;