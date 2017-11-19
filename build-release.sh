ionic cordova build android --prod --release
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore release.jks platforms/android/build/outputs/apk/android-release-unsigned.apk io.github.tkalra
~/Library/Android/sdk/build-tools/25.0.2/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk cns-1.0.0.apk
~/Library/Android/sdk/build-tools/25.0.2/apksigner verify cns-1.0.0.apk