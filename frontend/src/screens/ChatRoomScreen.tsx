import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { ArrowLeft as ArrowLeftIcon } from 'lucide-react-native';
import { MessageBubble } from '../components/MessageBubble';
import { MessageInput } from '../components/MessageInput';
import { Chat, Message } from '../types';
import * as api from '../services/api';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { Spacing } from '../constants/Spacing';

interface ChatRoomScreenProps {
  navigation: any;
  route: {
    params: {
      chat: Chat;
    };
  };
}

export const ChatRoomScreen: React.FC<ChatRoomScreenProps> = ({ navigation, route }) => {
  const { chat } = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const fetchedMessages = await api.fetchMessages(chat.id);
      setMessages(fetchedMessages.reverse()); // Reverse to show latest at bottom
    } catch (error) {
      Alert.alert('Error', 'Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (text: string) => {
    try {
      setSendingMessage(true);
      const newMessage = await api.sendMessage(chat.id, text);
      setMessages(prev => [...prev, newMessage]);
      
      // Scroll to bottom after sending
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      Alert.alert('Error', 'Failed to send message');
    } finally {
      setSendingMessage(false);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const renderMessage = ({ item, index }: { item: Message; index: number }) => (
    <MessageBubble message={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        entering={FadeInUp.duration(400)}
        style={styles.header}
      >
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <ArrowLeftIcon size={24} color={Colors.textPrimary} strokeWidth={2} />
        </TouchableOpacity>
        
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {chat.user.name
                .split(' ')
                .map(word => word[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)}
            </Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{chat.user.name}</Text>
            <Text style={[styles.userStatus, { color: chat.user.isOnline ? Colors.success : Colors.textSecondary }]}>
              {chat.user.isOnline ? 'Online' : 'Offline'}
            </Text>
          </View>
        </View>
      </Animated.View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <MessageInput onSend={handleSendMessage} loading={sendingMessage} />
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
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.secondary,
  },
  backButton: {
    padding: Spacing.sm,
    marginRight: Spacing.sm,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  avatarText: {
    fontSize: Typography.sizes.body,
    fontFamily: 'Inter-Bold',
    color: Colors.primary,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: Typography.sizes.body,
    fontFamily: 'Inter-SemiBold',
    color: Colors.textPrimary,
  },
  userStatus: {
    fontSize: Typography.sizes.caption,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: Spacing.md,
  },
});