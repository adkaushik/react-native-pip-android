import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import PipHandler, { usePipModeListener } from 'react-native-pip-android';

export default function App() {
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
        These text components are hidden in pip mode
      </Text>
      <Text onPress={PipHandler.enterPipMode(300, 214)}>
        Click Enter Pip Mode
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  text: {
    marginBottom: 50,
  },
});
