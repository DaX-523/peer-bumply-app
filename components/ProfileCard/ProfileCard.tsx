import {User} from '../../utils/types';
import {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  PanGestureHandler,
  State,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import styles from './ProfileCard.styles';

const {width, height} = Dimensions.get('window');

// Profile Card Component
const ProfileCard = ({
  user,
  onLike,
  onPass,
  onSuperLike,
}: {
  user: User;
  onLike: () => void;
  onPass: () => void;
  onSuperLike: () => void;
}) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  const nextPhoto = () => {
    setCurrentPhotoIndex(prev => (prev + 1) % user.photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex(
      prev => (prev - 1 + user.photos.length) % user.photos.length,
    );
  };

  const onGestureEvent = Animated.event(
    [{nativeEvent: {translationX: translateX}}],
    {useNativeDriver: true},
  );

  const onHandlerStateChange = (event: {
    nativeEvent: {oldState: number; translationX: number};
  }) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const {translationX} = event.nativeEvent;

      if (translationX > 120) {
        // Swipe right - like
        Animated.timing(translateX, {
          toValue: width,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          onLike();
          translateX.setValue(0);
        });
      } else if (translationX < -120) {
        // Swipe left - pass
        Animated.timing(translateX, {
          toValue: -width,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          onPass();
          translateX.setValue(0);
        });
      } else {
        // Snap back
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const animatedStyle = {
    transform: [
      {translateX},
      {
        scale: translateX.interpolate({
          inputRange: [-width, 0, width],
          outputRange: [0.8, 1, 0.8],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  return (
    <GestureHandlerRootView>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <Animated.View style={[styles.card, animatedStyle]}>
          {/* Photo Section */}
          <View style={styles.photoContainer}>
            <TouchableOpacity
              style={styles.photoTouchLeft}
              onPress={prevPhoto}
              activeOpacity={1}
            />
            <TouchableOpacity
              style={styles.photoTouchRight}
              onPress={nextPhoto}
              activeOpacity={1}
            />

            <Image
              source={{uri: user.photos[currentPhotoIndex]}}
              style={styles.photo}
              resizeMode="cover"
            />

            {/* Photo Indicators */}
            {user.photos.length > 1 && (
              <View style={styles.photoIndicators}>
                {user.photos.map((_: string, index: number) => (
                  <View
                    key={index}
                    style={[
                      styles.indicator,
                      index === currentPhotoIndex && styles.activeIndicator,
                    ]}
                  />
                ))}
              </View>
            )}

            {/* Distance Badge */}
            <View style={styles.distanceBadge}>
              <Text style={styles.distanceText}>
                📍 {user.distance} km away
              </Text>
            </View>

            {/* Verified Badge */}
            {user.verified && (
              <LinearGradient
                colors={['#FCD34D', '#F59E0B']}
                style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>Socially-distanced</Text>
              </LinearGradient>
            )}
          </View>

          {/* Info Section */}
          <ScrollView
            style={styles.infoSection}
            showsVerticalScrollIndicator={false}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>
                {user.name}, {user.age}
              </Text>
              {user.verified && <Text style={styles.verifiedIcon}>✓</Text>}
            </View>

            {user.occupation && (
              <Text style={styles.occupation}>{user.occupation}</Text>
            )}

            {user.education && (
              <Text style={styles.education}>{user.education}</Text>
            )}

            <Text style={styles.bio}>{user.bio}</Text>

            {/* Interests */}
            <View style={styles.interestsContainer}>
              {user.interests.map((interest: string, index: number) => (
                <View key={index} style={styles.interestTag}>
                  <Text style={styles.interestText}>{interest}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={onPass}
              style={styles.passButton}
              activeOpacity={0.8}>
              <Text style={styles.passIcon}>✕</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onSuperLike}
              style={styles.superLikeButton}
              activeOpacity={0.8}>
              <LinearGradient
                colors={['#3B82F6', '#1D4ED8']}
                style={styles.gradientButton}>
                <Text style={styles.superLikeIcon}>⭐</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onLike}
              style={styles.likeButton}
              activeOpacity={0.8}>
              <LinearGradient
                colors={['#FCD34D', '#F59E0B']}
                style={styles.gradientButton}>
                <Text style={styles.likeIcon}>♥</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default ProfileCard;
