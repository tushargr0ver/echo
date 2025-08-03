import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Settings as SettingsIcon } from 'lucide-react-native';
import { ChatListItem } from '../components/ChatListItem';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { useAuth } from '../contexts/AuthContext';
import { Chat } from '../types';
import * as api from '../services/api';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { Spacing } from '../constants/Spacing';

interface ChatListScreenProps {
  navigation: any;
}

export const ChatListScreen: React.FC<ChatListScreenProps> = ({ navigation }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      const fetchedChats = await api.fetchChats();
      setChats(fetchedChats);
    } catch (error) {
      Alert.alert('Error', 'Failed to load chats');
    } finally {
      setLoading(false);
    }
  };

  const handleChatPress = (chat: Chat) => {
    navigation.navigate('ChatRoom', { chat });
  };

  const handleNewChat = () => {
    Alert.alert('New Chat', 'This feature will be implemented with backend integration');
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  const renderChatItem = ({ item, index }: { item: Chat; index: number }) => (
    <ChatListItem
      chat={item}
      onPress={() => handleChatPress(item)}
      index={index}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        entering={FadeInDown.duration(400)}
        style={styles.header}
      >
        <View>
          <Text style={styles.greeting}>Hello, {user?.name?.split(' ')[0]}</Text>
          <Text style={styles.title}>Chats</Text>
        </View>
        <TouchableOpacity onPress={handleSettings} style={styles.settingsButton}>
          <SettingsIcon size={24} color={Colors.textPrimary} strokeWidth={2} />
        </TouchableOpacity>
      </Animated.View>

      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatList}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={loadChats}
      />

      <FloatingActionButton onPress={handleNewChat} />
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
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  greeting: {
    fontSize: Typography.sizes.body,
    fontFamily: 'Inter-Regular',
    color: Colors.textSecondary,
  },
  title: {
    fontSize: Typography.sizes.h1,
    fontFamily: 'Inter-Bold',
    color: Colors.textPrimary,
    marginTop: Spacing.xs,
  },
  settingsButton: {
    padding: Spacing.sm,
    borderRadius: 8,
  },
  chatList: {
    paddingBottom: 100, // Space for FAB
  },
});