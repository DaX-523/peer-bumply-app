import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentWrapper: {
    marginHorizontal: 32,
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
    zIndex: 1,
  },
  closeIcon: {
    fontSize: 18,
    color: '#6B7280',
  },
  matchTitleGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 8,
  },
  matchTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  matchSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  matchPhotoContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  matchPhoto: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: '#FCD34D',
  },
  heartBadge: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    fontSize: 16,
    color: 'white',
  },
  sendMessageButton: {
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 12,
  },
  sendMessageGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  sendMessageText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  keepSwipingButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  keepSwipingText: {
    fontSize: 16,
    color: '#6B7280',
  },
});
