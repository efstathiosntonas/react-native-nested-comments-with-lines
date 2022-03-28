/* eslint-disable react/prop-types */
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AnimatedSection, useCollapsible} from 'reanimated-collapsible-helpers';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import ArrowIcon from './ArrowIcon';
import Svg from 'react-native-svg';

const ROTATE_ANGLE = 180;

const CollapsibleView = ({
  children = [],
  title = '',
  touchableWrapperStyle = {},
  initExpanded = false,
  expanded = null,
  unmountOnCollapse = false,
  duration = 200,
  collapsibleContainerStyle = {},
  arrowStyling = {},
  noArrow = false,
  activeOpacityFeedback = 0.9,
  TouchableComponent = TouchableOpacity,
  titleProps = {},
  titleStyle = {},
  touchableWrapperProps = {},
  nested = 0,
  lastCommentIndex = -1,
  length = 0,
  collapsedTitle = '',
  isParentLast = false,
  parentCommentLength = 0
}) => {
  const [show, setShow] = useState<boolean | null | undefined>(initExpanded);

  const {animatedHeight, onPress, onLayout, state, mounted, setMounted} =
    useCollapsible({
      state: initExpanded ? 'expanded' : 'collapsed',
      unmountOnCollapse,
      show
    });

  const rotateAnim = useSharedValue(0);

  if (!mounted && expanded) {
    setMounted(true);
  }

  const rotation = useDerivedValue(() => {
    return interpolate(rotateAnim.value, [180, 360], [180, 360]);
  });

  const arrowAnimatedStyle = useAnimatedStyle(() => {
    return {
      marginTop: 10,
      marginHorizontal: 4,
      transform: [
        {
          rotate: `${rotation.value}deg`
        }
      ]
    };
  });

  const handleArrowRotate = useCallback(
    (open = null) => {
      const _open = open === null ? show : open;
      if (!_open) {
        rotateAnim.value = withTiming(0, {duration, easing: Easing.ease});
      } else {
        rotateAnim.value = withTiming(ROTATE_ANGLE, {
          duration,
          easing: Easing.ease
        });
      }
    },
    [duration, rotateAnim, show]
  );

  const handleToggleShow = () => {
    if (!mounted) {
      if (!show) {
        onPress();
        setMounted(true);
      }
    } else {
      onPress();
      setShow(!show);
    }
  };

  useEffect(() => {
    // this part is to trigger collapsible animation only after he has been fully mounted so animation would
    // not be interrupted.
    if (mounted) {
      setShow(true);
    }
  }, [mounted]);

  useEffect(
    () => {
      // on mounting set the rotation angle
      rotateAnim.value = show ? 0 : ROTATE_ANGLE;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (mounted) {
      handleArrowRotate(show);
    }
    if (show !== expanded) {
      setShow(expanded);
    }
  }, [expanded, handleArrowRotate, mounted, show]);

  return (
    <View style={styles.container}>
      <TouchableComponent
        style={[touchableWrapperStyle]}
        onPress={handleToggleShow}
        activeOpacity={activeOpacityFeedback}
        {...touchableWrapperProps}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            ...titleStyle,
            marginLeft: nested === 1 ? 34 : 62
          }}
          {...titleProps}>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              height: state === 'expanded' ? '160%' : '70%',
              marginBottom: 12,
              borderLeftColor: '#d9d9d9',
              borderLeftWidth: nested === 1 ? 2 : 2
            }}
          />
          {nested > 1 &&
          lastCommentIndex > -1 &&
          parentCommentLength === 1 &&
          !isParentLast ? (
            <Svg height="160%" width={2} style={styles.nestedTwoLine} />
          ) : null}

          {nested === 2 &&
          parentCommentLength === length - 1 &&
          length > 1 &&
          !isParentLast ? (
            <Svg height="160%" width={2} style={styles.nestedTwoLine} />
          ) : null}

          {nested === 2 && parentCommentLength > 1 && !isParentLast ? (
            <Svg height="160%" width={2} style={styles.nestedTwoLine} />
          ) : null}

          {nested === 2 &&
          parentCommentLength > length &&
          length > 1 &&
          !isParentLast ? (
            <Svg height="160%" width={2} style={styles.nestedTwoLine} />
          ) : null}

          {nested === 2 &&
          length > 1 &&
          parentCommentLength > length &&
          !isParentLast ? (
            <Svg height="160%" width={2} style={styles.nestedTwoLine} />
          ) : null}

          {state !== 'expanded' ? (
            <Svg height={2} width={10} style={styles.horizontalLine} />
          ) : null}

          {noArrow ? null : (
            <Animated.View style={arrowAnimatedStyle}>
              <ArrowIcon {...arrowStyling} />
            </Animated.View>
          )}
          <Text style={styles.title}>
            {state === 'collapsed' ? title : collapsedTitle}
          </Text>
        </View>
      </TouchableComponent>
      {mounted ? (
        <AnimatedSection
          animatedHeight={animatedHeight}
          onLayout={onLayout}
          state={state}
          style={{
            width: '100%',
            ...collapsibleContainerStyle
          }}>
          {children}
        </AnimatedSection>
      ) : null}
    </View>
  );
};

export default CollapsibleView;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    color: '#9C9C9C',
    fontSize: 16,
    marginTop: 10
  },
  nestedTwoLine: {
    marginBottom: 10,
    backgroundColor: '#d9d9d9',
    position: 'absolute',
    left: -28
  },
  horizontalLine: {
    backgroundColor: '#d9d9d9',
    marginTop: 10
  }
});
