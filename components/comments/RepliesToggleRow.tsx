import React, { FC } from 'react';
import { LayoutChangeEvent, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  isExpanded: boolean;
  onAnchorWithinRow?: (y: number) => void;
  onToggle: () => void;
  repliesCount: number;
  testID?: string;
};

const RepliesToggleRow: FC<Props> = ({
  isExpanded,
  onAnchorWithinRow,
  onToggle,
  repliesCount,
  testID,
}) => {
  const title = isExpanded
    ? repliesCount === 1 ? 'Hide reply' : 'Hide replies'
    : repliesCount === 1 ? `View ${repliesCount} reply` : `View ${repliesCount} replies`;

  const handleAnchorLayout = (e: LayoutChangeEvent) => {
    onAnchorWithinRow?.(e.nativeEvent.layout.height / 2);
  };

  return (
    <View style={styles.container} testID={testID}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: isExpanded }}
        onLayout={handleAnchorLayout}
        onPress={onToggle}
        style={styles.button}
        testID={testID ? `${testID}-button` : undefined}
      >
        <Text style={styles.label}>{title}</Text>
        <Text style={styles.chevron}>{isExpanded ? ' ∧' : ' ∨'}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 8,
    paddingVertical: 10,
  },
  chevron: {
    color: '#C8C8C8',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 18,
  },
  container: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  label: {
    color: '#C8C8C8',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default RepliesToggleRow;
