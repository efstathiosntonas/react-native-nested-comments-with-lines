import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg from 'react-native-svg';
import ArrowIcon from './ArrowIcon';

type CollapsibleViewProps = {
  children?: React.ReactNode;
  title?: string;
  collapsedTitle?: string;
  initExpanded?: boolean;
  nested?: number;
  length?: number;
  lastCommentIndex?: number;
  isParentLast?: boolean;
  parentCommentLength?: number;
};

const DURATION = 250;

const CollapsibleView = ({
  children,
  title = '',
  collapsedTitle = '',
  initExpanded = false,
  nested = 1,
  length = 0,
  lastCommentIndex = -1,
  isParentLast = false,
  parentCommentLength = 0,
}: CollapsibleViewProps) => {
  const [isExpanded, setIsExpanded] = useState(initExpanded);

  // Animate maxHeight
  const maxHeight = useSharedValue(initExpanded ? 4000 : 0);
  // Animate arrow rotation (0 = collapsed → pointing down, 180 = expanded → pointing up)
  const rotateAnim = useSharedValue(initExpanded ? 180 : 0);

  const contentAnimStyle = useAnimatedStyle(() => ({
    maxHeight: maxHeight.value,
    overflow: 'hidden',
  }));

  const arrowAnimStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${interpolate(rotateAnim.value, [0, 180], [0, 180])}deg` }],
    marginTop: 10,
    marginHorizontal: 4,
  }));

  const toggle = () => {
    const next = !isExpanded;
    setIsExpanded(next);
    maxHeight.value = withTiming(next ? 4000 : 0, {
      duration: DURATION,
      easing: Easing.ease,
    });
    rotateAnim.value = withTiming(next ? 180 : 0, {
      duration: DURATION,
      easing: Easing.ease,
    });
  };

  const marginLeft = nested === 1 ? 34 : 62;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggle} activeOpacity={0.8}>
        <View style={[styles.toggleRow, { marginLeft }]}>
          {/* Vertical border line */}
          <View
            style={[
              styles.verticalBorder,
              { height: isExpanded ? '160%' : '70%' } as any,
            ]}
          />

          {/* Extra outer line for nested === 2 */}
          {nested > 1 &&
            lastCommentIndex > -1 &&
            parentCommentLength === 1 &&
            !isParentLast && (
              <Svg height="160%" width={2} style={styles.nestedTwoLine} />
            )}
          {nested === 2 &&
            parentCommentLength === length - 1 &&
            length > 1 &&
            !isParentLast && (
              <Svg height="160%" width={2} style={styles.nestedTwoLine} />
            )}
          {nested === 2 && parentCommentLength > 1 && !isParentLast && (
            <Svg height="160%" width={2} style={styles.nestedTwoLine} />
          )}

          {/* Horizontal elbow when collapsed */}
          {!isExpanded && (
            <Svg height={2} width={10} style={styles.horizontalLine} />
          )}

          {/* Arrow */}
          <Animated.View style={arrowAnimStyle}>
            <ArrowIcon size={20} thickness={2} color="#888" />
          </Animated.View>

          <Text style={styles.toggleText}>
            {isExpanded ? collapsedTitle : title}
          </Text>
        </View>
      </TouchableOpacity>

      <Animated.View style={contentAnimStyle}>{children}</Animated.View>
    </View>
  );
};

export default CollapsibleView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  verticalBorder: {
    marginBottom: 12,
    borderLeftColor: '#555',
    borderLeftWidth: 2,
  },
  nestedTwoLine: {
    marginBottom: 10,
    backgroundColor: '#555',
    position: 'absolute',
    left: -28,
  },
  horizontalLine: {
    backgroundColor: '#555',
    marginTop: 10,
  },
  toggleText: {
    color: '#888',
    fontSize: 14,
    marginTop: 10,
  },
});
