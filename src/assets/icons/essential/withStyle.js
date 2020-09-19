import React from 'react';

export const withStyle = SVG => {
  return props => {
    return (
      <SVG
        width='100%'
        height='100%'
        fill='inherit'
        {...props}
      />
    );
  };
};

export default withStyle;
