import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { Spacing } from '../constants/Spacing';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
    opacity.value = withTiming(0.8);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    opacity.value = withTiming(1);
  };

  const getButtonStyle = (): ViewStyle => {
    const baseStyle = styles.base;
    const sizeStyle = styles[size];
    const variantStyle = styles[variant];
    
    return {
      ...baseStyle,
      ...sizeStyle,
      ...variantStyle,
      opacity: disabled ? 0.5 : 1,
    };
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle = styles.baseText;
    const sizeTextStyle = styles[`${size}Text`];
    const variantTextStyle = styles[`${variant}Text`];
    
    return {
      ...baseTextStyle,
      ...sizeTextStyle,
      ...variantTextStyle,
    };
  };

  return (
    <AnimatedTouchableOpacity
      style={[animatedStyle, getButtonStyle(), style]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? Colors.primary : Colors.accent} />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  primary: {
    backgroundColor: Colors.accent,
  },
  secondary: {
    backgroundColor: Colors.secondary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  text: {
    backgroundColor: 'transparent',
  },
  small: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    minHeight: 36,
  },
  medium: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    minHeight: 48,
  },
  large: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    minHeight: 56,
  },
  baseText: {
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  smallText: {
    fontSize: Typography.sizes.caption,
  },
  mediumText: {
    fontSize: Typography.sizes.body,
  },
  largeText: {
    fontSize: Typography.sizes.h3,
  },
  primaryText: {
    color: Colors.primary,
  },
  secondaryText: {
    color: Colors.textPrimary,
  },
  textText: {
    color: Colors.accent,
  },
});