import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors } from '../../constants/colorsPallet'
import ChatHeader from '../../components/ChatHeader'
import ResponsiveText from '../../components/RnText'
import Card from '../../components/Card'
import Icon from '../../components/Icon'
import { globalPath } from '../../constants/globalPath'
import Fonts from '../../helpers/Fonts'
import { hp, wp } from '../../helpers/Responsiveness'
import { routeName } from '../../constants/routeName'
import RadioButton from '../../components/RadioButton'
import Input from "../../components/Input";
import PaymentCard from '../../components/PaymentCard'
import Api from '../../redux/lib/api'
import urls from '../../redux/lib/urls'
import Loader from "../../components/loader";
import { ScrollView } from 'react-native-gesture-handler'
import { IsDueDate } from '../../constants/Index'
const PaymentMethod = ({ navigation, route }) => {
    const data = route.params.item;
    console.log('billReferenceId', data)
    const [SelectPaymentMethod, setSelectPaymentMethod] = useState({})
    console.log('first', SelectPaymentMethod)
    const [GetPaymentData, setGetPaymentData] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        GetPaymentMethods();
    }, []);
    const GetPaymentMethods = async (index, item) => {
        try {
            setLoading(true);
            const res = await Api.get(urls.GET_PAYMENT_METHOD);
            console.log('GET_PAYMENT_METHOD', res)
            if (res && res.success == true) {
                setLoading(false);
                setGetPaymentData(res.data);
                setSelectPaymentMethod(res.data[0])
            } else {
                setLoading(false);
                setErrorString(res.message)
            }
        } catch (error) {
            console.error(error);
        }
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
            >Select Payment Method?
            </ResponsiveText>
            <ScrollView>
                <View style={styles.footer}>
                    {/* <Card style={{ marginTop: hp(5), marginHorizontal: wp(3) }}>
                    <ResponsiveText
                        flex={0}
                        weight={'bold'}
                        size={3.5}
                        margin={[10, 10, 0, 10]}
                        color={colors.black}
                    >Payable Amount
                    </ResponsiveText>
                    <View style={{ backgroundColor: colors.lightGrey, height: hp(7), justifyContent: 'center', top: 5, borderRadius: 5 }}>
                        <ResponsiveText
                            flex={0}
                            weight={'bold'}
                            size={3.5}
                            margin={[0, 0, 0, 10]}
                            color={colors.black}
                        >Rs 300
                        </ResponsiveText>
                    </View>
                    <ResponsiveText
                        flex={0}
                        weight={'bold'}
                        size={3.5}
                        margin={[10, 10, 0, 10]}
                        color={colors.black}
                    >Service Charges
                    </ResponsiveText>
                    <View style={{
                        backgroundColor: colors.lightGrey,
                        height: hp(7),
                        justifyContent: 'center',
                        top: 5,
                        borderRadius: 5
                        , marginBottom: 15
                    }}>
                        <ResponsiveText
                            flex={0}
                            weight={'bold'}
                            size={3.5}
                            margin={[0, 0, 0, 10]}
                            color={colors.black}
                        >Rs 50
                        </ResponsiveText>
                    </View>
                </Card> */}

                    <View style={{ top: 10 }}>

                        {GetPaymentData.length > 0 ?
                            GetPaymentData.map((item) => {
                                return (
                                    <PaymentCard
                                        title={item.name}
                                        active={SelectPaymentMethod?.id == item.id}
                                        source={{ uri: item.fullPath }}
                                        Number={item.accountNumber}
                                        onPress={() => setSelectPaymentMethod(item)}
                                    />
                                )
                            }) : null}
                        <View style={{ backgroundColor: colors.primary, alignSelf: 'center' }}>
                            <ResponsiveText margin={[0, 10, 2, 10]} weight={'bold'} size={'4'} color={colors.white} >Instructions To Pay The Balance</ResponsiveText>
                        </View>
                        <View style={{ flex: 1, marginBottom: 20 }}>
                            <ResponsiveText margin={[15, 0, 0, 10]} color={colors.grey1} > To pay their {SelectPaymentMethod?.name}</ResponsiveText>
                            <ResponsiveText margin={[10, 0, 0, 10]} color={colors.grey1} > Please follow this instruction</ResponsiveText>
                            <ResponsiveText margin={[10, 0, 0, 10]} color={colors.grey1} > 1:Open your {SelectPaymentMethod?.name} App</ResponsiveText>
                            <ResponsiveText margin={[10, 0, 0, 10]} color={colors.grey1} > 2:Enter the given Amount </ResponsiveText>
                            <ResponsiveText margin={[10, 0, 0, 10]} color={colors.grey1} > 3:After successfull transaction please </ResponsiveText>
                            <ResponsiveText margin={[5, 0, 0, 15]} color={colors.grey1} >   attech the receipt as a ScreenShot</ResponsiveText>
                        </View>

                    </View>

                    <TouchableOpacity style={styles.timestyle}
                        onPress={() => navigation.navigate(routeName.INVOICE_SCREEN, { item: SelectPaymentMethod, billData: data })}
                    >
                        <ResponsiveText color={colors.white} size={5}>
                            Pay {IsDueDate(data.withinDueDate) ? data.withinBillAmount : data.afterBillAmount} PKR
                        </ResponsiveText>
                    </TouchableOpacity>

                </View>

            </ScrollView>
            {loading == true ?
                <Loader />
                :
                null
            }
        </SafeAreaView>
    )
}

export default PaymentMethod
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
    timestyle: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        justifyContent: "center",
        height: hp(7),
        marginHorizontal: '25%',
        borderWidth: 1.5,
        borderColor: colors.secondary,
        marginBottom: 10,
        alignItems: 'center'
    },

})