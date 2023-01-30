import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Platform,
  TouchableOpacity
} from "react-native";
import { hp, wp } from "../../../helpers/Responsiveness";
import { colors } from "../../../constants/colorsPallet";
import { loginUser } from "../../../redux/actions/user.actions";
import { useDispatch, useSelector } from "react-redux";
import ResponsiveText from "../../../components/RnText";
import DropDown from "../../../components/DropDown";
import Input from "../../../components/Input";
import { globalPath } from "../../../constants/globalPath";
import RnButton from "../../../components/RnButton";
import Api from "../../../redux/lib/api";
import urls from "../../../redux/lib/urls";
import Fonts from "../../../helpers/Fonts";
 import Loader from "../../../components/loader";
import Card from "../../../components/Card";
import { routeName } from "../../../constants/routeName";
import AsyncStorage from "@react-native-community/async-storage";

const Login = ({ navigation }) => {
  const loading = useSelector(
    (state) => state.userReducers.loginScreen.refreshing
  );
  const loginResponse = useSelector(
    (state) => state.userReducers.loginScreen.data
  );
  const loginNetworkErr = useSelector(
    (state) => state.userReducers.loginScreen.errorMsg
  );
  const [errorString, setErrorString] = React.useState("");
  const [contactNumber, setcontactNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [data, setData] = React.useState([]);
  //Redux Action Called
  const dispatch = useDispatch();
  const userLogin = async() => {
  var fcmToken=await AsyncStorage.getItem('@fcmToken')
console.log('fcmTokenbbbbb', fcmToken)
    dispatch(
      loginUser({
        params: {
          contactNumber: contactNumber,
          password: password,
          fcmToken:fcmToken,
        },
        navigation: navigation,
      })
    );
  };

  useEffect(() => {
    // getCompanies();
  }, []);
  useEffect(() => {
    loginResponse ? setErrorString(loginResponse.message) : null;
    loginNetworkErr ? setErrorString(loginNetworkErr.message) : null;
  }, [loginResponse, loginNetworkErr]);

  // console.log(loginResponse, "LOgin screen error");
  // console.log(loginNetworkErr, "LOgin network error");

  const getCompanies = async () => {
    try {
      const res = await Api.get(urls.GET_ALL_COMPANIES);
      console.log("get compsnies", res);
      if (res && res.success == true) {
        setData(res.data)
      } else {
      }
    } catch (error) { }
  };

  const Validation = (item) => {
    setErrorString("Please Enter Mobile Number and Password")
    //  navigation.replace(routeName.BOTTOM_TABS);

    // setErrorString("Please Enter Username and Password to proceed");
    setErrorString("");
    if (contactNumber === "" && password === "") {
      setErrorString("All fields are required");
    } else if (contactNumber === "" || contactNumber === null) {
      setErrorString("Mobile Number is missing");
    } else if (password === "") {
      setErrorString("Password is missing");
    }
    //  else if (company === "") {
    //   setErrorString("Please select school");
    // } 
    else {
      // console.log("ErrorMessage:yhyuu ");
      userLogin();
      setErrorString("");
    }
  };
  function removeEmojis(string) {
    var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    return string.replace(regex, '');
  }
  return (
    <View style={styles.container}>

      <ImageBackground
        // source={globalPath.background}
        resizeMode="cover"
        style={styles.image}
      >

        <View style={{ marginHorizontal: wp(0) }}>
          <View style={styles.screeninfo}>
            {/* <Image style={styles.logo} source={globalPath.loginlogo} /> */}
            {/* <Image style={styles.logo} source={globalPath.citilogo1} */}
            {/* <Image style={styles.logo} source={globalPath.AskarSignLogo} */}
            {/* <Image style={styles.logo} source={globalPath.SuiGasSignin} */}
            {/* <Image style={styles.logo} source={globalPath.ParkViewSign} */}
            {/* <Image style={styles.logo} source={globalPath.StateLifeSign} */}
            {/* <Image style={styles.logo} source={globalPath.PunjabLogo} */}
            {/* <Image style={styles.logo} source={globalPath.NLClogosign} */}
            <Image style={styles.logo} source={globalPath.ClickHlogo}

            />

          </View>
          <View style={{ backgroundColor: colors.blue1, flex: 1 }}>
            <View style={styles.footer}>
              <ResponsiveText
                margin={[0, 0, 0, 0]}
                fontFamily={Fonts.Bold}
                size={8}
                textAlign={'center'}
                color={colors.black}
              >
                Welcome
              </ResponsiveText>
              <ResponsiveText
                margin={[0, 0, 0, 0]}
                fontFamily={Fonts.Bold}
                size={3.5}
                color={colors.secondary}
                textAlign={'center'}
              >
                Sign to Continue
              </ResponsiveText>
              <View >
                {/* <Card style={{ marginTop: hp(5), marginHorizontal: wp(5) }}> */}
                <Input
                  placeholder={"Mobile Number"}
                  width={wp(90)}
                  height={hp(6.5)}
                  padding={[0, 0, 0, 25]}
                  margin={[30, 0, 5, 0]}
                  backgroundColor={colors.white}
                  onChnageText={(text) => setcontactNumber(text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''))}
                  leftIcon={globalPath.Mobile}
                  keyboardType={'numeric'}
                  maxlength={11}
                />

                <Input
                  placeholder={"Password"}
                  value={removeEmojis(password)}
                  width={wp(90)}
                  height={hp(6.5)}
                  padding={[0, 0, 0, 25]}
                  margin={[20, 0, 5, 0]}
                  backgroundColor={colors.white}
                  secureTextEntry
                  // keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                  onChnageText={(text) => setPassword(text)}
                  leftIcon={globalPath.Lock}
                  iconSize={20}
                />
                <ResponsiveText
                  margin={[10, 0, 20, 0]}
                  fontFamily={Fonts.Bold}
                  size={4}
                  color={colors.black}
                  textAlign={'center'}
                >
                  Forgot Password?
                </ResponsiveText>
                {/* </Card> */}
                <ResponsiveText color={colors.red} margin={[20, 0, 0, 10]}>{errorString}</ResponsiveText>
                <RnButton
                  backgroundColor={colors.secondary}
                  margin={[5, 10, 0, 10]}
                  title={"Sign in"}
                  onPress={() => Validation()}
                // onPress={() => navigation.replace(routeName.HOME_STACK)}
                />

              </View>
              {/* <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <ResponsiveText
                  margin={[40, 0, 20, 0]}
                  fontFamily={Fonts.Bold}
                  size={4}
                  color={colors.black}
                  textAlign={'center'}
                >
                  Don't have account?
                </ResponsiveText>
                <TouchableOpacity
                  // onPress={() => navigation.replace(routeName.SIGN_UP)}
                >
                  <ResponsiveText
                    margin={[40, 0, 20, 0]}
                    fontFamily={Fonts.Bold}
                    size={4}
                    color={colors.secondary}
                    textAlign={'center'}
                  >
                    create a new account
                  </ResponsiveText>
                </TouchableOpacity>
              </View> */}
            </View>

          </View>

        </View>
        {loading ?
          <Loader />
          :
          undefined
        }
      </ImageBackground>

    </View>
  );
};
export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGrey,
  },
  footer: {
    flex: 1,
    backgroundColor: colors.lightGrey,
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    // alignItems: 'center'
    // marginTop:hp(0.5)
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screeninfo: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGrey,
    // borderBottomLeftRadius: 35,
  },
  logo: {
    height: hp(30),
    width: wp(50),
    resizeMode: "contain",
    // marginBottom: 20,
    alignItems: "center",
  },
});
