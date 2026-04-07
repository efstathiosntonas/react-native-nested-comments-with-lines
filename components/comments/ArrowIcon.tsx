import React from 'react';
import Svg, { Polyline } from 'react-native-svg';

export default ({
  size: s = 24,
  thickness = s / 16,
  color = 'black',
  rounded = false,
  svgProps = {},
  polylineProps = {},
}: {
  size?: number;
  thickness?: number;
  color?: string;
  rounded?: boolean;
  svgProps?: object;
  polylineProps?: object;
}) => {
  const roundedCorners = rounded
    ? { strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
    : {};

  return (
    <Svg width={s} height={s} {...svgProps}>
      <Polyline
        points={`${s / 6} ${s / 3} ${s / 2} ${s / 1.5} ${s / 1.2} ${s / 3}`}
        stroke={color}
        strokeWidth={`${thickness}`}
        fill="none"
        {...roundedCorners}
        {...polylineProps}
      />
    </Svg>
  );
};
