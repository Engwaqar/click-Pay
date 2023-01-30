import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  RefreshControl,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import { colors } from "../../constants/colorsPallet";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import { globalPath } from "../../constants/globalPath";
import { hp, wp } from "../../helpers/Responsiveness";
import ResponsiveText from "../../components/RnText";
import { routeName } from "../../constants/routeName";
import { _toast } from "../../constants/Index";
import ChatHeader from "../../components/ChatHeader";
import Swiper from "../../components/Swiper";
import Loader from "../../components/loader";
import { DashBoardCard } from "../../components/DashBoardCard";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, getSecurityAlert } from "../../redux/actions/user.actions";
import SkeletonComponent from "../../components/SkeletonComponent";
import NetworkModel from "../../components/NetworkModel";
const Home = ({ navigation }) => {
  const ProfileResponse = useSelector((state) => state.userReducers.profileData.data);
  const ProfileNetworkErr = useSelector((state) => state.userReducers.profileData.error);
  const UserProfile = useSelector(state => state.userReducers.profileData.data);
  const refreshing = useSelector(state => state.userReducers.profileData.data);
  const GetSecurityList = useSelector(state => state.userReducers.securityAlert.data,);
  const dispatch = useDispatch();
  console.log('UserProfile', UserProfile)
  const [HeaderSliderdata, setHeaderSliderdatader] = useState([]);
  const [loading, setLoading] = useState([]);
  const [errorString, setErrorString] = React.useState("");
  const [refreshingg, setRefreshingg] = React.useState(false);
  const result = GetSecurityList.filter(item => item.isRead == false)
  console.log('GetSecurityList', result.length)
  useEffect(() => {
    GetHeader()
    dispatch(getProfile());
    dispatch(getSecurityAlert());

  }, [])
  useEffect(() => {
    // ProfileResponse ? setErrorString(ProfileResponse.message) : null;
    ProfileNetworkErr ? setErrorString(ProfileNetworkErr.message) : null;
  }, [ProfileResponse, ProfileNetworkErr]);

  // console.log(ProfileResponse, "Login screen error");
   console.log(ProfileNetworkErr, "ProfileNetworkEr error");

  const GetHeader = async (index, item) => {
    try {
      setLoading(true);
      const res = await Api.get(urls.GET_HEADER_SLIDER);
      console.log('ressss', res);
      if (res && res.success == true) {
        setLoading(false);
        setHeaderSliderdatader(res.data[0].objImagesList)
        console.log('setHeader', res.data)
      } else {
      }
    } catch (error) {
      setErrorString(error);
     }
  };
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshingg(true);
    wait(2000).then(() => setRefreshingg(false));
    GetHeader()
    dispatch(getProfile());
    dispatch(getSecurityAlert());
  }, []);
  // const arr = [
  //   require('../../assets/icons/Park1.jpg'),
  //   require('../../assets/icons/Park2.jpg'),
  //   require('../../assets/icons/Park3.jpg'),
  //   require('../../assets/icons/Park4.jpg'),
  // ]
  // const CitiHousing = [
  //   require('../../assets/icons/citiBanner1.png'),
  //   require('../../assets/icons/citiBanner2.png'),
  //   require('../../assets/icons/citiBanner3.png'),
  //   require('../../assets/icons/citiBanner4.png'),
  //   require('../../assets/icons/citiBanner5.png'),

  // ]
  // const AskariHousing = [
  //   require('../../assets/icons/banner-A-1 (1).png'),
  //   require('../../assets/icons/banner-A-2 (1).png'),
  //   require('../../assets/icons/banner-A-3 (1).png'),
  //   require('../../assets/icons/banner-A-4 (1).png'),
  //   require('../../assets/icons/banner-A-5 (1).png'),

  // ]
  // const SuiGasHousing = [
  //   require('../../assets/icons/banner-sg-1.png'),
  //   require('../../assets/icons/banner-sg-2.png'),
  //   require('../../assets/icons/banner-sg-3.png'),
  //   require('../../assets/icons/banner-sg-4.png'),
  //   require('../../assets/icons/banner-sg-5.png'),
  // ]
  // const PunjabHousing = [
  //   require('../../assets/icons/pchs-banner-1.png'),
  //   require('../../assets/icons/pchs-banner-2.png'),
  //   require('../../assets/icons/pchs-banner-3.png'),
  // ]
  // const ParkView= [
  //   require('../../assets/icons/pvc-banner-1.png'),
  //   require('../../assets/icons/pvc-banner-2.png'),
  //   require('../../assets/icons/pvc-banner-3.png'),
  //   require('../../assets/icons/pvc-banner-4.png'),

  // ]
  // const StateLife= [
  //   require('../../assets/icons/statelife-banner-1.png'),
  //   require('../../assets/icons/statelife-banner-2.png'),
  //   require('../../assets/icons/statelife-banner-3.png'),
  //   require('../../assets/icons/statelife-banner-4.png'),
  //   require('../../assets/icons/statelife-banner-5.png'),

  // ]
  // const dispatch = useDispatch();
  // const data = useSelector((state) => state.userReducers.presentTeam.data);
  const Username = (UserProfile.username || '').toUpperCase();
  // console.log('first', Username)
  return (

    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* {loading == true || refreshing == true ?
        // <Loader />
        <View style={{ position: 'absolute', flex: 1, zIndex: 1, backgroundColor: colors.white, height: hp(100) }}>
          <SkeletonComponent />
        </View>
        :
        null
      } */}
      <NetworkModel active={true} error={errorString} reload={onRefresh}
       />
      <ChatHeader
        // source={globalPath.HeaderLogo}
        // source={globalPath.citiHeaderlogo}
        // source={globalPath.AskariHeaderlogo}
        // source={globalPath.SuiGasSplash}
        // source={globalPath.PunjabLogo}
        // source={globalPath.ParkViewDash}
        // source={globalPath.StateLifeDash}
        // source={globalPath.NLClogodashboard}
        source={globalPath.ClickHlogo}

        notifaction={globalPath.notifaction}
        value={'1'}
        user={globalPath.user}
        navigation={navigation}
      />
      <ScrollView 
       refreshControl={
        <RefreshControl refreshing={refreshingg} onRefresh={onRefresh} />
      }
      >

        <View style={{
          backgroundColor: colors.secondary,
          height: hp(7),
        }}>
          <ResponsiveText
            textAlign={'center'}
            justifyContent={'center'}
            color={colors.white}
            margin={[14, 0, 0, 0]}
            // weight={'bold'}
            size={4.7}
          >Welcome,{Username}!</ResponsiveText>
        </View>

        <View style={styles.advertisementBanner}>
          <Swiper data={HeaderSliderdata} />

        </View>

        <View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <DashBoardCard
              source={globalPath.Bills}
              Title={'Bills'}
              subTitle={'Electricity,Gas,Water,Other'}
              ITEM_LIST
              onPress={() => navigation.navigate(routeName.ALL_BILLS)}
            // onPress={() => navigation.navigate(routeName.BILL_TYPE)}
            />
            <DashBoardCard
              source={globalPath.Payment}
              Title={'Payment History'}
              subTitle={'Electricity,Gas,Water,Other'}
              onPress={() => navigation.navigate(routeName.PAYMENT_HISTORY)}
            />
          </View>
          <View style={{ flexDirection: 'row', }}>
            <DashBoardCard
              source={globalPath.Complaint}
              Title={'Complaint'}
              subTitle={'Electricity,Gas,Water,Other'}
              onPress={() => navigation.navigate(routeName.COMPLAINTS_LIST)}
            />
            <DashBoardCard
              source={globalPath.SecurityAlert}
              Title={'Security Alert'}
              subTitle={'Electricity,Gas,Water,Other'}
              value={result.length ? result.length : '0'}
              onPress={() => navigation.navigate(routeName.SECURITY_LIST)}
            />
          </View>
          <View style={{ flexDirection: 'row', }}>
            <DashBoardCard
              source={globalPath.Events}
              Title={'News & Events'}
              subTitle={'Celebrate all Events with us'}
              onPress={() => navigation.navigate(routeName.EVENTS_LIST)}
            />
            <DashBoardCard
              source={globalPath.busshuttle}
              Title={'Shuttle Service'}
              subTitle={'We provide shuttle service'}
              onPress={() => navigation.navigate(routeName.SHUTTLE_TIMING)}
            />
          </View>
          <View style={{ flexDirection: 'row', }}>
            <DashBoardCard
              source={globalPath.Ads}
              Title={'Ads'}
              subTitle={'Ads promote your brand with us'}
              onPress={() => navigation.navigate(routeName.ADS_LIST)}

            />
            <DashBoardCard
              onPress={() => navigation.navigate(routeName.SELL_LIST)}
              source={globalPath.SellandBuy}
              Title={'Buy & Sell'}
              subTitle={'Buy And Sells your products with us'}
            />
          </View>

        </View>
        <View style={{ height: hp(10) }}>

        </View>
      </ScrollView>
    </SafeAreaView>

  );
};
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightWhite,
  },
  btn: {
    height: wp(10),
    width: wp(30),
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  advertisementBanner: {
    height: 200,
  },
});