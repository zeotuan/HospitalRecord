import React  from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Divider, Header, Container} from "semantic-ui-react";
import { apiBaseUrl } from "./constants";
import {useStateValue} from './improvedState/State';
import {setPatientList , setDiagnosisList} from './improvedState/patientAndDiagnosis/actionCreator';
import {SETUSER, LOGOUT} from './improvedState/user/actionCreator';
import patientService from "./services/patient";
import diagnosisService from "./services/diagnosis";
import PatientListPage from "./PatientListPage";
import PatientPage from "./PatientPage";
import Login from "./components/authenticationForm/Login";
import SignUp from "./components/authenticationForm/SignUp";
import Menu from "./components/Menu";
import userService from "./services/user";

const App = () => {
  //const [, dispatch] = useStateValue();
  const {patientAndDiagnosis,user} = useStateValue();
  const [ ,dispatch] = patientAndDiagnosis;
  const [uState,userDispatch] = user;
  React.useEffect(()=>{
    const token = sessionStorage.getItem('userToken');
    if(token){
      userService.setToken(token);
      if(!uState.user){
        const fetchUserFromToken = async():Promise<void> => {
          try {
           const user = await userService.getUser();
            if(!user){
              sessionStorage.removeItem('userToken');
            }else{
               userDispatch(SETUSER(user));  
            }
          } catch (error) {
            console.log(error);
          }
        };  
        void fetchUserFromToken();
      }
    }
  },[uState.user]);

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
    sessionStorage.removeItem('userToken');
    userDispatch(LOGOUT());
  };
  

  return (
    <div className="App">
      <Router>
        <Container>
          { uState.user?
            <>
              <Header as="h1">Patientor</Header>
              <Menu activeItem={'home'} handleLogOut={handleLogOut}/>
            </>:
            <>

            </>
          }
          <Divider hidden />
          <Switch>
          {uState.user?
            <>
              <Route exact path="/" component={PatientListPage}/>
              <Route exact path="/home" component={PatientListPage}/>
              <Route exact path="/patient/:id" component={PatientPage}/>
            </>:
            <>
              <Route exact path="/" render={() => <Login />}/>
              <Route exact path="/login" render={() => <Login  />}/>
              <Route exact path="/signUp" render={() => <SignUp />} />
            </>
          }
            
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
