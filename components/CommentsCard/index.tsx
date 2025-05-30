import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Avatar, Button, Divider, Menu } from 'react-native-paper';
import { CommentFace } from 'types/interfaces/store/ProfileFace';
import { userDataFace } from 'types/interfaces/store/UserFace';

interface Props {
    item: CommentFace;
    userData: userDataFace | null;
    handleDeleteComment: (postId: number, commentId: number) => void;
}

const CommentItem = React.memo(({ item, userData, handleDeleteComment }: Props) => {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <View style={{ padding: 10 }}>
            <View className='flex-row justify-between'>
                <TouchableOpacity className='flex-row items-center gap-2'>
                    <Avatar.Image size={30} source={{ uri: item.avatar }} />
                    <Text className='text-2xl'>{item.username}.</Text>
                </TouchableOpacity>

                {item.username === userData?.username && (
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={<Button onPress={openMenu}>.....</Button>}>
                        <Menu.Item onPress={() => { }} title="Edit (onWork)" />
                        <Menu.Item title="User Profile" />
                        <Divider />
                        <Menu.Item
                            titleStyle={{ color: "red" }}
                            onPress={() => handleDeleteComment(item.post_id, item.id)}
                            title="Delete"
                        />
                    </Menu>
                )}
            </View>
            <View className='w-full'>
                <Text className='pl-5 text-xl'>{item.content}</Text>
            </View>
        </View>
    );
});

export default CommentItem;
