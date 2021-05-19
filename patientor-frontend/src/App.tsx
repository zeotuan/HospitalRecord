import React  from "react";
import axios from "axios";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
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
import tokenExtractor from "./utils/tokenExtractor";

const App = () => {
  //const [, dispatch] = useStateValue();
  const {patientAndDiagnosis,user} = useStateValue();
  const [ ,dispatch] = patientAndDiagnosis;
  const [uState,userDispatch] = user;
  const history = useHistory();
  React.useEffect(()=>{
    const token = tokenExtractor();
    if(token){
      userService.setToken(token);
      if(!uState){
        const fetchUserFromToken = async():Promise<void> => {
          try {
           const user = await userService.getUserWithToken();
            if(!user){
              localStorage.removeItem('userToken');
              history.push('/login');
            }else{

               userDispatch(SETUSER(user));  
            }
          } catch (error) {
            console.log(error);
            //history.push('/login');
          }
        };  
        void fetchUserFromToken();
      }
      
    }
    //history.push('/login');
  },[uState]);

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
    localStorage.removeItem('userToken');
    userDispatch(LOGOUT());
    history.push('/login');
  };
  

  return (
    <div className="App">
        <Container>
          { uState?
            <>
              <Header as="h1">Patientor</Header>
              <Menu activeItem={'home'} handleLogOut={handleLogOut} userName={uState.username}/>
            </>:
            <>

            </>
          }
          <Divider hidden />
          <Switch>
          {uState?
            <>
              <Route exact path="/" component={PatientListPage}/>
              <Route exact path="/home" component={PatientListPage}/>
              <Route exact path="/patient/:id" component={PatientPage}/>
              <Redirect path="" to="/" />              
            </>:
            <>
              <Route exact path="/" render={() => <Login />}/>
              <Route exact path="/login" render={() => <Login  />}/>
              <Route exact path="/signUp" render={() => <SignUp />} />
              <Redirect path="" to="/" /> 
            </>
          }
            
          </Switch>
        </Container>
    </div>
  );
};

export default App;
