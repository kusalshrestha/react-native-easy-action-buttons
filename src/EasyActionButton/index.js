import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Animated, Text, LayoutAnimation, UIManager, Platform, Dimensions } from 'react-native'

import styles, { SUB_BUTTONS_SIZE } from './styles'

const RADIUS = 80
const getHeightRatio = percentageHeight => Dimensions.get('window').height * (percentageHeight / 100)


/**
 * `EasyActionButton` component to quickly switch between multiple options
 */
class EasyActionButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isActive: false,
      activeIndex: props.mainIndex,
      buttonCenter: { x: 0, y: 0 }
    }
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true)
      }
    }
  }

  /**
   * Toggles the state `isActive` and does the animation of the buttons' showing/hiding.
   */
  toggleAndAnimate = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }))
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }

  /**
   * The callback for the main button.
   */
  onMainButtonPress = () => {
    this.toggleAndAnimate()
  }

  /**
   * The callback for sub button actions around the main button.
   *
   * @param {object} item
   * @param {number} index
   */
  onSubButtonPress = (item, index) => {
    this.props.onChange(item, index)
    this.setState({ activeIndex: index })
    this.toggleAndAnimate()
  }

  /**
   * Returns the point on the circle with the center `cx, cy` and radius `radius` with angle `angle`
   * Formulae:
   * x = cx + r * cos(a)
   * y = cy + r * sin(a)
   *
   * @param {number} radius
   * @param {number} angle
   * @param {object} center
   * @returns {object}
   */
  getPointOnCircleFromAngle = (radius, angle, center) => {
    const x = center.x + radius * Math.cos(angle)
    const y = center.y - radius * Math.sin(angle)

    return { x, y }
  }

  /**
   * When the main wrapper view completes the layout.
   *
   * @param {object} event
   */
  mainButtonOnLayout = event => {
    const { width, height } = event.nativeEvent.layout
    this.setState({ buttonCenter: { x: width / 2, y: height / 2 } })
  }

  /**
   * Render the buttons around the main button.
   */
  renderSideButtons = ({ isActive, center: { x = 0, y = 0 } }) => {
    return this.props.buttons.map((item, index) => {
      // 180 because buttons are placed on semi circle path.
      const point = this.getPointOnCircleFromAngle(RADIUS, index * (180 / this.props.buttons.length), { x, y })
      const finalX = isActive ? point.x : x
      const finalY = isActive ? point.y : y

      return (
        <Animated.View
          style={[
            styles.subButtons,
            styles.shadow,
            { left: finalX - SUB_BUTTONS_SIZE / 2, top: finalY - SUB_BUTTONS_SIZE / 2 }
          ]}
        >
          <TouchableOpacity style={styles.circularView} onPress={() => this.onSubButtonPress(item, index)}>
            <View style={styles.circularView}>
              <Text style={styles.title}>{item.initials}</Text>
            </View>
          </TouchableOpacity>
          {isActive && <Text style={styles.titleStyle}>{item.title}</Text>}
        </Animated.View>
      )
    })
  }

  /**
   * Renders the main button that opens up/ closes off the side buttons.
   */
  renderMainButton = ({ selectedIndex }) => (
    <View style={[styles.mainButton, styles.shadow]}>
      <TouchableOpacity onPress={this.onMainButtonPress}>
        <View style={styles.mainCircularView}>
          <Text style={styles.title}>{this.props.buttons[selectedIndex].initials}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )

  render() {
    const mainContainerSize = this.state.isActive
      ? { height: getHeightRatio(100), backgroundColor: "rgba(52, 52, 52, 0.4)" }
      : { backgroundColor: "transparent" }

    return (
      <View style={[styles.mainWrapper, mainContainerSize]}>
        <View style={styles.wrapper} onLayout={this.mainButtonOnLayout}>
          <this.renderMainButton selectedIndex={this.state.activeIndex} />
          <this.renderSideButtons center={this.state.buttonCenter} isActive={this.state.isActive} />
        </View>
      </View>
    )
  }
}

EasyActionButton.defaultProps = {
  mainIndex: 0,
  onChange: () => {},
  buttons: [{ title: 'Untitled' }]
}

EasyActionButton.propTypes = {
  onChange: PropTypes.func,
  mainIndex: PropTypes.number,
  buttons: PropTypes.arrayOf(PropTypes.object)
}

export default EasyActionButton
