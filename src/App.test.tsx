import { act, render } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('text tool', () => {
  it('should render text area', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('text-area')).toBeInTheDocument();
  });

  it('should render zero chars when text area has no text', () => {
    const { getByText } = render(<App />);
    expect(getByText('Chars: 0')).toBeInTheDocument();
  });

  it.each([
    ['mytext', '6'],
    ['text', '4'],
  ])('should display the number os characters a word has (%s)', (text: string, chars: string) => {
    const { getByTestId, getByText } = render(<App />);

    act(() => {
      userEvent.type(getByTestId('text-area'), text);
    });

    expect(getByText(`Chars: ${chars}`)).toBeInTheDocument();
  });
});
