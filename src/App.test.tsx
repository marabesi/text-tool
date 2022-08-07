import { act, render, waitFor } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

window.scrollTo = () => {};

describe('text tool', () => {
  it('should render text area', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('text-area')).toBeInTheDocument();
  });

  it('should render result area', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('result')).toBeInTheDocument();
  });

  it.skip('should type the text into the editor', async () => {
    const { container, getByTestId } = render(<App/>);
    const editor = container.querySelector('.my-editor') as HTMLElement;

    act(() => {
      userEvent.type(editor, 'random text');
    });

    await waitFor(() => {
      expect(getByTestId('result')).toHaveTextContent('random text');
    });
  });
});
