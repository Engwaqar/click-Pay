import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../constants/colorsPallet'
import ChatHeader from '../../components/ChatHeader'
import ResponsiveText from '../../components/RnText'
import Card from '../../components/Card'
import Icon from '../../components/Icon'
import { globalPath } from '../../constants/globalPath'
import Fonts from '../../helpers/Fonts'
import Input from "../../components/Input";
import { hp, wp } from '../../helpers/Responsiveness'
import { routeName } from '../../constants/routeName'
import ImagePicker from "react-native-image-crop-picker";
import Loader from "../../components/loader";
import { _toast } from '../../constants/Index'
import urls from '../../redux/lib/urls'
import Api from '../../redux/lib/api'
import RnButton from '../../components/RnButton'
const CraeteAds = ({ navigation }) => {
    const [loading, setLoading] = useState([]);
    const [errorString, setErrorString] = React.useState("");
    console.log('ActiveTab', ActiveTab)
    const [Make, setMake] = useState('');
    const [Price, setPrice] = useState('');
    const [Year, setYear] = useState('');
    const [ContectNo, setContectNo] = useState('');
    const [Addtitle, setAddtitle] = useState('');
    const [ActiveTab, setActiveTab] = useState('NEW');
    const [Description, setDescription] = useState('');
    const [singleFile1, setSingleFile1] = useState(null);
    const [singleFile2, setSingleFile2] = useState(null);
    const [singleFile3, setSingleFile3] = useState(null);
    const submitData = async type => {
        setErrorString('');
        if (singleFile1 === null) {
            setErrorString("*Image1 is Required*")
        }
        else if (singleFile2 === null) {
            setErrorString("*Image2 is Required *")
        }
        else if (singleFile3 === null) {
            setErrorString("*Image3 is Required *")
        }
        else if (Addtitle === "") {
            setErrorString("*Title require*")
        }
        else if (Make === "") {
            setErrorString("*Make require*")
        }
        else if (Price === "") {
            setErrorString("*Price require*")
        }
        else if (ContectNo === "") {
            setErrorString("*Contect Number require*")
        }

        else if (Description === "") {
            setErrorString("*Description require*")
        }
        else {
            var formdata = new FormData();
            formdata.append("Make", Make);
            formdata.append("Price", Price);
            formdata.append("Year", Year);
            formdata.append("AdTitle", Addtitle);
            formdata.append("ContactNo", ContectNo);
            formdata.append("Condition", ActiveTab);
            formdata.append("Description", Description);
            // formdata.append("ImageData", JSON.stringify(imgs))
            formdata.append("ImageData1", {
                uri: singleFile1?.path,
                type: 'image/jpeg',
                name: 'photo.jpg',
            })
            formdata.append("ImageData2", {
                uri: singleFile2?.path,
                type: 'image/jpeg',
                name: 'photo.jpg',
            })
            formdata.append("ImageData3", {
                uri: singleFile3?.path,
                type: 'image/jpeg',
                name: 'photo.jpg',
            })


            console.log('obj', formdata)
            try {
                setLoading(true);
                const res = await Api.post(urls.ADD_SELL_PRODUCT, formdata);
                console.log('resfff', res)
                if (res && res.success == true) {
                    console.log('res', res.success)
                    navigation.navigate(routeName.HOME_SCREEN)
                    setLoading(false);
                    _toast("Add Product successfully")
                    setMake('')
                    setPrice('')
                    setYear('')
                    setContectNo('')
                    setActiveTab('')
                    setAddtitle('')
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
            cropping: true,
        }).then((image) => {
            // addPhoto(image);
            setFile(image);
            console.log(image, "image working");
        });
    };

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
                margin={[15, 0, 5, 15]}
                color={colors.textColor}
                weight={'bold'}
                size={4}
            >Want to Sell
            </ResponsiveText>
            <View style={styles.footer}>
                <ScrollView>
                    <View>
                        <ResponsiveText weight={'bold'} size={4} margin={[10, 0, 0, 10]} color={colors.secondary} textAlign={'center'}> Please upload minimum 1,maximum 3 images for your Ads.</ResponsiveText>
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
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
                    <View >
                        <ResponsiveText
                            margin={[10, 0, 0, 15]}
                            color={colors.black}
                            weight={'bold'}
                            size={4}
                        >Ad Title  <ResponsiveText color={colors.red}>*</ResponsiveText>
                        </ResponsiveText>
                        <Input
                            // placeholder={"Password"}
                            width={wp(90)}
                            height={hp(6.5)}
                            padding={[0, 0, 0, 25]}
                            margin={[15, 0, 5, 15]}
                            backgroundColor={colors.white}
                            onChnageText={(text) => setAddtitle(text)}
                        />
                    </View>
                    <View>
                        <ResponsiveText
                            margin={[20, 0, 0, 15]}
                            color={colors.black}
                            weight={'bold'}
                            size={4}
                        >Make
                            <ResponsiveText color={colors.red}>*</ResponsiveText>
                        </ResponsiveText>
                        <Input
                            placeholder={"eg: Nokia,Toyota,BMW,Maria B etc"}
                            width={wp(90)}
                            height={hp(6.5)}
                            padding={[0, 0, 0, 25]}
                            margin={[15, 0, 5, 15]}
                            backgroundColor={colors.white}
                            onChnageText={(text) => setMake(text)}
                        />
                    </View>
                    <View>
                        <ResponsiveText
                            margin={[10, 0, 0, 15]}
                            color={colors.black}
                            weight={'bold'}
                            size={4}
                        >Price  <ResponsiveText color={colors.red}>*</ResponsiveText>
                        </ResponsiveText>
                        <Input
                         placeholder={"xxxxxxxx"}
                            width={wp(90)}
                            height={hp(6.5)}
                            padding={[0, 0, 0, 25]}
                            margin={[15, 0, 5, 15]}
                            backgroundColor={colors.white}
                            keyboardType={'numeric'}
                            onChnageText={(text) => setPrice(text)}
                        />
                    </View>
                    <View>
                        <ResponsiveText
                            margin={[10, 0, 0, 15]}
                            color={colors.black}
                            weight={'bold'}
                            size={4}
                        >Year
                        <ResponsiveText color={colors.grey1}>(Optional)</ResponsiveText> 
                        </ResponsiveText>
                        <Input
                            placeholder={"xxxxxxx"}
                            width={wp(90)}
                            height={hp(6.5)}
                            padding={[0, 0, 0, 25]}
                            margin={[15, 0, 5, 15]}
                            backgroundColor={colors.white}
                            keyboardType={'numeric'}
                            maxlength={4}
                            onChnageText={(text) => setYear(text)}
                        />
                    </View>
                    <View>
                        <ResponsiveText
                            margin={[10, 0, 0, 15]}
                            color={colors.black}
                            weight={'bold'}
                            size={4}
                        >Contact Number  <ResponsiveText color={colors.red}>*</ResponsiveText>
                        </ResponsiveText>
                        <Input
                            placeholder={"03XX-XXXXXXX"}
                            width={wp(90)}
                            height={hp(6.5)}
                            padding={[0, 0, 0, 25]}
                            margin={[15, 0, 5, 15]}
                            backgroundColor={colors.white}
                            maxlength={11}
                            keyboardType={'numeric'}
                            onChnageText={(text) => setContectNo(text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''))}
                        />
                    </View>
                    <ResponsiveText
                        margin={[10, 0, 0, 15]}
                        color={colors.black}
                        weight={'bold'}
                        size={4}
                    >Condition  <ResponsiveText color={colors.red}>*</ResponsiveText>
                    </ResponsiveText>
                    <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                        <TouchableOpacity
                            onPress={() => setActiveTab('NEW')}
                        >
                            <View style={{
                                borderRadius: 100,
                                backgroundColor: ActiveTab == 'NEW' ? colors.primary : colors.lighterGrey,
                                justifyContent: 'center',
                                height: hp(5),
                                width: hp(12),
                                marginTop: 7


                            }}>
                                <ResponsiveText
                                    margin={[0, 0, 0, 20]}
                                    color={ActiveTab == 'NEW' ? colors.white : colors.black}
                                    // weight={'bold'}
                                    size={4}
                                >NEW
                                </ResponsiveText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setActiveTab('USED')}
                        >
                            <View style={{
                                borderRadius: 100,
                                backgroundColor: ActiveTab == 'USED' ? colors.primary : colors.lightGrey,
                                justifyContent: 'center',
                                height: hp(5),
                                width: hp(12),
                                marginTop: 7,
                                marginLeft: 5,
                            }}>
                                <ResponsiveText
                                    margin={[0, 0, 0, 20]}
                                    color={ActiveTab == 'USED' ? colors.white : colors.black}
                                    // weight={'bold'}
                                    size={4}
                                >USED
                                </ResponsiveText>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <ResponsiveText
                            margin={[10, 0, 0, 15]}
                            color={colors.black}
                            weight={'bold'}
                            size={4}
                        >Describe what you are selling
                            <ResponsiveText color={colors.red}>*</ResponsiveText>
                        </ResponsiveText>
                        <View
                            style={{
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 0,
                                },
                                shadowOpacity: 0.29,
                                shadowRadius: 4.65,

                                elevation: 2,
                                borderRadius: 10,
                                marginTop: 10,

                                backgroundColor: colors.white,
                                marginHorizontal: 20
                            }}
                        >
                            <Input
                                placeholder={"Write Description"}
                                width={wp(90)}
                                height={hp(18)}
                                inputHeight={hp(15)}
                                padding={[0, 0, 0, 25]}
                                margin={[0, 0, 0, 0]}
                                multiline={true}
                                // secureTextEntry
                                onChnageText={(text) => setDescription(text)}
                            // value={ComplaintsText}
                            //   leftIcon={globalPath.Lock}
                            />
                        </View>
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
                </ScrollView>
            </View>
            {loading == true ?
                <Loader />
                :
                null
            }
        </SafeAreaView>
    )
}

export default CraeteAds

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