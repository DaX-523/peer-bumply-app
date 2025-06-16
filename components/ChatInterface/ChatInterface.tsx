import {User, Message} from '../../utils/types';
import {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './ChatInterface.styles';

const ChatInterface = ({
  user,
  messages,
  onBack,
  onSendMessage,
}: {
  user: User;
  messages: Message[];
  onBack: () => void;
  onSendMessage: (text: string) => void;
}) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  };

  const renderMessage = ({item: message}: {item: Message}) => (
    <View
      style={[
        styles.messageContainer,
        message.fromMe
          ? styles.myMessageContainer
          : styles.theirMessageContainer,
      ]}>
      {message.fromMe ? (
        <LinearGradient
          colors={['#FCD34D', '#F59E0B']}
          style={[styles.messageBubble, styles.myMessageBubble]}>
          <Text style={styles.myMessageText}>{message.text}</Text>
          <Text style={styles.myMessageTime}>
            {formatTime(message.timestamp)}
          </Text>
        </LinearGradient>
      ) : (
        <View style={[styles.messageBubble, styles.theirMessageBubble]}>
          <Text style={styles.theirMessageText}>{message.text}</Text>
          <Text style={styles.theirMessageTime}>
            {formatTime(message.timestamp)}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.chatContainer}>
      {/* Chat Header */}
      <LinearGradient
        colors={['rgba(252, 211, 77, 0.1)', 'rgba(245, 158, 11, 0.05)']}
        style={styles.chatHeader}>
        <View style={styles.chatHeaderContent}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>

          <Image source={{uri: user.photos[0]}} style={styles.chatAvatar} />

          <View style={styles.chatUserInfo}>
            <Text style={styles.chatUserName}>{user.name}</Text>
            <Text style={styles.chatUserStatus}>Online now</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Messages */}
      <View style={styles.messagesContainer}>
        {messages.length === 0 ? (
          <View style={styles.emptyChat}>
            <Text style={styles.emptyChatTitle}>
              You matched with {user.name}!
            </Text>
            <Text style={styles.emptyChatSubtitle}>Start the conversation</Text>
          </View>
        ) : (
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.messagesList}
          />
        )}
      </View>

      {/* Message Input */}
      <View style={styles.messageInputContainer}>
        <View style={styles.messageInputWrapper}>
          <TextInput
            style={styles.messageInput}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message..."
            placeholderTextColor="#9CA3AF"
            multiline
          />
          <TouchableOpacity
            onPress={handleSend}
            style={styles.sendButton}
            disabled={!newMessage.trim()}
            activeOpacity={0.8}>
            <LinearGradient
              colors={
                newMessage.trim()
                  ? ['#FCD34D', '#F59E0B']
                  : ['#D1D5DB', '#9CA3AF']
              }
              style={styles.sendButtonGradient}>
              <Text style={styles.sendIcon}>→</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChatInterface;
