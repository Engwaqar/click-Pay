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

const AddBuyProduct = ({ navigation }) => {
    const [loading, setLoading] = useState([]);
    const [errorString, setErrorString] = React.useState("");
    const [Price, setPrice] = useState('');
    const [ContectNo, setContectNo] = useState('');
    const [Addtitle, setAddtitle] = useState('');
    const [Description, setDescription] = useState('');

    const submitData = async type => {
        setErrorString('');
        if (Addtitle === "") {
            setErrorString("*Title require*")
        }

        else if (Price === "") {
            setErrorString("*Price require*")
        }

        else if (ContectNo === "" && ContectNo < 11) {
            setErrorString("*Contect Number require*")
        }

        else if (Description === "") {
            setErrorString("*Description require*")
        }
        else {
            // var formdata = new FormData();
            // formdata.append("AdTitle", Addtitle);
            // formdata.append("Price", Price);
            // formdata.append("ContactNo", ContectNo);
            // formdata.append("Description", Description);
            // // formdata.append("ImageData", JSON.stringify(imgs))
            var Obj = {
                "adTitle": Addtitle,
                "priceRange": Price,
                "contactNumber": ContectNo,
                "describe": Description
            }
            console.log('obj', Obj)
            try {
                setLoading(true);
                const res = await Api.post(urls.WANT_TO_BUY, Obj);
                console.log('resfff', res)
                if (res && res.success == true) {
                    console.log('res', res.success)
                    navigation.navigate(routeName.HOME_SCREEN)
                    setLoading(false);
                    _toast("Add Product successfully")
                    setPrice('')
                    setContectNo('')
                    setAddtitle('')
                    setDescription('')

                } else {
                    setLoading(false);
                    setErrorString(res.message)
                }
            } catch (error) {
                console.error('okokokoo error', error);
            }
        }
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

            <ResponsiveText
                margin={[15, 0, 5, 15]}
                color={colors.textColor}
                weight={'bold'}
                size={4}
            >Want Product
            </ResponsiveText>
            <View style={styles.footer}>
                <ScrollView>

                    <View >
                        <ResponsiveText
                            margin={[10, 0, 0, 15]}
                            color={colors.black}
                            weight={'bold'}
                            size={4}
                        >Ad Title  <ResponsiveText color={colors.red}>*</ResponsiveText>
                        </ResponsiveText>
                        <Input
                            placeholder={"Title"}
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
                            margin={[10, 0, 0, 15]}
                            color={colors.black}
                            weight={'bold'}
                            size={4}
                        >Price Range  <ResponsiveText color={colors.red}>*</ResponsiveText>
                        </ResponsiveText>
                        <Input
                            placeholder={"xxxx-xxxx"}
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
                        >Contect Number  <ResponsiveText color={colors.red}>*</ResponsiveText>
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
                            onChnageText={(text) => setContectNo(text.replace(/[^0-9- #*;,.<>\{\}\[\]\\\/]/gi, ''))}
                            value={ContectNo}
                        />
                    </View>

                    <View>
                        <ResponsiveText
                            margin={[10, 0, 0, 15]}
                            color={colors.black}
                            weight={'bold'}
                            size={4}
                        >Describe what  are you want?
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
                                //  secureTextEntry
                                onChnageText={(text) => setDescription(text)}
                            // value={ComplaintsText}
                            //   leftIcon={globalPath.Lock}
                            />
                        </View>
                    </View>
                    <ResponsiveText color={colors.red} textAlign={'center'} margin={[20, 0, 0, 10]}>{errorString}</ResponsiveText>
                    <View style={{ marginHorizontal: '20%', marginTop: '10%' }}>
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

export default AddBuyProduct

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