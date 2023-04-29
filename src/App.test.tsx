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

    it('should clean up frequent stats once textarea is erased', () => {
      const { getByTestId, getByText, queryByText } = render(<App/>);

      act(() => {
        userEvent.type(getByTestId('text-area'), 'my duplicated text my duplicated text');
      });

      expect(getByText('1. my: 2')).toBeInTheDocument();

      act(() => {
        userEvent.clear(getByTestId('text-area'));
      });

      expect(queryByText('1. my: 2')).not.toBeInTheDocument();
    });
  });

  describe('stop words', () => {
    it('should render text area for stop words', () => {
      const { getByPlaceholderText } = render(<App/>);

      expect(getByPlaceholderText('Stop words')).toBeInTheDocument();
    });

    it('should ignore stop words', () => {
      const { getByTestId, getByText } = render(<App/>);

      act(() => {
        userEvent.type(getByTestId('stop-words-area'), 'my');
      });

      act(() => {
        userEvent.type(getByTestId('text-area'), 'my duplicated text my duplicated text');
      });

      expect(getByText('1. duplicated: 2')).toBeInTheDocument();
    });

    it('should count words whenever stop words does not exists', () => {
      const { getByTestId, getByText } = render(<App/>);

      act(() => {
        userEvent.type(getByTestId('stop-words-area'), 'my');
      });

      act(() => {
        userEvent.type(getByTestId('text-area'), 'my duplicated text my duplicated text');
      });

      act(() => {
        userEvent.clear(getByTestId('stop-words-area'));
      });

      expect(getByText('1. my: 2')).toBeInTheDocument();
    });
  });
});
