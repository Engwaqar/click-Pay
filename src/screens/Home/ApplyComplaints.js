import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Alert, Image, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors } from '../../constants/colorsPallet'
import ChatHeader from '../../components/ChatHeader'
import ResponsiveText from '../../components/RnText'
import Card from '../../components/Card'
import Icon from '../../components/Icon'
import { globalPath } from '../../constants/globalPath'
import RnButton from "../../components/RnButton";
import Fonts from '../../helpers/Fonts'
import Input from "../../components/Input";
import { hp, wp } from '../../helpers/Responsiveness'
import { routeName } from '../../constants/routeName'
import { ScrollView } from 'react-native-gesture-handler'
import DropDown from '../../components/DropDown'
import RadioButton from '../../components/RadioButton'
import ImagePicker from "react-native-image-crop-picker";
import Loader from "../../components/loader";
import { _toast } from '../../constants/Index'
import urls from '../../redux/lib/urls'
import Api from '../../redux/lib/api'
import { RadioGroup } from 'react-native-flexi-radio-button'
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from '../../redux/actions/user.actions'
const ApplyComplaints = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const GetUserData = useSelector(state => state.userReducers.profileData.data,);
    const refreshing = useSelector(state => state.userReducers.profileData.refreshing);
    useEffect(() => {
        dispatch(getProfile());
    }, [])
    console.log('User Profile complain', GetUserData)
    const [Complaints, setComplaints] = useState('');
    const [Complaintsdata, setComplaintsdata] = useState([]);
    const [GetPreComplains, setGetPreComplains] = useState([]);
    const [ComplaintsText, setComplaintsText] = useState('');
    const [checked, setCheck] = useState(false);
    const [loading, setLoading] = useState([]);
    const [errorString, setErrorString] = React.useState("");
    const [image, setImage] = useState(null);
    const [singleFile1, setSingleFile1] = useState(null);
    const [singleFile2, setSingleFile2] = useState(null);
    const [singleFile3, setSingleFile3] = useState(null);
    const [singleFile4, setSingleFile4] = useState(null);
    const id = Complaints;
    console.log('Complaintsdata.id', id)

    useEffect(() => {
        GetCategory();
        GetPreDefineComplains();
    }, [id]);
    useEffect(() => {
        setComplaintsText(ComplaintsText)
    }, [ComplaintsText])

    const GetCategory = async (index, item) => {
        try {
            setLoading(true);
            const res = await Api.get(urls.GET_CATEGORY);
            console.log('Get Category data res', res);
            if (res && res.success == true) {
                setLoading(false);
                setComplaintsdata(res.data);

            } else {
                setLoading(false);
                setErrorString(res.message)
            }
        } catch (error) { }
    };
    const GetPreDefineComplains = async (index, item) => {
        try {
            setLoading(true);
            const res = await Api.get(urls.GET_PRE_COMPLAIN + id);
            console.log('GetPreComplains', res);
            if (res && res.success == true) {
                setLoading(false);
                setGetPreComplains(res.data);

            } else {
                setLoading(false);
                setErrorString(res.message)
            }
        } catch (error) { }
    };
    const submitData = async type => {
        setErrorString('');
        if (Complaints === "") {
            setErrorString("*Complaints Type require*")
        }
        else if (setComplaintsText === "") {
            setErrorString("*ComplaintsText require*")
        }
        // else if (singleFile1 === null) {
        //     setErrorString("*Complaint Image1 is Required*")
        // }
        // else if (singleFile2 === null) {
        //     setErrorString("*Complaint Image2 is Required *")
        // }
        // else if (singleFile3 === null) {
        //     setErrorString("* Complaint Image3 is Required *")
        // }

        else {

            // const imgs = [
            //     {
            //         'ImageData[0]': {
            //             uri: image?.path,
            //             type: 'image/jpeg',
            //             name: 'photo.jpg',
            //         }
            //     },
            //     {
            //         'ImageData[1]': {
            //             uri: singleFile3?.path,
            //             type: 'image/jpeg',
            //             name: 'photo.jpg',
            //         }
            //     },
            //     {
            //         'ImageData[2]': {
            //             uri: singleFile4?.path,
            //             type: 'image/jpeg',
            //             name: 'photo.jpg',
            //         }
            //     }]
            var formdata = new FormData();
            formdata.append("BlockId", GetUserData.blockId);
            formdata.append("Id", "0");
            formdata.append("HouseId", GetUserData.houseId);
            formdata.append("Description", ComplaintsText);
            formdata.append("ComplainTypeId", Complaints);
            // imgs.forEach(element => {

            // formdata.append("ImageData", JSON.stringify(imgs))
            formdata.append("ImageData", singleFile1 != null ? {
                uri: singleFile1?.path,
                type: 'image/jpeg',
                name: 'photo.jpg',
            } : null)
            formdata.append("ImageData", singleFile2 != null ? {
                uri: singleFile2?.path,
                type: 'image/jpeg',
                name: 'photo.jpg',
            } : null)
            formdata.append("ImageData", singleFile3 != null ? {
                uri: singleFile3?.path,
                type: 'image/jpeg',
                name: 'photo.jpg',
            } : null)


            console.log('obj', formdata)
            try {
                setLoading(true);
                const res = await Api.post(urls.ADD_COMPLAINTS, formdata);
                console.log('resfff', res)
                if (res && res.success == true) {
                    console.log('res', res.success)
                    navigation.navigate(routeName.COMPLAINT_SUBMITTED)

                    setLoading(false);
                    _toast("Complaint successfully Submitted")
                    dispatch(getProfile());
                    setComplaints('')
                    setComplaintsText('')
                    setSingleFile1(null)
                    setSingleFile2(null)
                    setSingleFile3(null)

                } else {
                    setLoading(false);
                    setErrorString(res.message)
                }
            } catch (error) {
                console.error('okokokoo error', error);
            }
        };
    }
    const toggel = (file) => {
        Alert.alert("Profile Image", "change profile Image", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            {
                text: "open Camera",
                onPress: async () => {
                    openCamera(file);
                },
            },
            {
                text: "Select from gallary",
                onPress: async () => {
                    takephotofromgallary(file);

                },
            },

        ]);
    };
    const toggel1 = (file) => {
        Alert.alert("Complaints Videos", " Plz atteched 30s Complaint Video", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            {
                text: "Select video from gallary",
                onPress: async () => {
                    takevideofromgallary(file);

                },
            },
            {
                text: "Upload Video",
                onPress: async () => {
                    videoCam(file);

                },
            },
        ]);
    };
    const takephotofromgallary = (setFile) => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then((image) => {
            // addPhoto(image);
            setFile(image);
            console.log(image, "image working");
        });
    };
    const openCamera = (setFile) => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            // cropping: true,
        }).then((image) => {
            // addPhoto(image);
            setFile(image);
            console.log(image, "image working");
        }).catch((error) => {
            console.log('error', error)
        });
    };
    const videoCam = (setFile) => {
        ImagePicker.openCamera({
            mediaType: 'video',
            durationLimit: 30,
        }).then((image) => {
            // addPhoto(image);
            setFile(image);
            console.log(image, "image working");
        });
    };
    const takevideofromgallary = (setFile) => {
        ImagePicker.openPicker({
            mediaType: "video",
            // durationLimit: 30,
            duration: 30000
        }).then((image) => {
            setFile(image);
            console.log('vedossss', image);
        });
    }
    // const videoCam = () =>
    //     ImagePicker.openCamera({
    //         mediaType: 'video',
    //     }).then(image => {
    //         console.log(image);
    //     });
    const Data2 = [
        {
            id: 1,
            title: 'Lights too Bright or Dim',
            url: require('../../assets/icons/electricity.png'),
        },

        {
            id: 1,
            title: 'Circuit Breaker Tripping Frequently',
            url: require('../../assets/icons/gas.png'),

        },
        {
            id: 1,
            title: 'Voltage Fluctuation',
            url: require('../../assets/icons/water.png'),

        },
        {
            id: 1,
            title: 'Electrical Shocks',
            url: require('../../assets/icons/tv.png'),

        },
        {
            id: 1,
            title: 'High Electrical Bill',
            url: require('../../assets/icons/internet.png'),

        },
        {
            id: 1,
            title: 'Flickering Lights When It’s Windy',
            url: require('../../assets/icons/cleaning.png'),

        },
        {
            id: 1,
            title: 'Damaged street light',
            url: require('../../assets/icons/cleaning.png'),

        },
    ];

    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <ChatHeader
                backbutton
                notifaction={globalPath.notifaction}
                value={'1'}
                user={globalPath.user}
                navigation={navigation}
            />

            <ResponsiveText
                margin={[15, 0, 5, 20]}
                color={colors.textColor}
                weight={'bold'}
                size={4}
            >Apply Complaints
            </ResponsiveText>
            <View style={styles.footer}>

                <ScrollView>

                    <View style={{ marginTop: hp(1) }}>

                        <DropDown
                            data={Complaintsdata.map((v) => v.complainName)}
                            onSelect={(item) => {
                                var id = Complaintsdata.find(
                                    v => v.complainName == item,
                                )?.id;
                                console.log("select", id);
                                setComplaints(id);
                            }}
                        />
                        {
                            Complaints ?
                                <Card>
                                    <RadioGroup onSelect={(index, value) => setComplaintsText(value)}>

                                        {GetPreComplains.map((item) => {
                                            return (
                                                <RadioButton value={item.descriptions} >
                                                    <ResponsiveText>{item.descriptions}</ResponsiveText>
                                                </RadioButton>
                                                // <TouchableOpacity
                                                //     onPress={() => setComplaintsText(item.descriptions)}
                                                //     style={{ flexDirection: 'row', borderBottomWidth: 0.2, borderBottomColor: colors.grey2 }}>
                                                // <RadioButton
                                                //     descriptions={item.descriptions}
                                                //     onPress={setComplaintsText}
                                                // />
                                                // </TouchableOpacity>
                                            )
                                        })}
                                    </RadioGroup>
                                </Card>
                                : null
                        }

                        <View
                            style={{
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 0,
                                },
                                shadowOpacity: 0.29,
                                shadowRadius: 4.65,

                                elevation: 3,
                                borderRadius: 10,
                                marginTop: 10,

                                backgroundColor: colors.white,
                                marginHorizontal: 20
                            }}
                        >
                            <Input
                                placeholder={"Message"}
                                width={wp(90)}
                                height={hp(18)}
                                inputHeight={hp(15)}
                                padding={[0, 0, 0, 25]}
                                margin={[0, 0, 0, 0]}
                                multiline={true}
                                // secureTextEntry
                                onChnageText={(text) => setComplaintsText(text)}
                                value={ComplaintsText}
                            //   leftIcon={globalPath.Lock}
                            />
                        </View>
                        <View>
                            <ResponsiveText weight={'bold'} size={4} margin={[10, 0, 0, 10]} color={colors.secondary} textAlign={'center'}> Please upload minimum 1,maximum 3 images for your Complaints.</ResponsiveText>
                        </View>
                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                            <ImageBackground >
                                <TouchableOpacity
                                    onPress={() => toggel(setSingleFile1)}>
                                    <Card style={{
                                        zIndex: 1,
                                        height: wp(25),
                                        width: wp(25),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        // padding: 10,
                                        // borderRadius: 100,
                                        backgroundColor: colors.white,
                                        alignSelf: 'center',
                                        marginTop: 20,

                                    }}>
                                        {singleFile1 == undefined || singleFile1 == null ? (
                                            <Icon margin={[0, 0, 0, 0]}
                                                size={25}
                                                source={globalPath.pluslogo}
                                                tintColor={colors.secondary}

                                            >

                                            </Icon>
                                        ) : (
                                            <Image
                                                source={{ uri: singleFile1.path }}
                                                style={{
                                                    borderRadius: 10,
                                                    height: wp(25),
                                                    width: wp(25),
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
                            <TouchableOpacity
                                onPress={() => toggel(setSingleFile2)}>
                                <Card style={{
                                    zIndex: 1,
                                    height: wp(25),
                                    width: wp(25),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    // padding: 10,
                                    // borderRadius: 100,
                                    backgroundColor: colors.white,
                                    alignSelf: 'center',
                                    marginTop: 20,

                                }}>
                                    {singleFile2 == undefined || singleFile2 == null ? (
                                        <Icon margin={[0, 0, 0, 0]}
                                            size={25}
                                            source={globalPath.pluslogo}
                                            tintColor={colors.secondary}

                                        >
                                        </Icon>
                                    ) : (
                                        <Image
                                            source={{ uri: singleFile2.path }}
                                            style={{
                                                borderRadius: 10,
                                                height: wp(25),
                                                width: wp(25),
                                                resizeMode: 'contain',
                                                backgroundColor: colors.white,
                                                alignSelf: 'center',
                                                // marginTop: 25,
                                            }}
                                        />
                                    )}
                                </Card>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => toggel(setSingleFile3)}>
                                <Card style={{
                                    zIndex: 1,
                                    height: wp(25),
                                    width: wp(25),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    // padding: 10,
                                    // borderRadius: 100,
                                    backgroundColor: colors.white,
                                    alignSelf: 'center',
                                    marginTop: 20,

                                }}>
                                    {singleFile3 == undefined || singleFile3 == null ? (
                                        <Icon margin={[0, 0, 0, 0]}
                                            size={25}
                                            source={globalPath.pluslogo}
                                            tintColor={colors.secondary}

                                        >
                                        </Icon>
                                    ) : (
                                        <Image
                                            source={{ uri: singleFile3.path }}
                                            style={{
                                                borderRadius: 10,
                                                height: wp(25),
                                                width: wp(25),
                                                resizeMode: 'contain',
                                                backgroundColor: colors.white,
                                                alignSelf: 'center',
                                                // marginTop: 30,
                                            }}
                                        />
                                    )}
                                </Card>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <ResponsiveText weight={'bold'} size={4} margin={[10, 0, 0, 8]} color={colors.secondary} textAlign={'center'}> Please Attached minimum 30,seconds video for your Complaints.</ResponsiveText>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => toggel1(setSingleFile4)}>
                                <Card style={{
                                    zIndex: 1,
                                    height: wp(30),
                                    width: wp(70),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    // padding: 10,
                                    // borderRadius: 100,
                                    backgroundColor: colors.white,
                                    alignSelf: 'center',
                                    marginTop: 20,

                                }}>
                                    {singleFile4 == undefined || singleFile4 == null ? (
                                        <Icon margin={[0, 0, 0, 0]}
                                            size={30}
                                            source={globalPath.VideoCam}>
                                        </Icon>
                                    ) : (
                                        <Image
                                            source={{ uri: singleFile4.path }}
                                            style={{
                                                borderRadius: 10,
                                                height: wp(30),
                                                width: wp(70),
                                                resizeMode: 'contain',
                                                backgroundColor: colors.white,
                                                alignSelf: 'center',
                                                // marginTop: 30,
                                            }}
                                        />
                                    )}
                                </Card>
                            </TouchableOpacity>
                        </View>
                        <ResponsiveText color={colors.red} textAlign={'center'} margin={[20, 0, 0, 10]}>{errorString}</ResponsiveText>
                        <View style={{ marginHorizontal: '20%' }}>
                            <RnButton
                                onPress={() => submitData()}
                                // onPress={() => navigation.goBack()}

                                backgroundColor={colors.primary}
                                margin={[20, 0, 0, 0]}
                                title={"Submit"}
                            //   onPress={() => Validation()}
                            />
                        </View>
                    </View>

                </ScrollView>
            </View >
            {loading == true ?
                <Loader />
                :
                null
            }
        </SafeAreaView >
    )
}

export default ApplyComplaints;

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
})