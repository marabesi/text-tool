import { act, render } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('text tool', () => {
  it('should render text area', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('text-area')).toBeInTheDocument();
  });

  describe('characters', () => {
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

  describe('words', () => {
    it('should count word', () => {
      const { getByText } = render(<App />);

      expect(getByText('Words: 0')).toBeInTheDocument();
    });

    it.each([
      ['my word', '2']
    ])('should count word %s', (text, count) => {
      const { getByText, getByTestId } = render(<App />);

      act(() => {
        userEvent.type(getByTestId('text-area'), text);
      });

      expect(getByText(`Words: ${count}`)).toBeInTheDocument();
    });

    it('should reset counters after deleting text', async () => {
      const { getByTestId, getByText } = render(<App/>);

      act(() => {
        userEvent.type(getByTestId('text-area'), 'my random text');
      });

      await userEvent.clear(getByTestId('text-area'));

      expect(getByText('Words: 0')).toBeInTheDocument();
    });

    it.each([
      ['my random text ', 3],
      ['   ', 0],
    ])('should not count word when next one is space', async (text: string, count: number) => {
      const { getByTestId, getByText } = render(<App/>);

      act(() => {
        userEvent.type(getByTestId('text-area'), text);
      });

      expect(getByText(`Words: ${count}`)).toBeInTheDocument();
    });
  });

  describe('most frequent word', () => {
    it('should render most frequent words title', () => {
      const { getByText } = render(<App/>);
      expect(getByText('Most frequent words')).toBeInTheDocument();
    });

    it.each([
      ['this text contains the text twice', 'text', '2'],
    ])('should render most frequent word in a text %s', (text, first, count) => {
      const { getByTestId, getByText } = render(<App/>);

      act(() => {
        userEvent.type(getByTestId('text-area'), text);
      });

      expect(getByText(`1. ${first}: ${count}`)).toBeInTheDocument();
    });
  });
});
