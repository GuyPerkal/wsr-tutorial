import React from 'react';
import { render } from '@testing-library/react';
import AppDriver from './App.driver';
import App from './App';

describe('App', () => {
  it('should  keep submit button disabled until all required fields are entered', async () => {
    const { baseElement } = render(<App />);
    const appDriver = new AppDriver(baseElement);

    expect(await appDriver.submitButtonDriver.isButtonDisabled()).toBe(true);

    await appDriver.enterRequiredFields();

    expect(await appDriver.submitButtonDriver.isButtonDisabled()).toBe(false);
  });

  it('should show the submitted info section on submit', async () => {
    const { baseElement, queryByText } = render(<App />);
    expect(queryByText('Submitted info')).toBeFalsy();

    const appDriver = new AppDriver(baseElement);
    await appDriver.enterRequiredFields();
    await appDriver.submitButtonDriver.click();

    expect(queryByText('Submitted info')).toBeTruthy();
  });

  it('should clear the form on clear click', async () => {
    const { baseElement } = render(<App />);
    const appDriver = new AppDriver(baseElement);
    await appDriver.enterRequiredFields();
    await appDriver.enterFunFact();
    await appDriver.submit();
    await appDriver.clear();

    expect(await appDriver.nameInputDriver.getText()).toBe('');
    expect(await appDriver.colorDropdownDriver.inputDriver.getText()).toBe('');
    expect(await appDriver.termsCheckboxDriver.isChecked()).toBe(false);
    expect(await appDriver.funFactInputAreaDriver.getValue()).toBe('');
    expect(await appDriver.submitButtonDriver.isButtonDisabled()).toBe(true);
  });
});
