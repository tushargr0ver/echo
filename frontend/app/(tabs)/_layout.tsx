import { Redirect } from 'expo-router';

export default function TabsLayout() {
  // Redirect to the main app since we're using Stack navigation
  return <Redirect href="/main" />;
}