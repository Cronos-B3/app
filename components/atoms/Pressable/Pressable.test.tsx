import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Pressable from './Pressable';
import { Text } from 'react-native';

// Basic rendering test
describe('Pressable', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<Pressable testID="test-id-pressable">Test</Pressable>);
    expect(getByTestId('test-id-pressable')).toBeTruthy();
  });

  // Rendering test with specific props
  it('correctly handles style and disabled props', () => {
    const style = { backgroundColor: 'blue' };
    const { getByTestId } = render(
      <Pressable style={style} disabled testID="test-id-pressable-disabled">
        Test
      </Pressable>
    );
    expect(getByTestId('test-id-pressable-disabled').props.style).toContainEqual(style);
  });

  // Opacity handling test
  it('changes opacity when pressed', () => {
    const { getByTestId } = render(
      <Pressable testOnly_pressed={true} testID="test-id-pressable-opacity">
        Test
      </Pressable>
    );
    const pressable = getByTestId('test-id-pressable-opacity');
    fireEvent.press(pressable);
    expect(pressable.props.style).toContainEqual({ opacity: 0.4 });
  });

  // User interaction test
  it('reacts correctly when pressed', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Pressable onPress={onPressMock} testID="test-id-pressable-pressed">
        Test
      </Pressable>
    );
    const pressable = getByTestId('test-id-pressable-pressed');
    fireEvent.press(pressable);
    expect(onPressMock).toHaveBeenCalled();
  });

  // Children rendering test
  it('correctly renders children', () => {
    const childText = 'Child';
    const { getByText } = render(
      <Pressable>
        <Text>{childText}</Text>
      </Pressable>
    );
    expect(getByText(childText)).toBeTruthy();
  });
});
