import React from 'react';
import { render } from '@testing-library/react-native';

import Pressable from '.';

describe('Pressable', () => {
  it('should render successfully', () => {
    const { container } = render(<Pressable />);
    expect(container).toBeTruthy();
  });
});
