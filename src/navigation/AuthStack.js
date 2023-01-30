import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import ProfileScreen from '../components/ProfileScreen';
import { routeName } from '../constants/routeName';
import ManagerRole from '../screens/Auth/AdminPanel/ManagerRole';
import WorkerRole from '../screens/Auth/AdminPanel/WorkerRole';
import Login from '../screens/Auth/Login/Login';
import SignUp from '../screens/Auth/Login/SignUp';
import Splash from '../screens/Auth/splash/Splash';
import ComplaintsDetails from '../screens/Home/ComplaintsDetails';
import NotifactionList from '../screens/Home/NotifactionList';
// import BottomTabs from './BottomTabs';
import HomeStack from './HomeStack';
const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={routeName.SPLASH}
    >
      <Stack.Screen name={routeName.SPLASH} component={Splash} />
      <Stack.Screen name={routeName.LOGIN} component={Login} />
      <Stack.Screen name={routeName.SIGN_UP} component={SignUp} />
      <Stack.Screen name={routeName.MANAGER_ROLE} component={ManagerRole} />
      <Stack.Screen name={routeName.WORKER_ROLE} component={WorkerRole} />
      <Stack.Screen name={routeName.PROFILE_SCREEN} component={ProfileScreen} />
      <Stack.Screen name={routeName.COMPLAINTS_DETAILS} component={ComplaintsDetails} />
      <Stack.Screen name={routeName.HOME_STACK} component={HomeStack} />
      <Stack.Screen name={routeName.NOTIFACTION_LIST} component={NotifactionList} />
    </Stack.Navigator>
  )
}
export default AuthStack
