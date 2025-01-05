import { act, render } from '@testing-library/react';
import App from '../reactjs/App';
import userEvent from '@testing-library/user-event';

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
