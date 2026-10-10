import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SpecialOffers from '../sections/SpecialOffers';
import * as CartContextModule from '../context/CartContext';

describe('SpecialOffers Component', () => {
  it('does NOT display "Applied!" if coupon is rejected (e.g. minimum spend not met)', async () => {
    const applyCouponMock = vi.fn().mockReturnValue(false);
    const setIsCartOpenMock = vi.fn();

    vi.spyOn(CartContextModule, 'useCart').mockReturnValue({
      applyCoupon: applyCouponMock,
      setIsCartOpen: setIsCartOpenMock,
      appliedCoupon: null,
    });

    render(<SpecialOffers />);

    const claimButtons = screen.getAllByRole('button', { name: /Claim Deal/i });
    expect(claimButtons.length).toBeGreaterThan(0);

    // Click first claim deal button
    fireEvent.click(claimButtons[0]);

    expect(applyCouponMock).toHaveBeenCalled();
    expect(setIsCartOpenMock).toHaveBeenCalledWith(true);

    // Button must show "Code Copied!" and NOT "Applied!"
    expect(screen.getByText('Code Copied!')).toBeInTheDocument();
    expect(screen.queryByText('Applied!')).not.toBeInTheDocument();
  });

  it('displays "Applied!" when coupon is successfully applied', async () => {
    const applyCouponMock = vi.fn().mockReturnValue(true);
    const setIsCartOpenMock = vi.fn();

    vi.spyOn(CartContextModule, 'useCart').mockReturnValue({
      applyCoupon: applyCouponMock,
      setIsCartOpen: setIsCartOpenMock,
      appliedCoupon: null,
    });

    render(<SpecialOffers />);

    const claimButtons = screen.getAllByRole('button', { name: /Claim Deal/i });

    // Click first claim deal button
    fireEvent.click(claimButtons[0]);

    expect(applyCouponMock).toHaveBeenCalled();
    expect(setIsCartOpenMock).toHaveBeenCalledWith(true);

    // Button should show "Applied!"
    expect(screen.getByText('Applied!')).toBeInTheDocument();
  });
});
