import React,{useState} from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Divider, Header, Container} from "semantic-ui-react";
import { apiBaseUrl } from "./constants";
import { useStateValue ,setPatientList, setDiagnosisList} from "./state";
import patientService from "./services/patient";
import diagnosisService from "./services/diagnosis";
import PatientListPage from "./PatientListPage";
import PatientPage from "./PatientPage";
import Login from "./components/authenticationForm/Login";
import SignUp from "./components/authenticationForm/SignUp";
import SignUpDone from "./components/authenticationForm/SignUpDone";
import Menu from "./components/Menu";

const App = () => {
  const [, dispatch] = useStateValue();
  const [signIn,setSignIn] = useState(true);
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientAndDiagnosisList = async () => {
      try {
        const patientListFromApi = await patientService.getAll();
        dispatch(setPatientList(patientListFromApi));

        const diagnosisListFromApi = await diagnosisService.getAll();
        dispatch(setDiagnosisList(diagnosisListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientAndDiagnosisList();
  }, [dispatch]);

  const handleLogOut = () => {
    setSignIn(false);
  };

  return (
    <div className="App">
      <Router>
        <Container>
          { signIn?
            <>
              <Header as="h1">Patientor</Header>
              <Menu activeItem={'home'} handleLogOut={handleLogOut}/>
            </>:
            <>

            </>
          }
          <Divider hidden />
          <Switch>
          { signIn?
            <>
              <Route exact path="/home" component={PatientListPage}/>
              <Route exact path="/patient/:id" component={PatientPage}/>
            </>:
            <>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signUp" component={SignUp} />
              <Route exact path="/done" component={SignUpDone} />
            </>
          }
            
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
