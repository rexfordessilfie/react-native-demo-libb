import * as React from 'react';

import { StyleSheet, View, useColorScheme } from 'react-native';
import { Multiplier } from 'react-native-demo-libb';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.container}>
      <Multiplier
        colors={{
          font: isDarkMode ? '#fff' : '#000',
          background: isDarkMode ? '#000' : '#fff',
          border: isDarkMode ? '#909090' : '#000',
          placeholder: isDarkMode ? '#fff' : '#000',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
