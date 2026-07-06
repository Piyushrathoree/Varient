import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { vars } from 'nativewind';
import { NumberTicker } from '@varient/ui/native';
import { DEFAULT_COLOR_SCHEME, themeCssVars, type ColorScheme } from '@varient/ui/tokens';

import './global.css';

/**
 * Varient universal spike — proves one token source + one component API drive
 * BOTH web and native. Switching mode applies `vars(themeCssVars[mode])` to
 * the root View; every descendant repaints (surface, accent) with zero
 * component-prop changes — the native mirror of the web `.dark` class swap.
 */
export default function App() {
  const [scheme, setScheme] = useState<ColorScheme>(DEFAULT_COLOR_SCHEME);
  const isDark = scheme === 'dark';

  return (
    <View style={[{ flex: 1 }, vars(themeCssVars[scheme])]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <SafeAreaView className="flex-1 bg-bg-base">
        <ScrollView contentContainerClassName="gap-7 p-6">
          <View className="gap-1.5">
            <Text className="text-xs font-semibold uppercase tracking-widest text-text-tertiary">
              Varient · universal spike
            </Text>
            <Text className="text-4xl font-bold text-text-primary">
              One accent.{'\n'}Light and dark.
            </Text>
            <Text className="text-base text-text-secondary">
              {isDark ? 'Dark' : 'Light'} mode — same tokens, same component API as web.
            </Text>
          </View>

          {/* Light/dark switcher */}
          <View className="flex-row flex-wrap gap-2">
            {(['light', 'dark'] as const).map((m) => {
              const active = m === scheme;
              return (
                <Pressable
                  key={m}
                  onPress={() => setScheme(m)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  className={
                    active
                      ? 'rounded-theme bg-accent px-4 py-2'
                      : 'rounded-theme border border-border bg-bg-muted px-4 py-2'
                  }
                >
                  <Text
                    className={
                      active
                        ? 'font-semibold text-neutral-0'
                        : 'font-medium text-text-primary'
                    }
                  >
                    {m === 'dark' ? 'Dark' : 'Light'}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Themed card with live, UI-thread NumberTickers */}
          <View className="rounded-theme border border-border bg-bg-subtle p-6">
            <View className="mb-5 flex-row gap-8">
              <View className="gap-1">
                <NumberTicker
                  key={`comp-${scheme}`}
                  value={75}
                  duration={1.4}
                  className="text-4xl font-bold"
                />
                <Text className="text-[10px] font-semibold uppercase tracking-widest text-text-tertiary">
                  Components
                </Text>
              </View>
              <View className="gap-1">
                <NumberTicker
                  key={`own-${scheme}`}
                  value={100}
                  suffix="%"
                  duration={1.4}
                  className="text-4xl font-bold"
                />
                <Text className="text-[10px] font-semibold uppercase tracking-widest text-text-tertiary">
                  You own it
                </Text>
              </View>
            </View>

            <View className="mb-5 h-px bg-border" />

            <View className="flex-row gap-2">
              <View className="rounded-theme bg-accent px-4 py-2">
                <Text className="font-semibold text-neutral-0">Primary</Text>
              </View>
              <View className="rounded-theme border border-border-strong px-4 py-2">
                <Text className="font-medium text-text-primary">Outline</Text>
              </View>
            </View>
          </View>

          <Text className="text-xs leading-relaxed text-text-tertiary">
            Same tokens, same component API as web. Switching mode repaints
            surface and accent — no component props touched. NumberTicker
            counts on Reanimated&apos;s UI thread and respects reduced motion.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
