import React from 'react';
import logo from './logo.svg';
import './App.css';
import Formsy, { addValidationRule, withFormsy } from 'formsy-react';

// validations
addValidationRule('myRequired', (values, value, array) => {
  return value && value.trim().length > 0 ? true : false;
});

class MyInputBase extends React.Component {
  constructor(props) {
    super(props);

    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(event) {
    this.props.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
  }

  render() {
    const className =
      'form-group' +
      (this.props.className || ' ') +
      (this.props.showRequired() ? 'required' : this.props.showError() ? 'error' : null);

    const errorMessage = this.props.getErrorMessage();

    return (
      <div className={className}>
        <label htmlFor={this.props.name}>{this.props.title}</label>
        <input
          type={this.props.type || 'text'}
          name={this.props.name}
          onChange={this.changeValue}
          value={this.props.getValue()}
          checked={this.props.type === 'checkbox' && this.props.getValue() ? true : undefined}
        />
        <span className="validation-error">{errorMessage}</span>
      </div>
    );
  }
}

const MyInput = withFormsy(MyInputBase);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false,
    };

    this.submit = this.submit.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
  }

  submit(data) {
    alert(JSON.stringify(data, null, 4));
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Formsy onSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} className="login">
          <MyInput
            name="email"
            title="Email"
            validations="isEmail"
            validationError="This is not a valid email"
            required
          />
          <MyInput
            name="password"
            title="Password"
            type="password"
            validations="myRequired,isNumeric,minLength:4"
            validationErrors={{
              myRequired: 'Password is required',
              minLength: 'Minimum 4 length',
              isNumeric: 'Enter number',
            }}
          />
          <div className="buttons">
            <button type="submit" disabled={!this.state.canSubmit}>
              Submit
            </button>
          </div>
        </Formsy>
      </div>
    );
  }
}

export default App;
