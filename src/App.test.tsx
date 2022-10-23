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

    expect(getByText('Chars: 0')).toBeInTheDocument();
    expect(getByText('Words: 0')).toBeInTheDocument();
  });
});
