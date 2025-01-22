// export const BASE_URL = 'http://localhost:3000/api';
import { Platform } from 'react-native';

export const BASE_URL = Platform.select({
  ios: 'http://localhost:3000/api', // iOS uses localhost
  android: 'http://10.0.2.2:3000/api', // Android uses 10.0.2.2
});

export const SOCKET_URL = 'http://localhost:3000/api';
