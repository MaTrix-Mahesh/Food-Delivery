import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CheckoutModal from '../Components/CheckoutModal';
import * as CartContextModule from '../context/CartContext';

describe('CheckoutModal Component', () => {
  const placeOrderMock = vi.fn();
  const setIsCheckoutOpenMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setup = () => {
    vi.spyOn(CartContextModule, 'useCart').mockReturnValue({
      cart: [{ id: '1', name: 'Pizza', price: 399, quantity: 1 }],
      subtotal: 399,
      deliveryFee: 0,
      tax: 20,
      discount: 0,
      finalTotal: 419,
      isCheckoutOpen: true,
      setIsCheckoutOpen: setIsCheckoutOpenMock,
      placeOrder: placeOrderMock,
      user: { name: 'Rahul Sharma', email: 'rahul@example.com' },
    });

    return render(<CheckoutModal />);
  };

  it('rejects submission when mobile number is less than 10 digits (e.g. 123)', () => {
    setup();

    const phoneInput = screen.getByLabelText(/Mobile Number/i);
    const submitBtn = screen.getByRole('button', { name: /Confirm Order/i });

    // Set invalid short phone
    fireEvent.change(phoneInput, { target: { value: '123' } });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Valid 10-digit mobile number required')).toBeInTheDocument();
    expect(placeOrderMock).not.toHaveBeenCalled();
  });

  it('rejects submission when mobile number contains non-numeric text', () => {
    setup();

    const phoneInput = screen.getByLabelText(/Mobile Number/i);
    const submitBtn = screen.getByRole('button', { name: /Confirm Order/i });

    // Set invalid text
    fireEvent.change(phoneInput, { target: { value: 'invalidphone' } });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Valid 10-digit mobile number required')).toBeInTheDocument();
    expect(placeOrderMock).not.toHaveBeenCalled();
  });

  it('accepts valid 10-digit mobile number and submits order successfully', async () => {
    setup();

    const phoneInput = screen.getByLabelText(/Mobile Number/i);
    const submitBtn = screen.getByRole('button', { name: /Confirm Order/i });

    // Set valid Indian 10-digit phone
    fireEvent.change(phoneInput, { target: { value: '9876543210' } });
    fireEvent.click(submitBtn);

    expect(screen.queryByText('Valid 10-digit mobile number required')).not.toBeInTheDocument();

    await waitFor(() => {
      expect(placeOrderMock).toHaveBeenCalled();
    }, { timeout: 2000 });
  });

  it('accepts formatted +91 mobile number with valid 10 digits', async () => {
    setup();

    const phoneInput = screen.getByLabelText(/Mobile Number/i);
    const submitBtn = screen.getByRole('button', { name: /Confirm Order/i });

    fireEvent.change(phoneInput, { target: { value: '+91 98765 43210' } });
    fireEvent.click(submitBtn);

    expect(screen.queryByText('Valid 10-digit mobile number required')).not.toBeInTheDocument();

    await waitFor(() => {
      expect(placeOrderMock).toHaveBeenCalled();
    }, { timeout: 2000 });
  });
});
