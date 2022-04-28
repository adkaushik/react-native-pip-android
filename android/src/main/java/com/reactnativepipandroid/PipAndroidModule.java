package com.reactnativepipandroid;

import android.app.PictureInPictureParams;
import android.util.Log;
import android.util.Rational;
import android.app.AppOpsManager;
import android.content.Context;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;

@ReactModule(name = PipAndroidModule.NAME)
public class PipAndroidModule extends ReactContextBaseJavaModule {
    public static final String NAME = "PipAndroid";
    public static final String PIP_MODE_CHANGE = "PIP_MODE_CHANGE";
    public static final String PIP_CLOSED = "PIP_CLOSED";
    private static DeviceEventManagerModule.RCTDeviceEventEmitter eventEmitter = null;

    ReactApplicationContext reactApplicationContext;

  public static void pipModeChanged(Boolean isInPictureInPictureMode) {
    eventEmitter.emit(PIP_MODE_CHANGE, isInPictureInPictureMode);
  }

  public static void pipClosed() {
    eventEmitter.emit(PIP_CLOSED, true);
  }

  public PipAndroidModule(ReactApplicationContext reactContext) {
        super(reactContext);
        Log.d("PIP", "Got the context");
        this.reactApplicationContext = reactContext;
  }

  @Override
  @NonNull
  public String getName() {
      return NAME;
  }

  @Override
  public void initialize() {
    super.initialize();

    eventEmitter = getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
  }

  private boolean hasPermission() {
    AppOpsManager appOps = (AppOpsManager) getReactApplicationContext().getSystemService(Context.APP_OPS_SERVICE);
    return appOps.checkOpNoThrow(AppOpsManager.OPSTR_PICTURE_IN_PICTURE, android.os.Process.myUid(), getReactApplicationContext().getPackageName()) == AppOpsManager.MODE_ALLOWED;
  }

  @ReactMethod
  public void enterPipMode(int width, int height) {
    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O && hasPermission()) {
      int ratWidth = width > 0 ? width : 380;
      int ratHeight = height > 0 ? height : 214;

      Rational ratio
        = new Rational(ratWidth, ratHeight);
      PictureInPictureParams.Builder
        pip_Builder
        = null;

      pip_Builder = new PictureInPictureParams
        .Builder();
      pip_Builder.setAspectRatio(ratio).build();
      reactApplicationContext.getCurrentActivity().enterPictureInPictureMode(pip_Builder.build());
    }
  }
}
