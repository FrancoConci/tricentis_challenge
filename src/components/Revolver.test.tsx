import { render, screen } from '@testing-library/react';
import Revolver from './Revolver';

describe('Revolver', () => {
  it('shows an input and a list of five default slides', async () => {
    render(<Revolver></Revolver>);

    const input = await screen.findByTestId('input');
    expect(input).toBeInTheDocument();
    expect(input).toBeVisible();

    const slide1 = await screen.findByTestId('item-please');
    const slide2 = await screen.findByTestId('item-select');
    const slide3 = await screen.findByTestId('item-an');
    const slide4 = await screen.findByTestId('item-artist');
    const slide5 = await screen.findByTestId('item-above!');
    expect(slide1).toBeInTheDocument();
    expect(slide2).toBeInTheDocument();
    expect(slide3).toBeInTheDocument();
    expect(slide4).toBeInTheDocument();
    expect(slide5).toBeInTheDocument();
    expect(slide1).toBeVisible();
    expect(slide2).toBeVisible();
    expect(slide3).toBeVisible();
    expect(slide4).toBeVisible();
    expect(slide5).toBeVisible();
  });
});
