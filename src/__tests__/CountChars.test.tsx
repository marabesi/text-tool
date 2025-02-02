import { render } from '@testing-library/react';
import App from '../reactjs/App';
import userEvent from '@testing-library/user-event';

describe('characters', () => {
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
  ])('should display the number os characters a word has (%s)', async (text: string, chars: string) => {
    const { getByTestId, findByText } = render(<App />);

    await userEvent.type(getByTestId('text-area'), text);

    expect(await findByText(`Chars: ${chars}`)).toBeInTheDocument();
  });
});

