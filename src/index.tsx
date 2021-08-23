import { NativeModules } from 'react-native';

type PipAndroidType = {
  multiply(a: number, b: number): Promise<number>;
};

const { PipAndroid } = NativeModules;

export default PipAndroid as PipAndroidType;
