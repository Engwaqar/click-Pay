import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import EditProfile from "../components/Edit Profile";
import ProfileScreen from "../components/ProfileScreen";
import { routeName } from "../constants/routeName";
import AddBuyProduct from "../screens/Home/AddBuyProduct";
import AddTanent from "../screens/Home/AddTanent";
import AdsList from "../screens/Home/AdsList";
import AllBills from "../screens/Home/AllBills";
import AllItemList from "../screens/Home/AllItemList";
import ApplyComplaints from "../screens/Home/ApplyComplaints";
import BillType from "../screens/Home/BillType";
import ChangePassword from "../screens/Home/ChangePassword";
import ComplaintSubmitted from "../screens/Home/Complaint Submitted";
import ComplaintsDetails from "../screens/Home/ComplaintsDetails";
import ComplaintsList from "../screens/Home/ComplaintsList";
import CraeteAds from "../screens/Home/Create Ads";
import DetailsScreen from "../screens/Home/DetailsScreen";
import EventList from "../screens/Home/EventList";
import Home from "../screens/Home/Home";
import InvoiceScreen from "../screens/Home/InvoiceScreen";
import InvoiceSubmit from "../screens/Home/InvoiceSubmit";
import NewsDetails from "../screens/Home/NewsDetails";
import NotifactionList from "../screens/Home/NotifactionList";
import PaymentHistory from "../screens/Home/PaymentHistory";
import PaymentMethod from "../screens/Home/PaymentMethod";
import SecurityList from "../screens/Home/SecurityList";
import SellList from "../screens/Home/SellList";
import SellsDetails from "../screens/Home/Sells Details";
import Shuttletiming from "../screens/Home/Shuttle timing";
import TanentInfo from "../screens/Home/Tanent Info";
const Stack = createNativeStackNavigator();
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={routeName.HOME_SCREEN}
    >
      <Stack.Screen name={routeName.HOME_SCREEN} component={Home} />
      <Stack.Screen name={routeName.BILL_TYPE} component={BillType} />
      <Stack.Screen name={routeName.ALL_BILLS} component={AllBills} />
      <Stack.Screen name={routeName.DETAILS_SCREEN} component={DetailsScreen} />
      <Stack.Screen name={routeName.COMPLAINTS_LIST} component={ComplaintsList} />
      <Stack.Screen name={routeName.ALL_ITEM_LIST} component={AllItemList} />
      <Stack.Screen name={routeName.COMPLAINTS_DETAILS} component={ComplaintsDetails} />
      <Stack.Screen name={routeName.APPLY_COMPLAINTS} component={ApplyComplaints}/>
      <Stack.Screen name={routeName.NOTIFACTION_LIST} component={NotifactionList}/>
      <Stack.Screen name={routeName.PAYMENT_METHOD} component={PaymentMethod}/>
      <Stack.Screen name={routeName.PAYMENT_HISTORY} component={PaymentHistory}/>
      <Stack.Screen name={routeName.EVENTS_LIST} component={EventList}/>
      <Stack.Screen name={routeName.SECURITY_LIST} component={SecurityList}/>
      <Stack.Screen name={routeName.NEWS_DETAILS} component={NewsDetails}/>
      <Stack.Screen name={routeName.ADS_LIST} component={AdsList}/>
      <Stack.Screen name={routeName.PROFILE_SCREEN} component={ProfileScreen}/>
      <Stack.Screen name={routeName.SELL_LIST} component={SellList}/>
      <Stack.Screen name={routeName.SELLS_DETAILS} component={SellsDetails}/>
      <Stack.Screen name={routeName.CREATE_ADS} component={CraeteAds}/>
      <Stack.Screen name={routeName.SHUTTLE_TIMING} component={Shuttletiming}/>
      <Stack.Screen name={routeName.EDIT_PROFILE} component={EditProfile}/>
      <Stack.Screen name={routeName.INVOICE_SCREEN} component={InvoiceScreen}/>
      <Stack.Screen name={routeName.INVOICE_SUBMIT} component={InvoiceSubmit}/>
      <Stack.Screen name={routeName.COMPLAINT_SUBMITTED} component={ComplaintSubmitted}/>
      <Stack.Screen name={routeName.ADD_TANENT} component={AddTanent}/>
      <Stack.Screen name={routeName.TANENT_INFO} component={TanentInfo}/>
      <Stack.Screen name={routeName.ADD_PRODUCT} component={AddBuyProduct}/>
      <Stack.Screen name={routeName.CHANGE_PASSWORD} component={ChangePassword}/>

    </Stack.Navigator>
  );
}

export default HomeStack;
