import {Match} from '../../utils/types';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './MatchesList.styles';
// Matches List Component
const MatchesList = ({
  matches,
  onSelectMatch,
}: {
  matches: Match[];
  onSelectMatch: (match: Match) => void;
}) => {
  const formatLastMessage = (match: Match) => {
    if (!match.lastMessage) return 'Say hello!';
    const prefix = match.lastMessage.fromMe ? 'You: ' : '';
    return prefix + match.lastMessage.text;
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) return 'now';
    if (diffInHours < 24) return `${diffInHours}h`;
    return `${Math.floor(diffInHours / 24)}d`;
  };

  const renderMatch = ({item: match}: {item: Match}) => (
    <TouchableOpacity
      style={styles.matchItem}
      onPress={() => onSelectMatch(match)}
      activeOpacity={0.7}>
      <View style={styles.matchItemContent}>
        <View style={styles.matchAvatarContainer}>
          <Image
            source={{uri: match.user.photos[0]}}
            style={styles.matchAvatar}
          />
          {!match.lastMessage && (
            <LinearGradient
              colors={['#FCD34D', '#F59E0B']}
              style={styles.newMatchBadge}
            />
          )}
        </View>

        <View style={styles.matchInfo}>
          <View style={styles.matchNameRow}>
            <Text style={styles.matchName}>{match.user.name}</Text>
            {match.user.verified && (
              <View style={styles.verifiedBadgeSmall}>
                <Text style={styles.verifiedTextSmall}>✓</Text>
              </View>
            )}
          </View>
          <Text style={styles.matchMessage} numberOfLines={1}>
            {formatLastMessage(match)}
          </Text>
        </View>

        {match.lastMessage && (
          <Text style={styles.matchTime}>
            {formatTime(match.lastMessage.timestamp)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.matchesContainer}>
      {matches.length === 0 ? (
        <View style={styles.noMatches}>
          <Text style={styles.noMatchesTitle}>No matches yet</Text>
          <Text style={styles.noMatchesSubtitle}>
            Keep swiping to find your perfect match!
          </Text>
        </View>
      ) : (
        <FlatList
          data={matches}
          renderItem={renderMatch}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.matchesList}
        />
      )}
    </View>
  );
};

export default MatchesList;
