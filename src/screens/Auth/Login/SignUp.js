import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    ImageBackground,
    Image,
    Platform,
    TouchableOpacity,
    Alert,
} from "react-native";
import Icon from '../../../components/Icon'
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
// import Loader from "../../../components/loader";
import Card from "../../../components/Card";
import { routeName } from "../../../constants/routeName";
import { ScrollView } from "react-native-gesture-handler";
import ImagePicker from "react-native-image-crop-picker";
const SignUp = ({ navigation }) => {
    const [errorString, setErrorString] = React.useState("");
    const [fName, setFname] = React.useState("");
    const [lName, setLname] = React.useState("");
    const [phoneNum, setPhoneNum] = React.useState("");
    const [PlotNo, setPlotNo] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [HouseNumber, setHouseNumber] = React.useState("");
    const [Address, setAddress] = useState('');
    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [company, setCompany] = React.useState("");
    const [data, setData] = React.useState([]);
    const [tanent, settanent] = useState('Owner');
    const [image1, setImage1] = useState(null);
    // console.log('first', image)
    const [singleFile1, setSingleFile1] = useState(null);
    const [singleFile2, setSingleFile2] = useState(null);
    const TanentData = [
        {
            Title: 'Owner',

        },
        {
            Title: 'Tanent',

        },
    ];
    const toggel2 = (file) => {
        Alert.alert("Profile Image", "change profile Image", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            {
                text: "Select from gallary",
                onPress: async () => {
                    photofromgallary(file);
                },
            },
            {
                text: "take Pic From Camera",
                onPress: async () => {
                    openCamera(file);
                },
            },
        ]);
    };
    const photofromgallary = (setFile) => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then((image1) => {
            // addPhoto(image);
            setFile(image1);
            console.log(image1, "image working");
        });
    };
    const openCamera = (setFile) => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then((image1) => {
            // addPhoto(image);
            setFile(image1);
            console.log(image1, "image working");
        });
    };
    const loginResponse = useSelector(
        (state) => state.userReducers.loginScreen.data
    );
    const loginNetworkErr = useSelector(
        (state) => state.userReducers.loginScreen.errorMsg
    );

    //Redux Action Called
    const dispatch = useDispatch();
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

    const validation = async () => {

        setErrorString('');
        if (fName === '') {
            setErrorString("* First name is Required *")
        } else if (lName === '') {
            setErrorString("* Last name is Required *")
        }
        else if (userName === '') {
            setErrorString("* User name is Required *")
        }
        else if (email === '') {
            setErrorString("* Email Required *")
        }
        else if (phoneNum === "") {
            setErrorString("* Add your phone number *")
        } else if (phoneNum.length < 11) {
            setErrorString("* Phone number should be 11 digit  *")
        }
        else if (PlotNo === '') {
            setErrorString("* Enter Plot No *")
        }
        else if (HouseNumber == "") {
            setErrorString("* Enter House Number *")

        }
        else if (password === '') {
            setErrorString("* Password Required *")

        } else if (password.length < 8) {
            setErrorString("* Password should be at least 8 characters *")
        }
        else {
            var formData = new FormData();
            formData.append('firstName', fName);
            formData.append('lastName', lName);
            formData.append('userName', userName);
            formData.append('CellPhone', phoneNum);
            formData.append('Email', email);
            formData.append('Password', password);
            formData.append('PlotNo', PlotNo);
            formData.append('HouseNumber', HouseNumber);
            formData.append(
                'File',
                img.path == undefined ? null
                    : {
                        uri: img.path,
                        type: 'image/jpeg',
                        name: 'photo.jpg',
                    },
            );
            console.log(formData, "formData")
            try {
                const res = await Api.post(
                    urls.REGISTER,
                    obj,
                );
                console.log(res, "registration resss")
                setLoading(true)
                if (res && res.success == true) {
                    navigation.navigate(routeName.VERIFICATION_CODE);
                    setLoading(false)
                    setFname('')
                    setLname('')
                    setPassword('')
                    setPhoneNum('')
                    setEmail('')
                    setNIC('')
                    setEmail('')
                    _toast(res.message)
                }
                else {
                    _toast(res.message)
                    setLoading(false);
                }
            } catch (error) {
            }
        }
    };
    function removeEmojis(string) {
        var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
        return string.replace(regex, '');
    }
    return (

        <View style={styles.container}>
            <ScrollView>
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
                            <Image style={styles.logo} source={globalPath.PunjabLogo}

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
                                    Create Account
                                </ResponsiveText>
                                <ResponsiveText
                                    margin={[0, 0, 0, 0]}
                                    fontFamily={Fonts.Bold}
                                    size={3.5}
                                    color={colors.secondary}
                                    textAlign={'center'}
                                >
                                    Create a new account
                                </ResponsiveText>
                                <View >
                                    {/* <Card style={{ marginTop: hp(5), marginHorizontal: wp(5) }}> */}
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                        <View>
                                            <Input
                                                placeholder={"First Name"}
                                                width={wp(43)}
                                                height={hp(6.5)}
                                                padding={[0, 0, 0, 25]}
                                                margin={[10, 0, 5, 0]}
                                                backgroundColor={colors.white}
                                                onChnageText={text => setFname(text.replace(/[^a-z]/gi, ''))}
                                                leftIcon={globalPath.userName}
                                            />
                                        </View>
                                        <View>
                                            <Input
                                                placeholder={"Last Name"}
                                                width={wp(43)}
                                                height={hp(6.5)}
                                                padding={[0, 0, 0, 25]}
                                                margin={[10, 0, 0, 0]}
                                                backgroundColor={colors.white}
                                                onChnageText={text => setLname(text.replace(/[^a-z]/gi, ''))}
                                                leftIcon={globalPath.userName}
                                            />
                                        </View>
                                    </View>
                                    <Input
                                        placeholder={"User Name"}
                                        width={wp(90)}
                                        height={hp(6.5)}
                                        padding={[0, 0, 0, 25]}
                                        margin={[10, 0, 0, 0]}
                                        backgroundColor={colors.white}
                                        onChnageText={(text) => setUserName(text)}
                                        leftIcon={globalPath.userName}
                                    />
                                    <Input
                                        placeholder={"Email"}
                                        width={wp(90)}
                                        height={hp(6.5)}
                                        padding={[0, 0, 0, 25]}
                                        margin={[10, 0, 0, 0]}
                                        autoCapitalize={'none'}
                                        backgroundColor={colors.white}
                                        onChnageText={text => setEmail(text.trim())}
                                        leftIcon={globalPath.Email}
                                    />
                                    <Input
                                        placeholder="000-0000000 (Required)"
                                        maxlength={11}
                                        width={wp(90)}
                                        height={hp(6.5)}
                                        padding={[0, 0, 0, 25]}
                                        margin={[10, 0, 0, 0]}
                                        keyboardType={'numeric'}
                                        backgroundColor={colors.white}
                                        onChnageText={text => setPhoneNum(text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''))}
                                        leftIcon={globalPath.Mobile}
                                    />
                                    <Input
                                        placeholder={"Plot No"}
                                        width={wp(90)}
                                        height={hp(6.5)}
                                        padding={[0, 0, 0, 25]}
                                        margin={[10, 0, 0, 0]}
                                        backgroundColor={colors.white}
                                        onChnageText={(text) => setPlotNo(text)}
                                        leftIcon={globalPath.Email}
                                    />
                                    <Input
                                        placeholder={"House Number"}
                                        width={wp(90)}
                                        height={hp(6.5)}
                                        padding={[0, 0, 0, 25]}
                                        margin={[10, 0, 0, 0]}
                                        backgroundColor={colors.white}
                                        onChnageText={(text) => setHouseNumber(text)}
                                        leftIcon={globalPath.home}
                                    />
                                    <Input
                                        placeholder={"Password"}
                                        value={removeEmojis(password)}
                                        width={wp(90)}
                                        height={hp(6.5)}
                                        padding={[0, 0, 0, 25]}
                                        margin={[10, 0, 0, 0]}
                                        backgroundColor={colors.white}
                                        secureTextEntry
                                        // keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                                        onChnageText={(text) => setPassword(text)}
                                        leftIcon={globalPath.Lock}
                                        iconSize={20}
                                    />
                                    <View>
                                        <ResponsiveText
                                            margin={[10, 0, 0, 15]}
                                            color={colors.black}
                                            weight={'bold'}
                                            size={4}
                                        >Register as a Owner or Tanent
                                        </ResponsiveText>
                                        <View style={{ marginTop: 10 }}>
                                            <DropDown
                                                width={wp(90)}
                                                // margin={[20, 0, 5, 10]}
                                                data={TanentData.map((v) => v.Title)}
                                                onSelect={(item) => {
                                                    console.log("select", item);
                                                    settanent(item);
                                                }}
                                            />
                                        </View>
                                        {tanent == 'Tanent' ?
                                            <View style={{ alignSelf: 'center' }}>
                                                <Card>
                                                    <ResponsiveText
                                                        weight={'bold'}
                                                        size={4}
                                                        color={colors.black}
                                                        textAlign={'center'}
                                                        margin={[10, 0, 0, 0]}
                                                    >CNIC (Front side)</ResponsiveText>
                                                    <ImageBackground >
                                                        <TouchableOpacity
                                                            onPress={() => toggel2(setSingleFile1)}>
                                                            <Card style={{
                                                                borderWidth: 1, borderColor: colors.grey1, height: hp(15), width: wp(70), marginTop: hp(2), alignItems: 'center', justifyContent: 'center'

                                                            }}>
                                                                {singleFile1 == undefined || singleFile1 == null ? (
                                                                    <Icon margin={[0, 0, 0, 0]}
                                                                        size={25}
                                                                        source={globalPath.Camera}
                                                                        tintColor={colors.secondary}

                                                                    >

                                                                    </Icon>
                                                                ) : (
                                                                    <Image
                                                                        source={{ uri: singleFile1.path }}
                                                                        style={{
                                                                            borderRadius: 10,
                                                                            height: wp(27),
                                                                            width: wp(68),
                                                                            //  resizeMode: 'contain',
                                                                            backgroundColor: colors.white,
                                                                            alignSelf: 'center',
                                                                            // marginTop: 30,
                                                                        }}
                                                                    />
                                                                )}
                                                            </Card>
                                                        </TouchableOpacity>
                                                    </ImageBackground>
                                                </Card>
                                                <Card>
                                                    <ResponsiveText
                                                        weight={'bold'}
                                                        size={4}
                                                        color={colors.black}
                                                        textAlign={'center'}
                                                    >CNIC (Back side)</ResponsiveText>
                                                    <TouchableOpacity
                                                        onPress={() => toggel2(setSingleFile2)}>
                                                        <Card style={{
                                                            borderWidth: 1, borderColor: colors.grey1, height: hp(15), width: wp(70), marginTop: hp(2), alignItems: 'center', justifyContent: 'center'

                                                        }}>
                                                            {singleFile2 == undefined || singleFile2 == null ? (

                                                                <Icon margin={[0, 0, 0, 0]}
                                                                    size={25}
                                                                    source={globalPath.Camera}
                                                                    tintColor={colors.secondary}

                                                                >
                                                                </Icon>
                                                            ) : (
                                                                <Image
                                                                    source={{ uri: singleFile2.path }}
                                                                    style={{
                                                                        borderRadius: 10,
                                                                        height: wp(27),
                                                                        width: wp(68),
                                                                        resizeMode: 'contain',
                                                                        backgroundColor: colors.white,
                                                                        alignSelf: 'center',
                                                                        // marginTop: 25,
                                                                    }}
                                                                />
                                                            )}
                                                        </Card>
                                                    </TouchableOpacity>
                                                </Card>
                                            </View>
                                            : null}
                                    </View>
                                    {/* </Card> */}
                                    <ResponsiveText color={colors.red} margin={[20, 0, 0, 10]}>{errorString}</ResponsiveText>
                                    <RnButton
                                        backgroundColor={colors.primary}
                                        margin={[5, 10, 0, 10]}
                                        title={"Sign Up"}
                                        // onPress={() => Validation()}
                                        onPress={() => navigation.replace(routeName.HOME_STACK)}
                                    />
                                    <ResponsiveText
                                        margin={[10, 0, 20, 0]}
                                        fontFamily={Fonts.Bold}
                                        size={4}
                                        color={colors.black}
                                        textAlign={'center'}
                                    >
                                        I have account?{' '}
                                        <ResponsiveText
                                            weight={'bold'}
                                            color={colors.secondary}
                                            onPress={() => navigation.navigate(routeName.LOGIN)}>
                                            Sign In
                                        </ResponsiveText>
                                    </ResponsiveText>
                                </View>
                            </View>

                        </View>

                    </View>
                    {/* {loading ?
          <Loader />
          :
          undefined
        } */}
                </ImageBackground>
            </ScrollView>
        </View>
    );
};
export default SignUp;
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
