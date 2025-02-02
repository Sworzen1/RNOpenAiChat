import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { SessionProvider } from '@/hooks/useSession';
import { ThemeProvider } from '@/hooks/useTheme';
import '@/i18n/i18n';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppLoading } from '@/components/AppLoading';
import { NotificationsProvider } from '@/hooks/NotificationsProvider';

export default function Root() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <SessionProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NotificationsProvider>
              <AppLoading>
                <Slot />
              </AppLoading>
            </NotificationsProvider>
          </GestureHandlerRootView>
        </SessionProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
