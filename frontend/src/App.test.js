import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from "react-redux";
import store from "./store.js";

test('renders main container', () => {
  window.scrollTo = jest.fn(); // have to mock this function because it is not supported by jsdom
  render(
    <Provider store={store}>
      <App />
    </Provider>);
  const mainElement = screen.getByTestId("main");
  expect(mainElement).toBeInTheDocument();
});
