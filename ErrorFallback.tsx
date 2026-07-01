import React, { useState } from 'react';
import { StyleSheet, View, Pressable, ScrollView, Text, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { useTheme } from '../hooks/useTheme';
import { Spacing, BorderRadius, Fonts } from '../constants/theme';

interface Props {
  error: Error;
  resetError: () => void;
}

export function ErrorFallback({ error, resetError }: Props) {
  const { theme } = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleRestart = async () => {
    try {
      // Best-effort restart; attempt to use expo reload if available
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const expo = require('expo');
      if (expo && typeof (expo as any).reload === 'function') {
        (expo as any).reload();
        return;
      }
    } catch (e) {
      // ignore
    }

    // fallback: call reset handler
    resetError();
  };

  const formatErrorDetails = () => {
    let details = `Error: ${error?.message || 'Unknown'}\n\n`;
    if (error?.stack) {
      details += `Stack Trace:\n${error.stack}`;
    }
    return details;
  };

  return (
    <ThemedView style={styles.container}>
      {__DEV__ ? (
        <Pressable
          onPress={() => setIsModalVisible(true)}
          style={({ pressed }) => [
            styles.topButton,
            {
              backgroundColor: theme.backgroundDefault,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <Feather name="alert-circle" size={20} color={theme.text} />
        </Pressable>
      ) : null}

      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: theme.backgroundDefault }]}>
          <Feather name="video-off" size={48} color={theme.textSecondary} />
        </View>

        <ThemedText type="h4" style={styles.title}>
          StudyVid Hit a Snag
        </ThemedText>

        <ThemedText type="body" style={styles.message}>
          Don't worry - your learning journey continues! Tap below to get back on track.
        </ThemedText>

        <Pressable
          onPress={handleRestart}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: theme.link,
              opacity: pressed ? 0.9 : 1,
              transform: [{ scale: pressed ? 0.98 : 1 }],
            },
          ]}
        >
          <Feather name="refresh-cw" size={20} color={theme.buttonText} />
          <ThemedText type="body" style={[styles.buttonText, { color: theme.buttonText }]}>Restart StudyVid</ThemedText>
        </Pressable>
      </View>

      {__DEV__ ? (
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <ThemedView style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <ThemedText type="h4" style={styles.modalTitle}>Error Details</ThemedText>
                <Pressable onPress={() => setIsModalVisible(false)} style={({ pressed }) => [styles.closeButton, { opacity: pressed ? 0.6 : 1 }]}>
                  <Feather name="x" size={24} color={theme.text} />
                </Pressable>
              </View>

              <ScrollView style={styles.modalScrollView} contentContainerStyle={styles.modalScrollContent} showsVerticalScrollIndicator>
                <View style={[styles.errorContainer, { backgroundColor: theme.backgroundDefault }]}>
                  <Text style={[styles.errorText, { color: theme.text, fontFamily: (Fonts as any)?.mono || 'monospace' }]} selectable>
                    {formatErrorDetails()}
                  </Text>
                </View>
              </ScrollView>
            </ThemedView>
          </View>
        </Modal>
      ) : null}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing['2xl'],
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.lg as any,
    width: '100%',
    maxWidth: 600,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    opacity: 0.7,
  },
  topButton: {
    position: 'absolute',
    top: Spacing['2xl'] + Spacing.lg,
    right: Spacing.lg,
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm as any,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing['2xl'],
    minWidth: 200,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    width: '100%',
    height: '90%',
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: BorderRadius.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(128, 128, 128, 0.2)',
  },
  modalTitle: {
    fontWeight: '600',
  },
  closeButton: {
    padding: Spacing.xs,
  },
  modalScrollView: {
    flex: 1,
  },
  modalScrollContent: {
    padding: Spacing.lg,
  },
  errorContainer: {
    width: '100%',
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    padding: Spacing.lg,
  },
  errorText: {
    fontSize: 12,
    lineHeight: 18,
    width: '100%',
  },
});

export default ErrorFallback;
