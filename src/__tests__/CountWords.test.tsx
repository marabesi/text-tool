import { act, render } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('words', () => {
  it('should count word', () => {
    const { getByText } = render(<App />);

    expect(getByText('Words: 0')).toBeInTheDocument();
  });

  describe('with stop words disabled', () => {
    it.each([
      ['my word', '2']
    ])('should count word %s', (text, count) => {
      const { getByText, getByTestId, getByLabelText } = render(<App />);

      act(() => {
        userEvent.click(getByLabelText('Ignore stop words'));
      });

      act(() => {
        userEvent.type(getByTestId('text-area'), text);
      });

      expect(getByText(`Words: ${count}`)).toBeInTheDocument();
    });

    it.each([
      ['my random text ', 3],
      ['   ', 0],
    ])('should not count word when next one is space', async (text: string, count: number) => {
      const { getByTestId, getByText, getByLabelText } = render(<App/>);

      act(() => {
        userEvent.click(getByLabelText('Ignore stop words'));
      });

      act(() => {
        userEvent.type(getByTestId('text-area'), text);
      });

      expect(getByText(`Words: ${count}`)).toBeInTheDocument();
    });
  });

  it('should reset counters after deleting text', async () => {
    const { getByTestId, getByText } = render(<App/>);

    act(() => {
      userEvent.type(getByTestId('text-area'), 'my random text');
    });

    await userEvent.clear(getByTestId('text-area'));

    expect(getByText('Words: 0')).toBeInTheDocument();
  });
});
