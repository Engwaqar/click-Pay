import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../constants/colorsPallet'
import ChatHeader from '../../components/ChatHeader'
import ResponsiveText from '../../components/RnText'
import Card from '../../components/Card'
import Icon from '../../components/Icon'
import { globalPath } from '../../constants/globalPath'
import Fonts from '../../helpers/Fonts'
import { hp, wp } from '../../helpers/Responsiveness'
import { routeName } from '../../constants/routeName'
import Loader from "../../components/loader";
import Api from '../../redux/lib/api'
import urls from '../../redux/lib/urls'
import moment from 'moment';
const PaymentHistory = ({ navigation }) => {
    const [loading, setLoading] = useState([]);
    const [errorString, setErrorString] = React.useState("");
    const [PaymentHis, setPaymentHis] = React.useState([]);
    console.log('PaymentHis', PaymentHis)
    useEffect(() => {
        GetBillPaymentsAll();
    }, []);
    const GetBillPaymentsAll = async (index, item) => {
        try {
            setLoading(true);
            const res = await Api.get(urls.GET_TRANSACTION_HISTORY);
            console.log('GetSocietyEventsAll', res);
            if (res && res.success == true) {
                setLoading(false);
                setPaymentHis(res.data);
            } else {
                setLoading(false);
                setErrorString(res.message)
            }
        } catch (error) {
            console.error(error);

        }
    };
    const Data = [
        {
            id: 1,
            title: 'Electricity',
            url: require('../../assets/icons/electricity.png'),
            Ref: 'UD/AA/123654',
            Amount: '20,900',
            Date: '01 jul-2020',
            Method: 'JazzCash',
        },

        {
            id: 1,
            title: 'Gas',
            url: require('../../assets/icons/gas.png'),
            Ref: 'UD/AA/123654',
            Amount: '19,900',
            Date: '01 jul-2020',
            Method: 'Mazaan Bank',
        },
        {
            id: 1,
            title: 'Water',
            url: require('../../assets/icons/water.png'),
            Ref: 'UD/AA/123654',
            Amount: '9,900',
            Date: '01 jul-2020',
            Method: 'Hbl Bank',
        },
        {
            id: 1,
            title: 'Tv Cable',
            url: require('../../assets/icons/tv.png'),
            Ref: 'UD/AA/123654',
            Amount: '12,900',
            Date: '03 jul-2020',
            Method: 'Allied Bank',
        },
        {
            id: 1,
            title: 'Internet',
            url: require('../../assets/icons/internet.png'),
            Ref: 'UD/AA/123654',
            Amount: '17,900',
            Date: '08 jul-2020',
            Method: 'Easypassa',
        },
        {
            id: 1,
            title: 'Cleaning',
            url: require('../../assets/icons/cleaning.png'),
            Ref: 'UD/AA/123654',
            Amount: '15,900',
            Date: '05 jul-2020',
            Method: 'JazzCash',
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
                margin={[15, 0, 5, 15]}
                color={colors.textColor}
                weight={'bold'}
                size={4}
            >Transactions History
            </ResponsiveText>
            <View style={styles.footer}>
                <ScrollView>
                    {PaymentHis.length > 0 ?
                        PaymentHis.map((item) => {
                            return (
                                <Card flexDirection='row' style={{ margin: 5, marginHorizontal: 15, top: 20 }}>
                                    <Icon margin={[0, 0, 0, 0]}
                                        size={50}
                                        source={item.billTitle == 'Electricity' ? globalPath.ElectricityImg : item.billTitle == 'Internet' ? globalPath.InternetImg : item.billTitle == 'Gas' ? globalPath.SNGPLImg : item.billTitle == 'Water' ? globalPath.water : item.billTitle == 'Cable' ? globalPath.CleaningImg : null}>
                                    </Icon>
                                    <View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <ResponsiveText margin={[0, 0, 0, 10]} flex={1} size={4.2} weight={'bold'} color={colors.blue3} >{item.billTitle}</ResponsiveText>
                                            <ResponsiveText margin={[0, 10, 0, 0]} weight={'bold'} color={colors.green} >Rs:{item.amount}</ResponsiveText>
                                        </View>
                                        <ResponsiveText margin={[0, 0, 5, 10]} color={colors.grey1}>........................................................................</ResponsiveText>

                                        <View style={{ flexDirection: 'row' }}>

                                            <View style={{ flex: 1 }}>
                                                <ResponsiveText weight={'bold'} color={colors.black} >Trns Ref</ResponsiveText>
                                                <ResponsiveText margin={[0, 0, 0, 0]} color={colors.grey1} >{item.transationReference}</ResponsiveText>
                                            </View>
                                            <View style={{ flex: 1.2 }}>
                                                <ResponsiveText margin={[0, 0, 0, 10]} weight={'bold'} color={colors.black}>Paid Date</ResponsiveText>
                                                <ResponsiveText margin={[0, 0, 0, 0]} color={colors.grey1}>{moment(item.createdDateTime).format("M/DD/YYYY")}</ResponsiveText>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <ResponsiveText margin={[0, 0, 0, 0]} weight={'bold'} color={colors.black}  >Method</ResponsiveText>
                                                <ResponsiveText margin={[0, 0, 0, 0]} color={colors.grey1} >{item.paidMathod}</ResponsiveText>
                                            </View>

                                        </View>
                                    </View>
                                </Card>)
                        }) : (loading == false ?
                            <View style={{ width: wp(100), marginTop: 100, alignItems: 'center', alignSelf: 'center' }}>
                                <Icon borderColor={colors.yellow} borderWidth={0} borderRadius={0} size={250} source={require('../../assets/icons/norecordfound.png')} />
                            </View> : null
                        )}
                    <View style={{ height: wp(10) }}>

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

export default PaymentHistory
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