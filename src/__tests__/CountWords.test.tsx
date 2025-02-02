import { render } from '@testing-library/react';
import App from '../reactjs/App';
import userEvent from '@testing-library/user-event';

describe('words', () => {
  it('should count word', async () => {
    const { findByText } = render(<App />);

    expect(await findByText('Words: 0')).toBeInTheDocument();
  });

  describe('with stop words disabled', () => {
    it.each([
      ['my word', '2']
    ])('should count word %s', async (text, count) => {
      const { findByText, getByTestId, getByLabelText } = render(<App />);
      await userEvent.click(getByLabelText('Ignore stop words'));
      await userEvent.type(getByTestId('text-area'), text);

      expect(await findByText(`Words: ${count}`)).toBeInTheDocument();
    });

    it.each([
      ['my random text ', 3],
      ['   ', 0],
    ])('should not count word when next one is space', async (text: string, count: number) => {
      const { getByTestId, findByText, getByLabelText } = render(<App/>);

      await userEvent.click(getByLabelText('Ignore stop words'));
      await userEvent.type(getByTestId('text-area'), text);

      expect(await findByText(`Words: ${count}`)).toBeInTheDocument();
    });
  });

  it('should reset counters after deleting text', async () => {
    const { getByTestId, findByText } = render(<App/>);

    await userEvent.type(getByTestId('text-area'), 'my random text');

    await userEvent.clear(getByTestId('text-area'));

    expect(await findByText('Words: 0')).toBeInTheDocument();
  });
});
