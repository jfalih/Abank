import React from 'react';
import Default from './Default';

export interface HeaderProps {
  type: keyof typeof Components;
}

type PostPropsType = any;

type HeaderMultipleProps = HeaderProps & PostPropsType;

const Components = {
  default: Video,
};

const Header: React.FC<HeaderMultipleProps> = React.memo(
  React.forwardRef((props, ref) => {
    const {type, ...rest} = props;

    const HeaderComponents: React.ElementType =
      Components[type as keyof typeof Components];

    return (
      <HeaderComponents
        ref={ref}
        {...(rest as React.ComponentProps<typeof HeaderComponents>)}
      />
    );
  }),
);

export default Header;
