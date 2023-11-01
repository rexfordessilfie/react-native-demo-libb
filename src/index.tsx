import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  NativeModules,
  LayoutAnimation,
} from 'react-native';
import { View } from 'react-native';

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

type MultiplierProps = {
  colors?: {
    font?: string;
    placeholder?: string;
    border?: string;
    background?: string;
  };
  onError?: (error: string) => void;
  onResult?: (result: number) => void;
};

export function Multiplier({
  colors = {},
  onError,
  onResult,
}: MultiplierProps) {
  const [a, setA] = useState<string>();
  const [b, setB] = useState<string>();
  const [error, setErrorMessage] = useState<string>();

  const [result, setResult] = useState(0);

  useEffect(() => {
    const numA = Number(a || 0);
    const numB = Number(b || 0);
    setErrorMessage(undefined);
    multiply(numA, numB)
      .then((_result) => {
        if (isNaN(_result)) {
          throw new Error('Please enter valid numbers');
        }
        LayoutAnimation.configureNext({
          ...LayoutAnimation.Presets.spring,
          duration: 1000,
        });

        setResult(_result);
        onResult?.(_result);
      })
      .catch((e: Error) => {
        setErrorMessage(e.message || 'Unknown error!');
        onError?.(e.message || 'Unknown error!');
      });
  }, [a, b, onError, onResult]);

  const textLength =
    (a?.length || 1) + (b?.length || 1) + (result?.toString().length || 1) + 2;

  const fontSize = 540 / textLength;
  const operatorFontSize = fontSize * 0.5;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={[
          styles.contentContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <View style={styles.content}>
          <View>
            {error && <Text style={[styles.error]}>Error: {error}</Text>}
          </View>
          <View style={[styles.inputContainer]}>
            <TextInput
              placeholderTextColor={colors.placeholder}
              keyboardType="number-pad"
              style={[
                styles.input,
                { fontSize, color: colors.font, borderColor: colors.border },
              ]}
              value={a}
              placeholder="0"
              onChangeText={setA}
            />

            <Text style={[{ fontSize: operatorFontSize, color: colors.font }]}>
              *
            </Text>

            <TextInput
              placeholderTextColor={colors.placeholder}
              keyboardType="number-pad"
              style={[
                styles.input,
                { fontSize, color: colors.font, borderColor: colors.border },
              ]}
              value={b}
              placeholder="0"
              onChangeText={setB}
            />

            <Text style={[{ fontSize: operatorFontSize, color: colors.font }]}>
              =
            </Text>
            <Text style={[{ fontSize, color: colors.font }]}>{result}</Text>
          </View>
        </View>
        <Text style={[styles.title, { color: colors.font }]}>RN Demo Libb</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },

  contentContainer: {
    flex: 1,
  },

  content: {
    flex: 1,
    marginTop: '60%',
  },

  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
    marginHorizontal: 8,
  },

  input: {
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    padding: 2,
    textAlign: 'center',
  },

  error: {
    color: 'red',
  },

  result: {
    color: 'green',
  },
});
