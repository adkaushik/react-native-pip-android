import * as React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PipHandler, { usePipModeListener } from 'react-native-pip-android';

export default function App() {
  // Use this boolean to show / hide ui when pip mode changes
  const inPipMode = usePipModeListener();

  if (inPipMode) {
    return (
      <View style={styles.container}>
        <Text>PIP Mode</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        These text components will be hidden in pip mode
      </Text>
      <TouchableOpacity
        onPress={() => PipHandler.enterPipMode(300, 214)}
        style={styles.box}
      >
        <Text>Click to Enter Pip Mode</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#02ff02',
    width: 200,
    height: 60,
    marginVertical: 20,
    color: 'white',
    borderRadius: 30,
  },
  text: {
    marginBottom: 50,
    fontSize: 22,
  },
});
