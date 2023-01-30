import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Alert,
    TouchableOpacity,
    ScrollView,
    Image,
    ImageBackground
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors } from '../../constants/colorsPallet'
import ChatHeader from '../../components/ChatHeader'
import ResponsiveText from '../../components/RnText'
// import Card from '../../components/Card'
import Icon from '../../components/Icon'
import { globalPath } from '../../constants/globalPath'
import Fonts from '../../helpers/Fonts.js'
import { hp, wp } from '../../helpers/Responsiveness'
import Input from "../../components/Input";
import { _toast } from '../../constants/Index'
import RnButton from "../../components/RnButton";
import { TextProfile } from '../components/TextProfile'
import AsyncStorage from "@react-native-community/async-storage";
import { StackActions } from "@react-navigation/native";
import { routeName } from '../constants/routeName'
import Card from '../../components/Card'
import ImagePicker from "react-native-image-crop-picker";
import DropDown from '../../components/DropDown'
import urls from '../../redux/lib/urls'
import Api from '../../redux/lib/api'
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from '../../redux/actions/user.actions'
import Loader from "../../components/loader";


const AddTanent = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const floordata = route.params.item;
    const user = route.params.GetUserData
    const tanentData = route.params?.tanentData
    console.log('tanentData', tanentData)
    console.log('user', user)
    const [FloorNumber, setFloorNumber] = useState('');
    const [Tenant, setTenant] = useState('');
    const [Mobile, setMobile] = useState('');
    const [Pic, setPic] = useState(null);
    const [singleFile1, setSingleFile1] = useState(null);
    const [singleFile2, setSingleFile2] = useState(null);
    const [Cnic, setCnic] = useState('');
    const [errorString, setErrorString] = React.useState("");
    const [loading, setLoading] = useState([]);
    console.log('FloorNumber', floordata)
    console.log('FloorNumber', FloorNumber)

    const submitData = async id => {
        setErrorString('');
        if (Tenant === null) {
            setErrorString("* Required Tenant Name *")
        } else if (Mobile === null) {
            setErrorString("* Required Mobile Number *")
        }
        else if (Cnic === null) {
            setErrorString("* Required CNIC No*")
        }
        else if (FloorNumber === null) {
            setErrorString("* Floor/Storey require*")
        }
        else if (Pic === null && tanentData.tanentFullPath == undefined) {
            setErrorString("* Image require*")
        }
        else if (singleFile1 === null && tanentData.tanentCNICFrontFullPath == undefined) {
            setErrorString("* Add front side image of CNIC *")
        }
        else if (singleFile2 === null && tanentData.tanentCNICBackFullPath == undefined) {
            setErrorString("* Back side image of CNIC *")
        }
        else {

            var obj = {
                "id": 0,
                "Name": Tenant,
                "MobileNo": Mobile,
                "Floor": FloorNumber,
                "CNIC": Cnic,
                // 'address': user.address,
                // 'houseNo': user.houseNo,
                "userId": 0,
                "HouseId":user.houseId,
                // "fileName": "string",
                // "filePath": "string",
                // "imageData": "string",
                // "imageDataB": "string",
                // "imageTitle": "string",
                // "fullPath": "string",
                // "cnicFrontFileName": "string",
                // "cnicFrontFilePath": "string",
                "TanentImageData": Pic == null ? null
                    : {
                        uri: Pic.path,
                        type: 'image/jpeg',
                        name: 'photo.jpg',
                    },
                "TanentCNICFrontImageData": singleFile1 == null ? null
                    : {
                        uri: singleFile1.path,
                        type: 'image/jpeg',
                        name: 'photo.jpg',
                    },
                "TanentCNICBackImageData": singleFile2 == null ? null
                    : {
                        uri: singleFile2.path,
                        type: 'image/jpeg',
                        name: 'photo.jpg',
                    },
                // "cnicFrontImageTitle": "string",
                // "cnicFrontFullPath": "string",
                // "cnicBackFileName": "string",
                // "cnicBackFilePath": "string",
                // "cnicBackImageData": "string",
                // "cnicBackImageDataB": "string",
                // "cnicBackImageTitle": "string",
                // "cnicBackFullPath": "string"
            }
            console.log('add tenant', obj)
            var form_data = new FormData();

            for (var key in obj) {
                form_data.append(key, obj[key]);
            }
            console.log('obj', form_data)
            if (tanentData.id) {
                updateTenant(form_data, tanentData.id)
            } else {
                addTenant(form_data)
            }

        };
    }
    const addTenant = async obj => {
        try {
            setLoading(true);
            const res = await Api.post(urls.ADD_TANENT, obj);
            console.log('add tanent', res)
            if (res && res.success == true) {
                console.log('res', res.success)
                dispatch(getProfile());
                navigation.goBack()
                setLoading(false);
                _toast("Add Tanent successfully")
                setCnic('')
                setMobile('')
                setTenant('')
                setFloorNumber('')
                setSingleFile1(null)
                setSingleFile2(null)
            } else {
                setLoading(false);
                _toast(res.message)

            }
        } catch (error) {
            console.error(error);
        }

    }
    const updateTenant = async (obj, id) => {

        try {
            setLoading(true);
            const res = await Api.put(  urls.UPDATE_TANENT + id,obj);
            console.log('resfffff', res)
            if (res && res.success == true) {
                navigation.goBack()
                _toast("Record(s) updated successfully")
                dispatch(getProfile());
                setLoading(false);
            } else {
                setLoading(false);
                setErrorString(res.message)
            }
        } catch (error) { 
            console.error(error);
        }
    }
    useEffect(() => {
        if (Object.keys(tanentData).length > 0) {
            console.log('running')
            setTenant(tanentData.name)
            setMobile(tanentData.mobileNo)
            setCnic(tanentData.cnic)
            setFloorNumber(tanentData.floor)
            // setSingleFile1(tanentData.tanentCNICFrontFullPath)
            // setSingleFile2(tanentData.tanentCNICBackFullPath)
            // setPic(tanentData.tanentFullPath)
        }
        // console.log('setPic', tanentData.tanentFullPath)
    },[]);


    const toggel3 = () => {
        Alert.alert("Profile Image", "change profile Image", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            {
                text: "Select from gallary",
                onPress: async () => {
                    takephotofromgallary();
                },
            },
        ]);
    };
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
    const takephotofromgallary = async () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then((Pic) => {
            //   addPhoto(image);
            setPic(Pic);
            // AsyncStorage.setItem('Profile', JSON.stringify(Pic));
            // console.log(Pic, "image working");
        });
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
    }

    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <ChatHeader
                backbutton
                notifaction={globalPath.notifaction}
                value={'1'}
                user={globalPath.user}
                navigation={navigation}
            />
            <View style={{
                alignItems: "flex-end",
                alignSelf: "center",
                marginTop: 10,
            }}>
                <TouchableOpacity
                    style={{
                        zIndex: 1,
                        position: "absolute",
                        // borderRadius: 30,
                        marginTop: 70,
                    }}
                    onPress={() => toggel3()}
                >
                    <Icon
                        margin={[35, 0, 0, 0]}
                        size={20} source={globalPath.editpic} />
                </TouchableOpacity>
                <View style={{ alignSelf: 'center', marginTop: 30 }}>
                    <Image
                        // source={
                        //     Pic == null
                        //         ? globalPath.user
                        //         : { uri: Pic.path }

                        // }
                        source={
                            Pic == null
                                ? tanentData.tanentFullPath
                                    ? { uri: tanentData.tanentFullPath } : globalPath.user
                                : { uri: Pic.path }
                        }
                        style={{
                            borderRadius: 70,
                            height: wp(30),
                            width: wp(30),
                            resizeMode: "contain",
                            backgroundColor: colors.white,
                        }}
                    />

                </View>

            </View>
            <View style={{ alignSelf: 'center' }}>
                <ResponsiveText
                    margin={[0, 0, 20, 0]}
                    color={colors.white}
                    weight={'bold'}
                    size={5}
                >{tanentData.name}
                </ResponsiveText>
            </View>
            <View style={styles.footer}>
                <ScrollView>
                    <View>
                        <ResponsiveText
                            margin={[20, 0, 0, 15]}
                            color={colors.black}
                            weight={'bold'}
                            size={4}
                        >Tenant Name
                            <ResponsiveText color={colors.red}>*</ResponsiveText>
                        </ResponsiveText>
                        <Input
                            // editable={false}
                            placeholder={"Enter Name"}
                            width={wp(90)}
                            height={hp(6.5)}
                            padding={[0, 0, 0, 10]}
                            margin={[15, 0, 5, 15]}
                            autoCapitalize={'none'}
                            backgroundColor={colors.white}
                            onChnageText={(text) => setTenant(text)}
                            value={Tenant}
                        />
                    </View>
                    <View>
                        <ResponsiveText
                            margin={[10, 0, 0, 15]}
                            color={colors.black}
                            weight={'bold'}
                            size={4}
                        >Please enter your mobile number
                            <ResponsiveText color={colors.red}>*</ResponsiveText>
                        </ResponsiveText>
                        <Input
                            // editable={false}
                            placeholder={"03XX-XXXXXXX"}
                            width={wp(90)}
                            height={hp(6.5)}
                            padding={[0, 0, 0, 10]}
                            margin={[15, 0, 5, 15]}
                            maxlength={12}
                            keyboardType={'numeric'}
                            backgroundColor={colors.white}
                            onChnageText={(text) => setMobile(text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''))}
                            value={Mobile}
                        />
                    </View>
                    <View>
                        <ResponsiveText
                            margin={[10, 0, 0, 15]}
                            color={colors.black}
                            weight={'bold'}
                            size={4}
                        >Address
                        </ResponsiveText>
                        <Input
                            editable={false}
                            placeholder={"Owner Name"}
                            value={user.address}
                            width={wp(90)}
                            height={hp(6.5)}
                            padding={[0, 0, 0, 10]}
                            margin={[15, 0, 5, 15]}
                            backgroundColor={colors.white}
                        //  onChnageText={(text) => setPassword(text)}
                        />
                    </View>
                    <View>
                        <ResponsiveText
                            margin={[10, 0, 0, 15]}
                            color={colors.black}
                            weight={'bold'}
                            size={4}
                        >CNIC No
                            <ResponsiveText color={colors.red}>*</ResponsiveText>
                        </ResponsiveText>
                        <Input
                            // editable={false}
                            placeholder={'00000-0000000-0'}
                            // value={user.address}
                            width={wp(90)}
                            maxlength={13}
                            height={hp(6.5)}
                            padding={[0, 0, 0, 10]}
                            margin={[15, 0, 5, 15]}
                            keyboardType={'numeric'}
                            backgroundColor={colors.white}
                            onChnageText={(text,formatted, extracted) => setCnic(text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''))}
                            value={Cnic}
                        />
                    </View>
                    <View>

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View>
                            <ResponsiveText
                                margin={[10, 0, 0, 15]}
                                color={colors.black}
                                weight={'bold'}
                                size={4}
                            >Plot Number
                            </ResponsiveText>
                            <Input
                                editable={false}
                                placeholder={"Owner Name"}
                                value={user.houseNo?.toString()}
                                width={wp(40)}
                                height={hp(6.5)}
                                padding={[0, 0, 0, 10]}
                                margin={[15, 0, 5, 15]}
                                backgroundColor={colors.white}
                            //  onChnageText={(text) => setPassword(text)}
                            />
                        </View>
                        <View>
                            <ResponsiveText
                                margin={[10, 0, 0, 15]}
                                color={colors.black}
                                weight={'bold'}
                                size={4}
                            >Select Floor
                                <ResponsiveText color={colors.red}>*</ResponsiveText>
                            </ResponsiveText>
                            <View style={{ marginTop: 18 }}>
                                <DropDown
                                    width={wp(45)}
                                    defaultButtonText={FloorNumber ? FloorNumber : 'Select Property Type'}

                                    // margin={[20, 0, 5, 10]}
                                    data={floordata.map((v) => v.floorDetail)}
                                    onSelect={(item) => {
                                        console.log("select", item);
                                        setFloorNumber(item);
                                    }}
                                />
                            </View>
                        </View>
                    </View>

                    <View>
                        <ResponsiveText
                            textAlign={'center'}
                            margin={[10, 0, 0, 0]}
                            color={colors.black}
                            weight={'bold'}
                            size={4}
                        >Provide Tanent CNIC Image
                        </ResponsiveText>
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
                                            {singleFile1 || tanentData.tanentCNICFrontFullPath ?
                                                <Image
                                                    // source={{ uri: singleFile1.path }}
                                                    source={
                                                        singleFile1 == null
                                                            ? tanentData.tanentCNICFrontFullPath ? {
                                                                uri: tanentData.tanentCNICFrontFullPath
                                                            } : globalPath.Camera
                                                            : { uri: singleFile1.path }
                                                    }
                                                    style={{
                                                        borderRadius: 10,
                                                        height: wp(27),
                                                        width: wp(68),
                                                        resizeMode: 'contain',
                                                        backgroundColor: colors.white,
                                                        alignSelf: 'center',
                                                        // marginTop: 30,
                                                    }}
                                                />
                                                : <Image
                                                    // source={{ uri: singleFile1.path }}
                                                    source={
                                                        singleFile1 == null
                                                            ? tanentData.tanentCNICFrontFullPath ? {
                                                                uri: tanentData.tanentCNICFrontFullPath
                                                            } : globalPath.Camera
                                                            : { uri: singleFile1.path }
                                                    }
                                                    style={{
                                                        borderRadius: 10,
                                                        height: wp(9),
                                                        width: wp(10),
                                                        resizeMode: 'contain',
                                                        backgroundColor: colors.white,
                                                        alignSelf: 'center',
                                                        // marginTop: 30,
                                                    }}
                                                />}
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
                                        {singleFile2 || tanentData.tanentCNICBackFullPath?
                                            <Image
                                                // source={{ uri: singleFile1.path }}
                                                source={
                                                    singleFile2 == null
                                                        ? tanentData.tanentCNICBackFullPath
                                                            ? {
                                                                uri: tanentData.tanentCNICBackFullPath
                                                            } : globalPath.Camera
                                                        : { uri: singleFile2.path }
                                                }
                                                style={{
                                                    borderRadius: 10,
                                                    height: wp(27),
                                                    width: wp(68),
                                                    resizeMode: 'contain',
                                                    backgroundColor: colors.white,
                                                    alignSelf: 'center',
                                                    // marginTop: 30,
                                                }}
                                            />
                                            :
                                            <Image
                                                // source={{ uri: singleFile1.path }}
                                                source={
                                                    singleFile2 == null
                                                        ? tanentData.tanentCNICBackFullPath
                                                            ? {
                                                                uri: tanentData.tanentCNICBackFullPath
                                                            } : globalPath.Camera
                                                        : { uri: singleFile2.path }
                                                }
                                                style={{
                                                    borderRadius: 10,
                                                    height: wp(9),
                                                    width: wp(10),
                                                    resizeMode: 'contain',
                                                    backgroundColor: colors.white,
                                                    alignSelf: 'center',
                                                    // marginTop: 30,
                                                }}
                                            />
                                        }

                                    </Card>
                                </TouchableOpacity>
                            </Card>
                            <View style={{ alignItems: 'center' }}>
                                <ResponsiveText color={colors.black} weight={'bold'}>The Photo must be take in good light </ResponsiveText>
                                <ResponsiveText color={colors.black} weight={'bold'}> and in good quality </ResponsiveText>
                            </View>
                        </View>

                    </View>
                    <ResponsiveText
                        margin={[10, 0, 0, 0]}
                        fontFamily={Fonts.Bold}
                        size={3.5}
                        color={colors.red}
                        textAlign={'center'}
                    >
                        {errorString}
                    </ResponsiveText>
                    <View style={{ marginHorizontal: '20%', marginBottom: '5%' }}>
                        <RnButton
                            onPress={() => submitData()}
                            // onPress={() => navigation.goBack()}
                            backgroundColor={colors.primary}
                            margin={[20, 0, 0, 0]}
                            title={"Save"}
                        />
                    </View>
                    {loading == true ?
                        <Loader />
                        :
                        null
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )

}

export default AddTanent
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondary,
    },
    footer: {
        flex: 1,
        backgroundColor: colors.lightWhite,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        // justifyContent:'flex-end'
    },
    Text: {
        flex: 1,
        justifyContent: "center",
        paddingLeft: '10%',
        borderBottomWidth: 1,
        borderColor: colors.grey,
    },
    Text2:
    {
        flex: 1,
        justifyContent: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderColor: colors.grey,
    }

})