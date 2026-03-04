// src/Features/articles/HomeTagList.test.tsx
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test-utils';
import { describe, it, expect } from 'vitest';
import TagList from './HomeTagList';

describe('HomeTagList Component', () => {
  it('debería mostrar el estado de carga inicialmente', () => {
    renderWithProviders(<TagList />);

    expect(screen.getByText('The tags are loading')).toBeInTheDocument();
  });

  it('debería renderizar los tags mockeados después de cargar', async () => {
    renderWithProviders(<TagList />);

    const reactTag = await screen.findByText('react');
    const testingTag = await screen.findByText('testing');
    const seniorTag = await screen.findByText('senior');

    expect(reactTag).toBeInTheDocument();
    expect(testingTag).toBeInTheDocument();
    expect(seniorTag).toBeInTheDocument();

    expect(screen.queryByText('The tags are loading')).not.toBeInTheDocument();
  });
});
