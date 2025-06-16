import {User} from '../../utils/types';
import {useRef, useEffect} from 'react';
import {Animated, View, Text, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './MatchModal.styles';
// Match Modal Component
const MatchModal = ({
  user,
  visible,
  onClose,
  onSendMessage,
}: {
  user: User | null;
  visible: boolean;
  onClose: () => void;
  onSendMessage: () => void;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.modalOverlay, {opacity: fadeAnim}]}>
      <LinearGradient
        colors={[
          'rgba(252, 211, 77, 0.9)',
          'rgba(245, 158, 11, 0.9)',
          'rgba(234, 88, 12, 0.9)',
        ]}
        style={styles.modalGradient}>
        <Animated.View
          style={[
            styles.modalContentWrapper,
            {transform: [{scale: scaleAnim}]},
          ]}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>

            <LinearGradient
              colors={['#FCD34D', '#F59E0B']}
              style={styles.matchTitleGradient}>
              <Text style={styles.matchTitle}>It's a Match!</Text>
            </LinearGradient>

            <Text style={styles.matchSubtitle}>
              You and {user?.name} liked each other
            </Text>

            <View style={styles.matchPhotoContainer}>
              <Image
                source={{uri: user?.photos[0]}}
                style={styles.matchPhoto}
              />
              <LinearGradient
                colors={['#EC4899', '#BE185D']}
                style={styles.heartBadge}>
                <Text style={styles.heartIcon}>♥</Text>
              </LinearGradient>
            </View>

            <TouchableOpacity
              onPress={onSendMessage}
              style={styles.sendMessageButton}
              activeOpacity={0.8}>
              <LinearGradient
                colors={['#FCD34D', '#F59E0B']}
                style={styles.sendMessageGradient}>
                <Text style={styles.sendMessageText}>Send Message</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onClose}
              style={styles.keepSwipingButton}
              activeOpacity={0.7}>
              <Text style={styles.keepSwipingText}>Keep Swiping</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );
};

export default MatchModal;
