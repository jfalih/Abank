import React from 'react';
import { render } from '@testing-library/react-native';

import Divider from '.';

describe('Divider', () => {
  it('should render successfully', () => {
    const { container } = render(<Divider />);
    expect(container).toBeTruthy();
  });
});
