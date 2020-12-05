export const withStyle = (
  SVG: React.FC<React.SVGProps<SVGSVGElement>>,
): React.FC => {
  return props => {
    return (
      <SVG
        width='100%'
        height='100%'
        fill='inherit'
        stroke='inherit'
        {...props}
      />
    );
  };
};

export default withStyle;
