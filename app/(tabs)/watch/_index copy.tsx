import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Modalize } from 'react-native-modalize';

const comments = [
  { id: '1', user: 'Ali', text: 'رائع جدًا 👍' },
  { id: '2', user: 'Sara', text: 'فين ده؟' },
];

export default function CommentsModal() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const modalRef = useRef<Modalize>(null);

  const openModal = () => {
    modalRef.current?.open();
    setIsMenuOpen(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Button title="عرض التعليقات" onPress={openModal} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}>
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
          }}
        />
      </KeyboardAvoidingView>
      {isMenuOpen && (
        <View className="m-2 justify-end border-2 border-gray-500 bg-white p-2 ">
          <TextInput placeholder="comment here" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  comment: {
    marginBottom: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  footer: {
    paddingVertical: 100,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
});
