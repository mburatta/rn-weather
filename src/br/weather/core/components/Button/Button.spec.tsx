import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {MyButton} from './Button';

describe('MyButton', () => {
    test('renders the provided text', () => {
        render(<MyButton text="Tap me" onPress={jest.fn()} />);

        // The text should be visible
        expect(screen.getByText('Tap me')).toBeTruthy();
    });

    test('calls onPress when pressed', () => {
        const onPress = jest.fn();
        render(<MyButton text="Tap me" onPress={onPress} />);

        // Find the button by role and accessible name
        const button = screen.getByRole('button', { name: /tap me/i });
        fireEvent.press(button);

        expect(onPress).toHaveBeenCalledTimes(1);
    });

    test('has accessibilityRole="button" and accessible name equals to text', () => {
        render(<MyButton text="Confirm" onPress={jest.fn()} />);

        const button = screen.getByRole('button', { name: /confirm/i });
        expect(button).toBeTruthy();
    });

    test('does not crash if onPress is not provided', () => {
        render(<MyButton text="No handler" />);

        const button = screen.getByRole('button', { name: /no handler/i });
        // Should not throw when pressed even without onPress
        expect(() => fireEvent.press(button)).not.toThrow();
    });
});
