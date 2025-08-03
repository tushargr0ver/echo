import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Send as SendIcon } from 'lucide-react-native';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { Spacing } from '../constants/Spacing';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface MessageInputProps {
  onSend: (message: string) => void;
  loading?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSend, loading }) => {
  const [message, setMessage] = useState('');
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleSend = () => {
    if (message.trim() && !loading) {
      onSend(message.trim());
      setMessage('');
      
      // Animate send button
      scale.value = withSpring(0.8, {}, () => {
        scale.value = withSpring(1);
      });
    }
  };

  const canSend = message.trim().length > 0 && !loading;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor={Colors.textSecondary}
            multiline
            maxLength={1000}
            editable={!loading}
          />
          <AnimatedTouchableOpacity
            style={[
              styles.sendButton,
              animatedStyle,
              canSend ? styles.sendButtonActive : styles.sendButtonInactive,
            ]}
            onPress={handleSend}
            disabled={!canSend}
          >
            <SendIcon
              size={20}
              color={canSend ? Colors.primary : Colors.textSecondary}
              strokeWidth={2}
            />
          </AnimatedTouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: Colors.secondary,
    borderRadius: 24,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    minHeight: 48,
  },
  input: {
    flex: 1,
    fontSize: Typography.sizes.body,
    fontFamily: 'Inter-Regular',
    color: Colors.textPrimary,
    maxHeight: 120,
    marginRight: Spacing.sm,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonActive: {
    backgroundColor: Colors.accent,
  },
  sendButtonInactive: {
    backgroundColor: 'transparent',
  },
});