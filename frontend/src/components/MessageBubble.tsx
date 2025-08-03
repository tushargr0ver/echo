import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Message } from '../types';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { Spacing } from '../constants/Spacing';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isOwn = message.isOwn;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <Animated.View
      entering={FadeInUp.duration(300)}
      style={[styles.container, isOwn ? styles.ownContainer : styles.otherContainer]}
    >
      <View style={[styles.bubble, isOwn ? styles.ownBubble : styles.otherBubble]}>
        <Text style={[styles.messageText, isOwn ? styles.ownText : styles.otherText]}>
          {message.text}
        </Text>
      </View>
      <Text style={[styles.timestamp, isOwn ? styles.ownTimestamp : styles.otherTimestamp]}>
        {formatTime(message.timestamp)}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
  },
  ownContainer: {
    alignItems: 'flex-end',
  },
  otherContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 18,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  ownBubble: {
    backgroundColor: Colors.accent,
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: Colors.secondary,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: Typography.sizes.body,
    fontFamily: 'Inter-Regular',
    lineHeight: Typography.sizes.body * Typography.lineHeights.normal,
  },
  ownText: {
    color: Colors.primary,
  },
  otherText: {
    color: Colors.textPrimary,
  },
  timestamp: {
    fontSize: Typography.sizes.small,
    fontFamily: 'Inter-Regular',
    marginTop: Spacing.xs,
    marginHorizontal: Spacing.xs,
  },
  ownTimestamp: {
    color: Colors.textSecondary,
    textAlign: 'right',
  },
  otherTimestamp: {
    color: Colors.textSecondary,
    textAlign: 'left',
  },
});