import { act, render, waitFor } from '@testing-library/react';
import App from '../reactjs/App';
import userEvent from '@testing-library/user-event';
import { defaultStopWords } from '../use-cases/types/StopWords';

describe('stop words', () => {
  it('should render stop word checkbox', () => {
    const { getByLabelText } = render(<App/>);

    expect(getByLabelText('Ignore stop words')).toBeInTheDocument();
  });

  it('stop words checkbox should be disabled by default', () => {
    const { getByLabelText } = render(<App/>);

    expect(getByLabelText('Ignore stop words')).toBeChecked();
  });

  it('should render text area for stop words', () => {
    const { getByPlaceholderText } = render(<App/>);

    expect(getByPlaceholderText('Stop words: the, an, I')).toBeInTheDocument();
  });

  it('should have stop words by default', () => {
    const { getByPlaceholderText } = render(<App/>);

    expect(getByPlaceholderText('Stop words: the, an, I')).toHaveValue(defaultStopWords);
  });

  describe('with stop words enabled',() => {
    it.each([
      ['my duplicated text my duplicated text', 'my', '1. duplicated: 2'],
      ['my duplicated text my duplicated text', `my,
duplicated`, '1. text: 2'],
    ])('should ignore stop words (%s, %s, %s)', async (text, stopWords, expected) => {
      const { getByTestId, getByText, getByPlaceholderText } = render(<App/>);

      await userEvent.clear(getByPlaceholderText('Stop words: the, an, I'));
      await userEvent.type(getByTestId('text-area'), text);
      await userEvent.type(getByTestId('stop-words-area'), stopWords);

      await waitFor(() => {
        expect(getByText(expected)).toBeInTheDocument();
      });
    });

    it('should count words whenever stop words does not exists', async () => {
      const { getByTestId, findByText } = render(<App/>);

      await userEvent.type(getByTestId('stop-words-area'), 'my');
      await userEvent.type(getByTestId('text-area'), 'my duplicated text my duplicated text');
      await userEvent.clear(getByTestId('stop-words-area'));

      expect(await findByText('1. my: 2')).toBeInTheDocument();
    });

    it('should not count all words when stop words are disabled', async () => {
      const { getByTestId, findByText, getByLabelText } = render(<App/>);

      await userEvent.click(getByLabelText('Ignore stop words'));
      await userEvent.type(getByTestId('stop-words-area'), 'my');
      await userEvent.type(getByTestId('text-area'), 'my duplicated text my duplicated text');

      expect(await findByText('1. my: 2')).toBeInTheDocument();
    });

    it('should detect stop words on load', async () => {
      const { getByTestId, queryByText } = render(<App/>);
      act(() => {
        userEvent.type(getByTestId('text-area'), 'bread not');
      });

      await waitFor(() => {
        expect(queryByText('2. not: 1')).not.toBeInTheDocument();
      });
    });
  });

  describe('with stop words disabled', function () {
    it('should disable stop words text area', async () => {
      const { getByPlaceholderText, getByLabelText } = render(<App/>);

      act(() => {
        userEvent.click(getByLabelText('Ignore stop words'));
      });

      await waitFor(() => {
        expect(getByPlaceholderText('Stop words: the, an, I')).toBeDisabled();
      });
    });
  });
});
