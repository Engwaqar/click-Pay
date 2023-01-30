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
import { colors } from '../constants/colorsPallet'
import ChatHeader from '../components/ChatHeader'
import ResponsiveText from '../components/RnText'
// import Card from '../../components/Card'
import Icon from '../components/Icon'
import { globalPath } from '../constants/globalPath'
import Fonts from '../helpers/Fonts'
import { hp, wp } from '../helpers/Responsiveness'
import Input from "../components/Input";
import RnButton from "../components/RnButton";
import { _toast } from '../constants/Index'
import AsyncStorage from "@react-native-community/async-storage";
import { StackActions } from "@react-navigation/native";
import { routeName } from '../constants/routeName'
import Card from './Card'
import ImagePicker from "react-native-image-crop-picker";
import DropDown from '../components/DropDown'
import AddPicCard from './AddPicCard'
import urls from '../redux/lib/urls'
import Api from '../redux/lib/api'
import Loader from "../components/loader";
import { useDispatch, useSelector } from "react-redux";
import { GetChild, getProfile } from "../redux/actions/user.actions";

const EditProfile = ({ navigation }) => {
    const [Property, setProperty] = useState('');
    const [PropertyData, setPropertyData] = useState([]);
    const [FloorStoryData, setFloorStoryData] = useState([]);
    const [FloorNumber, setFloorNumber] = useState('');
    const [errorString, setErrorString] = React.useState("");
    console.log('first', image)
    const [singleFile3, setSingleFile3] = useState(null);
    const [singleFile4, setSingleFile4] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState([]);
    const dispatch = useDispatch();
    const GetUserData = useSelector(state => state.userReducers.profileData.data,);
    const refreshing = useSelector(state => state.userReducers.profileData.refreshing);
    console.log('ProfileData', GetUserData)

    useEffect(() => {
        GetProperty();
        GetFloorStory('', GetUserData.propertyTypeId)
    }, []);
    const deleteTenant = (id) => {
        Alert.alert(
            'Tenant',
            'Do you want to remove this Tenant ?',
            [
                {
                    text: 'Cancel',
                    onPress: () => { },
                    style: 'cancel',
                },
                {
                    text: 'OK',

                    onPress: async () => {
                        console.log(id, "iddddd")
                        // if(item.statusName === 'PreOrder'){
                        try {
                            setLoading(true);
                            const res = await Api.delete(urls.DELETE_TANENT + id);
                            if (res && res.success == true) {
                                setLoading(false);
                                console.log('response', res)
                                dispatch(getProfile())
                                _toast("Tenant delete successfully")
                                navigation.navigate.goBack()
                            } else {
                                setLoading(false);
                                setErrorString(res.message)
                            }
                        } catch (error) { }
                        // }else{
                        //   Alert.alert('','Order in process')
                        // }
                    },
                },
            ],
        );
    };
    const GetProperty = async (index, item) => {
        try {
            setLoading(true);
            const res = await Api.get(urls.GET_PROPERTY);
            console.log('property data res', res);
            if (res && res.success == true) {
                setLoading(false);
                setPropertyData(res.data);
                if (GetUserData.propertyTypeId) {
                    var name = res.data.find((v) => v.id == GetUserData.propertyTypeId)?.name;
                    setProperty(name)
                }
            } else {
                setLoading(false);
                setErrorString(res.message)
            }
        } catch (error) { }
    };
    const GetFloorStory = async (item, propertyTypeId) => {
        const id = propertyTypeId ? propertyTypeId : PropertyData.find(v => v.name == item).id
        console.log('id', id)
        try {
            const res = await Api.get(urls.GET_FLOOR_STORY + id);
            console.log('GET_FLOOR_STORY', res);
            if (res && res.success == true) {
                setLoading(false);
                setFloorStoryData(res.data)
                if (GetUserData.floorORStoryId) {
                    var name = res.data.find((v) => v.id == GetUserData.floorORStoryId)?.floorDetail;
                    setFloorNumber(name)
                }
            } else {
                setLoading(false);
                setErrorString(res.message)
            }
        } catch (error) { }
    };
    const submitData = async type => {
        setErrorString('');
        if (Property === "") {
            setErrorString("*Property Type require*")
        } else if (FloorNumber === "") {
            setErrorString("*Floor/Storey require*")
        }
        // else if (image === null) {
        //     setErrorString("* Image require*")
        // }
        else if (singleFile3 === null) {
            setErrorString("* Add front side image of CNIC *")
        }
        else if (singleFile4 === null) {
            setErrorString("* Add back side image of CNIC *")
        }

        else {
            var formdata = new FormData();
            formdata.append("PropertyTypeId", PropertyData.find((v) => v.name == Property)?.id);
            formdata.append("FloorORStoryId", FloorStoryData.find((v) => v.floorDetail == FloorNumber)?.id);
            formdata.append("ImageData", image == null ? null
                : {
                    uri: image.path,
                    type: 'image/jpeg',
                    name: 'photo.jpg',
                });
            formdata.append("CNICFrontImageData", singleFile3.path == undefined ? null
                : {
                    uri: singleFile3.path,
                    type: 'image/jpeg',
                    name: 'photo.jpg',
                })
            formdata.append("CNICBackImageData", singleFile4.path == undefined ? null
                : {
                    uri: singleFile4.path,
                    type: 'image/jpeg',
                    name: 'photo.jpg',
                })
            if (type == 'add') {
                navigation.navigate(routeName.ADD_TANENT, { item: FloorStoryData, GetUserData: GetUserData, tanentData: GetUserData.objGetListTanentDto });
                return false
            }
            console.log('obj', formdata)

            try {
                setLoading(true);
                const res = await Api.put(
                    urls.EDIT_PROFILE,
                    formdata,

                    //   true,
                );
                console.log('resfff', res)
                if (res && res.success == true) {
                    console.log('res', res.success)
                    navigation.goBack()
                    setLoading(false);
                    _toast("Record(s) updated successfully")
                    dispatch(getProfile());
                    setProperty('')
                    setFloorNumber('')
                    setSingleFile3(null)
                    setSingleFile4(null)
                } else {
                    setLoading(false);
                    setErrorString(res.message)
                }
            } catch (error) {
                console.error(error);
            }
        };
    }
    const toggel = () => {
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
        }).then((image) => {
            //   addPhoto(image);
            setImage(image);
            AsyncStorage.setItem('ProfileImage', JSON.stringify(image));
            console.log(image, "image working");
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
    };
    const propertyName = (id) => {
        const name = PropertyData.find((v) => v.id == id)?.name
        return name;

    };
    const floorName = (id) => {
        const name = FloorStoryData.find((v) => v.id == id)?.floorDetail
        return name;

    };
    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            {/* <ChatHeader
                backbutton
                notifaction={globalPath.notifaction}
                value={'1'}
                user={globalPath.user}
                navigation={navigation}
            /> */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon
                    size={25}
                    margin={[15, 0, 0, 20]}
                    source={globalPath.backArrow}
                    tintColor={colors.white}
                />
            </TouchableOpacity>
            <View style={{
                alignItems: "flex-end",
                alignSelf: "center",
                marginTop: 15,
            }}>
                <TouchableOpacity
                    style={{
                        zIndex: 1,
                        position: "absolute",
                        // borderRadius: 30,
                        marginTop: 70,
                    }}
                    onPress={() => toggel()}
                >
                    <Icon
                        margin={[35, 0, 0, 0]}
                        size={20} source={globalPath.editpic} />
                </TouchableOpacity>
                <View style={{ alignSelf: 'center', marginTop: 30 }}>
                    <Image
                        source={
                            image == null
                                ? GetUserData.fullPath
                                    ? { uri: GetUserData.fullPath } : globalPath.user
                                : { uri: image.path }
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
                >{GetUserData.username}
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
                        >Owner Name
                        </ResponsiveText>
                        <Input
                            editable={false}
                            placeholder={"Owner Name"}
                            value={GetUserData.username}
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
                        >Mobile Number
                        </ResponsiveText>
                        <Input
                            editable={false}
                            placeholder={"Mobile Number"}
                            value={GetUserData.contactNumber}
                            width={wp(90)}
                            height={hp(6.5)}
                            padding={[0, 0, 0, 10]}
                            margin={[15, 0, 5, 15]}
                            backgroundColor={colors.white}
                        //  onChnageText={(text) => setPassword(text)}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View>
                            <ResponsiveText
                                margin={[10, 0, 0, 15]}
                                color={colors.black}
                                weight={'bold'}
                                size={4}
                            >House No:
                            </ResponsiveText>
                            <Input
                                editable={false}
                                placeholder={"House No:"}
                                value={GetUserData.houseNo?.toString()}
                                width={wp(30)}
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
                            >Block #
                            </ResponsiveText>
                            <Input
                                editable={false}
                                placeholder={"Block #"}
                                value={GetUserData.block}
                                width={wp(30)}
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
                            >Street #
                            </ResponsiveText>
                            <Input
                                editable={false}
                                placeholder={"Street #"}
                                value={GetUserData.streetNo?.toString()}
                                width={wp(30)}
                                height={hp(6.5)}
                                padding={[0, 0, 0, 10]}
                                margin={[15, 10, 0, 15]}
                                backgroundColor={colors.white}
                            //  onChnageText={(text) => setPassword(text)}
                            />
                        </View>
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
                            value={GetUserData.address}
                            width={wp(90)}
                            height={hp(6.5)}
                            padding={[0, 0, 0, 10]}
                            margin={[15, 0, 5, 15]}
                            backgroundColor={colors.white}
                        //  onChnageText={(text) => setPassword(text)}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                        <View>
                            <View>
                                <ResponsiveText
                                    margin={[10, 0, 0, 15]}
                                    color={colors.black}
                                    weight={'bold'}
                                    size={4}
                                >Property Type<ResponsiveText color={colors.red}>*</ResponsiveText>
                                </ResponsiveText>
                                <View style={{ marginTop: 18 }}>
                                    <DropDown
                                        width={wp(45)}
                                        defaultButtonText={GetUserData.propertyTypeId ? propertyName(GetUserData.propertyTypeId) : 'Select Property Type'}
                                        // margin={[20, 0, 5, 10]}
                                        data={PropertyData.map((v) => v.name)}
                                        onSelect={(item) => {
                                            console.log("select", item);
                                            setProperty(item);
                                            GetFloorStory(item)
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                        <View>
                            <ResponsiveText
                                margin={[10, 0, 0, 15]}
                                color={colors.black}
                                weight={'bold'}
                                size={4}
                            >Floors/Stories<ResponsiveText color={colors.red}>*</ResponsiveText>
                            </ResponsiveText>
                            <View style={{ marginTop: 18 }}>
                                <DropDown
                                    width={wp(45)}
                                    defaultButtonText={GetUserData.floorORStoryId ? floorName(GetUserData.floorORStoryId) : 'Select Floors/Stories'}
                                    // margin={[20, 0, 5, 10]}
                                    data={FloorStoryData.map((v) => v.floorDetail)}
                                    onSelect={(item) => {
                                        console.log("select", item);
                                        setFloorNumber(item)

                                        // setFloorNumber(true);
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                        <Card>
                            <ResponsiveText
                                weight={'bold'}
                                size={4}
                                color={colors.black}
                                textAlign={'center'}
                                margin={[10, 0, 0, 0]}
                            >Owner CNIC (Front side)<ResponsiveText color={colors.red}>*</ResponsiveText></ResponsiveText>
                            <TouchableOpacity
                                onPress={() => toggel2(setSingleFile3)}>
                                <Card style={{
                                    borderWidth: 1, borderColor: colors.grey1, height: hp(15), width: wp(70), marginTop: hp(2), alignItems: 'center', justifyContent: 'center'

                                }}>
                                    {singleFile3 || GetUserData.cnicFrontFullPath ?
                                        <Image
                                            // source={{ uri: singleFile1.path }}
                                            source={
                                                singleFile3 == null
                                                    ? GetUserData.cnicFrontFullPath

                                                        ? {
                                                            uri: GetUserData.cnicFrontFullPath

                                                        } : globalPath.Camera
                                                    : { uri: singleFile3.path }
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
                                                singleFile3 == null
                                                    ? GetUserData.cnicFrontFullPath

                                                        ? {
                                                            uri: GetUserData.cnicFrontFullPath

                                                        } : globalPath.Camera
                                                    : { uri: singleFile3.path }
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
                        </Card>
                        <Card>
                            <ResponsiveText
                                weight={'bold'}
                                size={4}
                                color={colors.black}
                                textAlign={'center'}
                            >Owner CNIC (Back side)<ResponsiveText color={colors.red}>*</ResponsiveText></ResponsiveText>
                            <TouchableOpacity
                                onPress={() => toggel2(setSingleFile4)}>
                                <Card style={{
                                    borderWidth: 1, borderColor: colors.grey1, height: hp(15), width: wp(70), marginTop: hp(2), alignItems: 'center', justifyContent: 'center'

                                }}>
                                    {singleFile4 || GetUserData.cnicBackFullPath ?
                                        <Image
                                            // source={{ uri: singleFile1.path }}
                                            source={
                                                singleFile4 == null
                                                    ? GetUserData.cnicBackFullPath

                                                        ? {
                                                            uri: GetUserData.cnicBackFullPath

                                                        } : globalPath.Camera
                                                    : { uri: singleFile4.path }
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
                                        /> : <Image
                                            // source={{ uri: singleFile1.path }}
                                            source={
                                                singleFile4 == null
                                                    ? GetUserData.cnicBackFullPath

                                                        ? {
                                                            uri: GetUserData.cnicBackFullPath

                                                        } : globalPath.Camera
                                                    : { uri: singleFile4.path }
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
                        </Card>
                        <View style={{ alignItems: 'center' }}>
                            <ResponsiveText color={colors.black} weight={'bold'}>The Photo must be take in good light </ResponsiveText>
                            <ResponsiveText color={colors.black} weight={'bold'}> and in good quality </ResponsiveText>
                        </View>
                    </View>
                    {GetUserData?.objGetListTanentDto.length > 0 ?
                        <View style={{ backgroundColor: colors.lighterGrey, marginHorizontal: 15, marginTop: 15, borderRadius: 5, flexDirection: 'row' }}>
                            <ResponsiveText
                                margin={[5, 0, 10, 15]}
                                color={colors.black}
                                weight={'bold'}
                                size={4}
                                flex={1}
                            >Tenant Info:
                            </ResponsiveText>
                            <ResponsiveText
                                margin={[5, 0, 0, 0]}
                                color={colors.black}
                                weight={'bold'}
                                size={3}
                                flex={0.2}
                            >Edit
                            </ResponsiveText>
                            <ResponsiveText
                                margin={[5, 0, 0, 0]}
                                color={colors.black}
                                weight={'bold'}
                                size={3}
                                flex={0.2}
                            >Detail
                            </ResponsiveText>
                            <ResponsiveText
                                margin={[5, 0, 0, 10]}
                                color={colors.red}
                                weight={'bold'}
                                size={3}
                                flex={0.4}
                            >Delete
                            </ResponsiveText>
                        </View>
                        : null}
                    <View style={{ marginTop: 10, marginHorizontal: 15 }}>
                        {GetUserData.objGetListTanentDto?.map((item) => {
                            return (
                                <Card style={{ margin: 5 }}>
                                    <View style={{
                                        // backgroundColor: colors.white,
                                        // shadowOpacity: 5,
                                        // borderRadius: 10,

                                        marginTop: 0,
                                        flexDirection: 'row',
                                        // borderColor: colors.black,
                                        // borderWidth: 1
                                    }}>
                                        <View style={{ flex: 1 }}>
                                            <ResponsiveText size={4} margin={[5, 0, 0, 10]} color={colors.black}>{item.name}</ResponsiveText>
                                            <ResponsiveText size={4} margin={[3, 0, 10, 15]} color={colors.black}>{item.floor}</ResponsiveText>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity onPress={() => navigation.navigate(routeName.ADD_TANENT, { item: FloorStoryData, GetUserData: GetUserData, tanentData: item })}>
                                                <View style={{
                                                    alignSelf: 'flex-end',
                                                    backgroundColor: colors.secondary,
                                                    height: hp(5),
                                                    width: hp(5),
                                                    borderRadius: 30,
                                                    marginRight: 10,
                                                    justifyContent: 'center',
                                                    marginTop: 15,
                                                    // alignItems:'center'
                                                    marginBottom: 0
                                                }}>
                                                    <Icon
                                                        margin={[0, 0, 0, 10]}
                                                        // height={20}
                                                        // width={20}
                                                        size={15}
                                                        resizeMode={"contain"}
                                                        source={globalPath.edit}

                                                    />
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => navigation.navigate(routeName.TANENT_INFO, { item: item, })}>
                                                <View style={{
                                                    alignSelf: 'flex-end',
                                                    backgroundColor: colors.secondary,
                                                    height: hp(5),
                                                    width: hp(5),
                                                    borderRadius: 30,
                                                    marginRight: 10,
                                                    justifyContent: 'center',
                                                    marginTop: 15,
                                                    // alignItems:'center'
                                                    marginBottom: 0
                                                }}>
                                                    <Icon
                                                        margin={[0, 0, 0, 10]}
                                                        // height={20}
                                                        // width={20}
                                                        size={15}
                                                        resizeMode={"contain"}
                                                        source={globalPath.detail}

                                                    />
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => deleteTenant((item.id))}>
                                                <View style={{
                                                    alignSelf: 'flex-end',
                                                    backgroundColor: colors.red,
                                                    height: hp(5),
                                                    width: hp(5),
                                                    borderRadius: 30,
                                                    marginRight: 10,
                                                    justifyContent: 'center',
                                                    marginTop: 15,
                                                    // alignItems:'center'
                                                    marginBottom: 0
                                                }}>
                                                    <Icon
                                                        margin={[0, 0, 0, 10]}
                                                        // height={20}
                                                        // width={20}
                                                        size={15}
                                                        resizeMode={"contain"}
                                                        source={globalPath.del}

                                                    />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </Card>
                            )
                        })}
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

                    <View style={{ marginHorizontal: '30%', marginBottom: '0%', }}>
                        <RnButton
                            onPress={() => submitData('add')}
                            backgroundColor={colors.primary}
                            margin={[20, 0, 0, 0]}
                            title={"Add Tenant"}
                        />
                    </View>
                    <View style={{ marginHorizontal: '20%', marginBottom: '5%' }}>
                        <RnButton
                            onPress={() => submitData()}
                            // onPress={() => navigation.goBack()}
                            backgroundColor={colors.primary}
                            margin={[20, 0, 0, 0]}
                            title={"Save"}
                        //   onPress={() => Validation()}
                        />
                    </View>
                </ScrollView>
                {loading == true ?
                    <Loader />
                    :
                    null
                }
            </View>
        </SafeAreaView>
    )
}

export default EditProfile
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