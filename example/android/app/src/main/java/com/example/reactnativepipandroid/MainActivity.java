package com.example.reactnativepipandroid;

import android.content.res.Configuration;

import com.facebook.react.ReactActivity;

import com.reactnativepipandroid.PipAndroidModule;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "PipAndroidExample";
  }

  @Override
  public void onPictureInPictureModeChanged (boolean isInPictureInPictureMode, Configuration newConfig) {
    PipAndroidModule.pipModeChanged(isInPictureInPictureMode);
  }
}
