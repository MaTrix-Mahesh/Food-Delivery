import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Components/Navbar';
import * as CartContextModule from '../context/CartContext';

describe('Navbar Component', () => {
  it('renders logo and navigation links', () => {
    vi.spyOn(CartContextModule, 'useCart').mockReturnValue({
      cartCount: 0,
      subtotal: 0,
      setIsCartOpen: vi.fn(),
      activeOrder: null,
      setIsOrderTrackingOpen: vi.fn(),
      user: { name: 'Guest', isLoggedIn: false },
      setUser: vi.fn(),
      setIsAuthOpen: vi.fn(),
    });

    render(<Navbar />);
    expect(screen.getByText(/FAST/i)).toBeInTheDocument();
    expect(screen.getByText(/BITE/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Menu$/i })).toBeInTheDocument();
  });

  it('renders active order pill and opens tracking modal on click', () => {
    const setIsOrderTrackingOpenMock = vi.fn();
    vi.spyOn(CartContextModule, 'useCart').mockReturnValue({
      cartCount: 1,
      subtotal: 349,
      setIsCartOpen: vi.fn(),
      activeOrder: { id: 'FB-998877', total: 349 },
      setIsOrderTrackingOpen: setIsOrderTrackingOpenMock,
      user: { name: 'Rahul', isLoggedIn: true },
      setUser: vi.fn(),
      setIsAuthOpen: vi.fn(),
    });

    render(<Navbar />);

    const pill = screen.getByTitle('Click to view live order progress');
    expect(pill).toBeInTheDocument();
    expect(screen.getByText(/Order #FB-998877 Active/i)).toBeInTheDocument();

    // Click on active order pill
    fireEvent.click(pill);
    expect(setIsOrderTrackingOpenMock).toHaveBeenCalledWith(true);
  });
});
