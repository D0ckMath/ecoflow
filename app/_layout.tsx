import { Stack } from 'expo-router';
import { Colors } from '../constants/theme';

export default function Layout() {
  return (
    <Stack
      initialRouteName="splash"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
      }}
    />
  );
}
