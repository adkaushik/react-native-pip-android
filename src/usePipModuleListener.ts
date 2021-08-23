import { useState, useEffect } from 'react';
import { Platform, EmitterSubscription } from 'react-native';

import PipHandler from './PipHandler';

/**
 * Hook that provides the current Pip mode state. Subscribe to this hook, to listen
 * to pip mode enter and exit events. Use the boolean to show, hide ui on the component
 *
 * @returns boolean, true when pip mode is entered and false when pip mode is exited
 * @example
 * ```js
 * import { usePipModeListener } from 'react-native-pip-android';
 *
 * function PlayerOverlay() {
 *   const isPipModeEnabled = usePipModeListener()
 *
 *   if (isPipModeEnabled) {
 *     showPlayerControls(false);
 *   } else {
 *     showPlayerControls(true);
 *   }
 * }
 * ```
 */

export function usePipModeListener(): Boolean {
  const [isModeEnabled, setIsPipModeEnabled] = useState<Boolean>(false);

  useEffect(() => {
    let pipListener: EmitterSubscription | undefined;

    if (Platform.OS === 'android') {
      pipListener = PipHandler.onPipModeChanged(setIsPipModeEnabled);
    }

    return () => {
      pipListener?.remove();
    };
  }, []);

  return isModeEnabled;
}

export default usePipModeListener;
