import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.nazamdev',
  appName: 'todoApp',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
