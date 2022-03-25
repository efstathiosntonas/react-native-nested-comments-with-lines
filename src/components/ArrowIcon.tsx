import React from 'react';
import Svg, {Polyline} from 'react-native-svg';

export default ({
  // @ts-ignore
  size: s = 24,
  thickness = s / 16,
  color = 'black',
  rounded = false,
  svgProps = {},
  polylineProps = {}
}) => {
  const roundedCorners = rounded
    ? {strokeLinecap: 'round', strokeLinejoin: 'round'}
    : {};

  return (
    <Svg width={s} height={s} {...svgProps}>
      {/*@ts-ignore*/}
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
