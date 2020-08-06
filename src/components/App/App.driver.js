import {
  InputTestkit,
  ButtonTestkit,
  DropdownTestkit,
  CheckboxTestkit,
  InputAreaTestkit,
} from 'wix-style-react/dist/testkit';

export default class AppDriver {
  wrapper;
  submitButtonDriver;
  nameInputDriver;
  colorDropdownDriver;
  termsCheckboxDriver;
  funFactInputAreaDriver;

  constructor(wrapper) {
    this.wrapper = wrapper;
    this.submitButtonDriver = ButtonTestkit({
      wrapper,
      dataHook: 'submit-button',
    });
    this.nameInputDriver = InputTestkit({
      wrapper,
      dataHook: 'name-input',
    });
    this.colorDropdownDriver = DropdownTestkit({
      wrapper,
      dataHook: 'color-dropdown',
    });
    this.termsCheckboxDriver = CheckboxTestkit({
      wrapper,
      dataHook: 'terms-checkbox',
    });
    this.funFactInputAreaDriver = InputAreaTestkit({
      wrapper,
      dataHook: 'fun-fact-input-area',
    });
  }

  isSubmitDisabled() {
    return this.submitButtonDriver.isButtonDisabled();
  }

  async enterRequiredFields() {
    await this.nameInputDriver.enterText('Person');
    await this.colorDropdownDriver.dropdownLayoutDriver.clickAtOptionWithValue(
      'Blue',
    );
    await this.termsCheckboxDriver.click();
  }

  enterFunFact() {
    return this.funFactInputAreaDriver.enterText('Fun fact');
  }

  async clear() {
    await this.nameInputDriver.clearText();
    await this.colorDropdownDriver.inputDriver.clearText();

    if (await this.termsCheckboxDriver.isChecked()) {
      await this.termsCheckboxDriver.click();
    }

    this.funFactInputAreaDriver.enterText('');
  }

  submit() {
    return this.submitButtonDriver.click();
  }
}
