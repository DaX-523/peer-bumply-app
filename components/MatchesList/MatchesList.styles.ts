import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  matchesScreen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
  },
  matchesContainer: {
    flex: 1,
  },
  matchesList: {
    paddingBottom: 20,
  },
  matchItem: {
    marginBottom: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(252, 211, 77, 0.3)',
  },
  matchItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  matchAvatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  matchAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  newMatchBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  matchInfo: {
    flex: 1,
  },
  matchNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  matchName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  verifiedBadgeSmall: {
    marginLeft: 8,
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  verifiedTextSmall: {
    fontSize: 10,
    color: '#6B7280',
  },
  matchMessage: {
    fontSize: 14,
    color: '#6B7280',
  },
  matchTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  noMatches: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMatchesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  noMatchesSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
