import React from 'react';
import {Menu as SMenu,Input} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

const Menu = (props:{activeItem:string, handleLogOut:()=>void}):JSX.Element => {
    const {activeItem} = props;
    return(
        <SMenu>
            <SMenu.Item
                name='home'
                active={activeItem === 'home'}
                onClick={()=>{console.log('home clicked');}}
                as={Link} to='/home'
            />
            <SMenu.Item
                name='messages'
                active={activeItem === 'messages'}
                onClick={()=>{console.log('message clicked');}}
                as={Link} to='/home'
            />
            <SMenu.Item
                name='friends'
                active={activeItem === 'friends'}
                onClick={()=>{console.log('friends clicked');}}
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