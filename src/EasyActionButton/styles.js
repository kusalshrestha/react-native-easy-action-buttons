import { StyleSheet, Dimensions } from 'react-native'

const getWidthRatio = percentageHeight => Dimensions.get('window').width * (percentageHeight / 100)

export const MAIN_BUTTON_SIZE = 60
export const SUB_BUTTONS_SIZE = 50

export default StyleSheet.create({
  mainWrapper: {
    width: getWidthRatio(100),
    height: 120,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(52, 52, 52, 0.4)'
  },
  wrapper: {
    width: getWidthRatio(100),
    height: 120,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "transparent"
  },
  mainButton: {
    position: 'absolute',
    zIndex: 2,
    width: MAIN_BUTTON_SIZE,
    height: MAIN_BUTTON_SIZE,
    borderRadius: MAIN_BUTTON_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainCircularView: {
    width: MAIN_BUTTON_SIZE,
    height: MAIN_BUTTON_SIZE,
    borderRadius: MAIN_BUTTON_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#59D791"
  },
  shadow: {
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 5,
      width: 0
    }
  },
  subButtons: {
    position: 'absolute',
    zIndex: 1,
    width: SUB_BUTTONS_SIZE,
    height: SUB_BUTTONS_SIZE,
    borderRadius: SUB_BUTTONS_SIZE / 2
  },
  circularView: {
    width: SUB_BUTTONS_SIZE,
    height: SUB_BUTTONS_SIZE,
    borderRadius: SUB_BUTTONS_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFBA0D'
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: "white"
  },
  titleStyle: {
    fontSize: 9,
    color: "white",
    textAlign: 'center'
  }
})
