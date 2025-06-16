'use client';

import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {User, Match, Message} from './utils/types';
import {mockMatches, mockUsers} from './utils/mockData';
import MatchModal from './components/MatchModal/MatchModal';
import ChatInterface from './components/ChatInterface/ChatInterface';
import MatchesList from './components/MatchesList/MatchesList';
import ProfileCard from './components/ProfileCard/ProfileCard';
import styles from './App.styles';

// Main App Component
const BumbleApp = () => {
  const [currentScreen, setCurrentScreen] = useState<
    'discover' | 'matches' | 'chat' | 'profile'
  >('discover');
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [matches, setMatches] = useState<Match[]>(mockMatches);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [newMatch, setNewMatch] = useState<User | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const currentUser = mockUsers[currentUserIndex];

  const handleLike = () => {
    if (Math.random() > 0.75) {
      const newMatchData = {
        id: Date.now().toString(),
        user: currentUser,
        matchedAt: new Date(),
      };
      setMatches(prev => [newMatchData, ...prev]);
      setNewMatch(currentUser);
      setShowMatchModal(true);
    }
    nextUser();
  };

  const handlePass = () => {
    nextUser();
  };

  const handleSuperLike = () => {
    const newMatchData = {
      id: Date.now().toString(),
      user: currentUser,
      matchedAt: new Date(),
    };
    setMatches(prev => [newMatchData, ...prev]);
    setNewMatch(currentUser);
    setShowMatchModal(true);
    nextUser();
  };

  const nextUser = () => {
    if (currentUserIndex < mockUsers.length - 1) {
      setCurrentUserIndex(prev => prev + 1);
    } else {
      setCurrentUserIndex(0);
    }
  };

  const handleSelectMatch = (match: Match) => {
    setSelectedMatch(match);
    setChatMessages([]);
    setCurrentScreen('chat');
  };

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      fromMe: true,
    };
    setChatMessages(prev => [...prev, newMessage]);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'discover':
        return (
          <View style={styles.discoverContainer}>
            {currentUser ? (
              <ProfileCard
                user={currentUser}
                onLike={handleLike}
                onPass={handlePass}
                onSuperLike={handleSuperLike}
              />
            ) : (
              <View style={styles.noMoreProfiles}>
                <Text style={styles.noMoreText}>No more profiles</Text>
                <Text style={styles.noMoreSubtext}>
                  Check back later for new matches!
                </Text>
              </View>
            )}
          </View>
        );

      case 'matches':
        return (
          <View style={styles.matchesScreen}>
            <Text style={styles.screenTitle}>Matches</Text>
            <MatchesList matches={matches} onSelectMatch={handleSelectMatch} />
          </View>
        );

      case 'chat':
        return selectedMatch ? (
          <ChatInterface
            user={selectedMatch.user}
            messages={chatMessages}
            onBack={() => setCurrentScreen('matches')}
            onSendMessage={handleSendMessage}
          />
        ) : null;

      case 'profile':
        return (
          <View style={styles.profileScreen}>
            <Text style={styles.screenTitle}>Profile</Text>
            <View style={styles.profilePlaceholder}>
              <Text style={styles.profilePlaceholderIcon}>👤</Text>
              <Text style={styles.profilePlaceholderTitle}>
                Profile Settings
              </Text>
              <Text style={styles.profilePlaceholderSubtitle}>
                Edit your profile and preferences
              </Text>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#F59E0B" />

      {/* Header */}
      {currentScreen !== 'chat' && (
        <LinearGradient colors={['#FCD34D', '#F59E0B']} style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Peep Bumbly</Text>
          </View>
        </LinearGradient>
      )}

      {/* Main Content */}
      <LinearGradient
        colors={['#FFFBEB', '#FEF3C7']}
        style={styles.mainContent}>
        {renderScreen()}
      </LinearGradient>

      {/* Bottom Navigation */}
      {currentScreen !== 'chat' && (
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={[
              styles.navButton,
              currentScreen === 'discover' && styles.activeNavButton,
            ]}
            onPress={() => setCurrentScreen('discover')}
            activeOpacity={0.7}>
            {currentScreen === 'discover' ? (
              <LinearGradient
                colors={['#FCD34D', '#F59E0B']}
                style={styles.navButtonGradient}>
                <Text style={styles.activeNavIcon}>♥</Text>
              </LinearGradient>
            ) : (
              <Text style={styles.navIcon}>♥</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navButton,
              currentScreen === 'matches' && styles.activeNavButton,
            ]}
            onPress={() => setCurrentScreen('matches')}
            activeOpacity={0.7}>
            {currentScreen === 'matches' ? (
              <LinearGradient
                colors={['#FCD34D', '#F59E0B']}
                style={styles.navButtonGradient}>
                <Text style={styles.activeNavIcon}>💬</Text>
              </LinearGradient>
            ) : (
              <View>
                <Text style={styles.navIcon}>💬</Text>
                {matches.length > 0 && (
                  <LinearGradient
                    colors={['#FCD34D', '#F59E0B']}
                    style={styles.notificationBadge}>
                    <Text style={styles.notificationText}>
                      {matches.length}
                    </Text>
                  </LinearGradient>
                )}
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navButton,
              currentScreen === 'profile' && styles.activeNavButton,
            ]}
            onPress={() => setCurrentScreen('profile')}
            activeOpacity={0.7}>
            {currentScreen === 'profile' ? (
              <LinearGradient
                colors={['#FCD34D', '#F59E0B']}
                style={styles.navButtonGradient}>
                <Text style={styles.activeNavIcon}>👤</Text>
              </LinearGradient>
            ) : (
              <Text style={styles.navIcon}>👤</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {/* Match Modal */}
      <MatchModal
        user={newMatch}
        visible={showMatchModal}
        onClose={() => {
          setShowMatchModal(false);
          setNewMatch(null);
        }}
        onSendMessage={() => {
          setShowMatchModal(false);
          setNewMatch(null);
          setCurrentScreen('matches');
        }}
      />
    </SafeAreaView>
  );
};

export default BumbleApp;
