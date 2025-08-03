import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ArrowLeft as ArrowLeftIcon, LogOut as LogOutIcon, User as UserIcon } from 'lucide-react-native';
import { CustomButton } from '../components/CustomButton';
import { useAuth } from '../contexts/AuthContext';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { Spacing } from '../constants/Spacing';

interface SettingsScreenProps {
  navigation: any;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { user, logout } = useAuth();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: logout,
        },
      ]
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        entering={FadeInDown.duration(400)}
        style={styles.header}
      >
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <ArrowLeftIcon size={24} color={Colors.textPrimary} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.placeholder} />
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(200).duration(600)}
        style={styles.content}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user ? getInitials(user.name) : 'U'}
              </Text>
            </View>
          </View>
          
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>
        </View>

        <View style={styles.settingsSection}>
          <TouchableOpacity style={styles.settingItem}>
            <UserIcon size={20} color={Colors.textSecondary} strokeWidth={2} />
            <Text style={styles.settingText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.logoutSection}>
          <CustomButton
            title="Logout"
            onPress={handleLogout}
            variant="secondary"
            size="large"
            style={styles.logoutButton}
          />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.secondary,
  },
  backButton: {
    padding: Spacing.sm,
  },
  title: {
    fontSize: Typography.sizes.h2,
    fontFamily: 'Inter-Bold',
    color: Colors.textPrimary,
  },
  placeholder: {
    width: 40, // Same width as back button for centering
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: Spacing.lg,
  },
  avatarContainer: {
    marginBottom: Spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: Typography.sizes.h1,
    fontFamily: 'Inter-Bold',
    color: Colors.primary,
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: Typography.sizes.h2,
    fontFamily: 'Inter-Bold',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  userEmail: {
    fontSize: Typography.sizes.body,
    fontFamily: 'Inter-Regular',
    color: Colors.textSecondary,
  },
  settingsSection: {
    marginBottom: Spacing.xl,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    borderRadius: 12,
    marginBottom: Spacing.md,
  },
  settingText: {
    fontSize: Typography.sizes.body,
    fontFamily: 'Inter-Medium',
    color: Colors.textPrimary,
    marginLeft: Spacing.md,
  },
  logoutSection: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: Spacing.lg,
  },
  logoutButton: {
    borderColor: Colors.error,
    backgroundColor: 'transparent',
  },
});