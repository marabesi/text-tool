import { act, render } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('stop words', () => {
  it('should render text area for stop words', () => {
    const { getByPlaceholderText } = render(<App/>);

    expect(getByPlaceholderText('Stop words: the, an, I')).toBeInTheDocument();
  });

  it.each([
    // ['my duplicated text my duplicated text', 'my', '1. duplicated: 2'],
    ['my duplicated text my duplicated text', `my,
duplicated`, '1. text: 2'],
  ])('should ignore stop words', (text, stopWords, expected) => {
    const { getByTestId, getByText } = render(<App/>);

    act(() => {
      userEvent.type(getByTestId('stop-words-area'), stopWords);
    });

    act(() => {
      userEvent.type(getByTestId('text-area'), text);
    });

    expect(getByText(expected)).toBeInTheDocument();
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
