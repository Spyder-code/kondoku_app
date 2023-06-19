import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
  appId: 'com.kondoku.app',
  appName: 'Kondoku',
  webDir: 'dist/client',
  bundledWebRuntime: false,
};

export default config;
