import React from 'react';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';



const style = {margin: 10};


const AvatarExampleSimple = () => (
    <List>
        <ListItem
            size={100}
            disabled={false}
            leftAvatar={
                <Avatar src="../static/jose.jpg" />
            }

            style={style}
        >
            Jose Manuel Rojas
        </ListItem>
    </List>
);

export default AvatarExampleSimple;