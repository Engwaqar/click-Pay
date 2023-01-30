import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { globalPath } from "../../constants/globalPath";
import ResponsiveText from '../../components/RnText'
import { colors } from "../../constants/colorsPallet";
import { hp, wp } from "../../helpers/Responsiveness";
import Input from "../../components/Input";
import ImagePicker from "react-native-image-crop-picker";
import Card from '../../components/Card';
import RnButton from "../../components/RnButton";
import { routeName } from '../../constants/routeName'
import ChatHeader from '../../components/ChatHeader';
import { ScrollView } from 'react-native-gesture-handler';
import urls from '../../redux/lib/urls';
import Api from '../../redux/lib/api';
import Loader from "../../components/loader";
import { _toast } from '../../constants/Index'
import { IsDueDate} from '../../constants/Index'

const InvoiceScreen = ({ navigation, route }) => {
    const data = route.params.item;
    const billData = route.params.billData;

    console.log('billData', billData)
    const [singleFile, setSingleFile] = useState(null);
    const [TransationReference, setTransationReference] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorString, setErrorString] = React.useState("");
    const submitData = async type => {
        setErrorString('');
        if (TransationReference === "") {
            setErrorString("*Ref Id Required*")
        }
        else if (singleFile === null) {
            setErrorString("*Receipt ScreenShot is Required*")
        }
        else {
            var formdata = new FormData();
            formdata.append("PaidMathod", data.name);
            formdata.append("BillId", billData.id);
            formdata.append("TransationReference", TransationReference);
            formdata.append("ImageData", {
                uri: singleFile?.path,
                type: 'image/jpeg',
                name: 'photo.jpg',
            })

            console.log('obj', formdata)
            try {
                setLoading(true);
                const res = await Api.post(urls.ADD_BILL_PAYMENT, formdata);
                console.log('resfff', res)
                if (res && res.success == true) {
                    navigation.replace(routeName.INVOICE_SUBMIT, { item: data, billData: billData })
                    setLoading(false);
                    _toast("Payment successfully Submitted")
                    // dispatch(getProfile());
                    setTransationReference('')
                    setSingleFile(null)
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
            >Paid Bills
            </ResponsiveText>
            <View style={styles.footer}>
                <ScrollView>
                    <View style={[styles.middle_images,]}
                    >
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                source={globalPath.invoice}
                                style={{
                                    height: hp(10),
                                    width: hp(40),
                                    resizeMode: "contain",
                                }}
                            />
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <ResponsiveText
                                flex={0}
                                // weight={'bold'}
                                size={5}
                                margin={[0, 0, 0, 10]}
                                color={colors.grey5}
                            >Do you want to pay  </ResponsiveText>

                            <ResponsiveText
                                flex={0}
                                weight={'bold'}
                                size={6}
                                margin={[10, 10, 0, 10]}
                                color={colors.primary}
                                
                            >Rs.{IsDueDate(billData.withinDueDate) ? billData.withinBillAmount : billData.afterBillAmount}
                            </ResponsiveText>
                            <ResponsiveText
                                flex={0}
                                weight={'bold'}
                                size={3.5}
                                margin={[10, 10, 0, 10]}
                                color={colors.grey5}
                            >To
                            </ResponsiveText>
                            <ResponsiveText
                                flex={0}
                                weight={'bold'}
                                size={3.5}
                                margin={[10, 10, 0, 10]}
                                color={colors.grey5}
                            >This Number: {data.accountNumber}
                            </ResponsiveText>
                            <Input
                                placeholder={"Enter Ref Id"}
                                width={wp(90)}
                                height={hp(6.5)}
                                padding={[0, 0, 0, 25]}
                                margin={[30, 0, 5, 0]}
                                backgroundColor={colors.white}
                                onChnageText={(text) => setTransationReference(text)}
                                leftIcon={globalPath.Mobile}
                                keyboardType={'numeric'}
                                value={TransationReference}
                            />
                            <Card>
                                <ResponsiveText
                                    weight={'bold'}
                                    size={4}
                                    color={colors.black}
                                    textAlign={'center'}
                                    margin={[10, 0, 0, 0]}
                                >Receipt ScreenShot<ResponsiveText color={colors.red}>*</ResponsiveText></ResponsiveText>
                                <TouchableOpacity
                                    onPress={() => toggel(setSingleFile)}>
                                    <Card style={{
                                        borderWidth: 1, borderColor: colors.grey1, height: hp(15), width: wp(70), marginTop: hp(2), alignItems: 'center', justifyContent: 'center'

                                    }}>
                                        {singleFile ?
                                            <Image
                                                source={
                                                    singleFile == null
                                                        ? globalPath.Camera
                                                        : { uri: singleFile.path }
                                                }
                                                style={{
                                                    borderRadius: 10,
                                                    height: wp(26),
                                                    width: wp(69),
                                                    resizeMode: 'contain',
                                                    backgroundColor: colors.white,
                                                    alignSelf: 'center',
                                                    // marginTop: 30,
                                                }}
                                            />
                                            : <Image
                                                source={
                                                    singleFile == null
                                                        ? globalPath.Camera
                                                        : { uri: singleFile.path }
                                                }
                                                style={{
                                                    borderRadius: 10,
                                                    height: wp(10),
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
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    source={{ uri: data.fullPath }}
                                    style={{
                                        marginTop: 13,
                                        height: hp(5),
                                        width: hp(8),
                                        resizeMode: "contain",
                                    }}
                                />
                                <ResponsiveText
                                    flex={0}
                                    weight={'bold'}
                                    size={5}
                                    margin={[20, 10, 0, 10]}
                                    color={colors.grey5}
                                >{data.name}
                                </ResponsiveText>
                            </View>
                        </View>

                    </View>
                    <ResponsiveText color={colors.red} textAlign={'center'} margin={[10, 0, 0, 10]}>{errorString}</ResponsiveText>
                    <View style={{ marginHorizontal: '20%', marginBottom: '5%' }}>
                        <RnButton
                            onPress={() => submitData()}
                            backgroundColor={colors.primary}
                            margin={[20, 0, 0, 0]}
                            title={"Save"}
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

export default InvoiceScreen

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
        justifyContent: 'space-between'
    },
    middlebar: {
        flexDirection: "row",
        backgroundColor: colors.red,

        // alignItems: "center",
        padding: 10,
        // borderTopRightRadius: 25,
        paddingHorizontal: hp(1),
        // alignSelf: "center",
        marginVertical: 10
    },
    Middle_Text: {
        fontSize: 11,
        fontWeight: "bold",
        marginTop: 0,
        textAlign: "center",
        color: colors.red,
    },

    middle_images: {
        alignSelf: 'center',
        marginVertical: '2%'

    },



})