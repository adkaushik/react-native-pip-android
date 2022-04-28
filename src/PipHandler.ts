import { NativeEventEmitter, NativeModules, Platform } from 'react-native';

class PipHandler {
  EventEmitter: NativeEventEmitter | null;

  constructor() {
    this.EventEmitter =
      Platform.OS === 'android'
        ? new NativeEventEmitter(NativeModules.PipAndroid)
        : null;
  }

  onPipModeChanged(listener: (isModeEnabled: Boolean) => void) {
    return this?.EventEmitter?.addListener('PIP_MODE_CHANGE', listener);
  }

  onPipClosed(listener: () => void) {
    return this?.EventEmitter?.addListener('PIP_CLOSED', listener);
  }

  /**
   * Call this method from any component to enter the pip mode.
   * This method accepts two integers, width and height, which have default values,
   * when invoked without passing them
   *
   * @param width
   * @param height
   * @example
   * ```js
   * import PipHandler, { usePipModeListener } from 'react-native-pip-android';
   *
   * const isInPipMode = usePipModeListener();
   *
   * function enterPipMode() {
   *
   *   if (!isInPipMode)
   *     PipHandler.enterPipMode(300, 214);
   * }
   * ```
   */
  enterPipMode(width?: number, height?: number) {
    return NativeModules?.PipAndroid?.enterPipMode(
      width ? Math.floor(width) : 0,
      height ? Math.floor(height) : 0
    );
  }
}

export default new PipHandler();
