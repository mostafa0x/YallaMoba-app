import React, { memo, useState, useCallback } from 'react';
import { View, Text, Button } from 'react-native';

const Child = memo(({ onPress }: any) => {
  console.log('Child rendered');
  return <Button title="Click me" onPress={onPress} />;
});

export default function Parent() {
  const [count, setCount] = useState(0);

  const handlePress = useCallback(() => {
    console.log('Button pressed');
  }, []);

  return (
    <View className="gap-10">
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
      <Child onPress={handlePress} />
    </View>
  );
}
