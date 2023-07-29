import React from 'react';
import { render } from '@testing-library/react-native';

import Flex from '.';

describe('Flex', () => {
  it('should render successfully', () => {
    const { container } = render(<Flex />);
    expect(container).toBeTruthy();
  });
});
