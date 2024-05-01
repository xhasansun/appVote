import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Loading from '../components/Loading/page';

describe('Loading Component', () => {
  it('should render loading text', () => {
    render(<Loading />);
    expect(screen.getByText('Yükleniyor')).toBeInTheDocument();
  });
});
