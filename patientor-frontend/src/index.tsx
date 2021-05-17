import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import {reducer as pdReducer} from "./improvedState/patientAndDiagnosis/reducer";
import {reducer as userRedcuer} from "./improvedState/user/reducer";
import {StateProvider as TestStateProvider} from "./improvedState/State";
ReactDOM.render(
  <TestStateProvider patientAndDiagnosisReducer={pdReducer} userReducer={userRedcuer}>
      <App />
  </TestStateProvider>,
  document.getElementById('root')
);
