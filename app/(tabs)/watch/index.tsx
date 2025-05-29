import React, { useRef, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Button, KeyboardAvoidingView, Platform } from 'react-native';
import { Modalize } from 'react-native-modalize';

const comments = [
    { id: '1', user: 'Ali', text: 'رائع جدًا 👍' },
    { id: '2', user: 'Sara', text: 'فين ده؟' },
    // ... ممكن تعليقات أكتر
];

export default function CommentsModal() {
    const modalRef = useRef<Modalize>(null);
    const [isOpenMenu, setIsOpenMenu] = useState(false)

    const openModal = () => {
        modalRef.current?.open();
        setIsOpenMenu(true)
    };

    return (
        <>
            <Button title="عرض التعليقات" onPress={openModal} />
            {isOpenMenu && <View className=' absolute bottom-0 border-4 '>
                <TextInput placeholder='comment' />
            </View>}
            <Modalize
                ref={modalRef}
                modalHeight={500}
                handleStyle={{ backgroundColor: '#ccc' }}
                withHandle={true}
                panGestureComponentEnabled={false}
                flatListProps={{
                    data: comments,
                    keyExtractor: (item) => item.id,
                    renderItem: ({ item }) => (
                        <View style={styles.comment}>
                            <Text style={styles.username}>{item.user}</Text>
                            <Text>{item.text}</Text>
                        </View>
                    ),
                    keyboardShouldPersistTaps: 'handled',
                    ListFooterComponent: <View style={{ height: 70 }} >
                        <Text>hi</Text>
                    </View>, // مسافة لارتفاع الـ TextInput
                }}
            />



        </>
    );
}

const styles = StyleSheet.create({
    comment: {
        marginBottom: 10,
    },
    username: {
        fontWeight: 'bold',
    },
    inputWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 8,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    input: {
        height: 40,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ddd',
        backgroundColor: '#f9f9f9',
    },
});
