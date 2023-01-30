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
import { TextProfile } from '../../components/TextProfile'
import urls from '../../redux/lib/urls'
import Api from '../../redux/lib/api'
import Loader from "../../components/loader";
import { getProfile } from '../../redux/actions/user.actions'
import { useDispatch, useSelector } from "react-redux";
const DetailsScreen = ({ navigation, route }) => {
    const id = route.params.item
    console.log('Detail Screen', id)
    const [Detail, setDetail] = useState([]);
    const [loading, setLoading] = useState([]);
    const dispatch = useDispatch();
    const GetUserProfile = useSelector(state => state.userReducers.profileData.data,);
    console.log('Detail', id)

    useEffect(() => {
        GetAllbillDetail();
        dispatch(getProfile());
    }, []);
    const GetAllbillDetail = async (index, item) => {
        try {
            setLoading(true);
            const res = await Api.get(urls.GET_BILLS_DETAILS + GetUserProfile.houseId + '?billid=' + id);
            console.log('All Bills detail', res);
            if (res && res.success == true) {
                setLoading(false);
                setDetail(res.data[0]);
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
            <View style={{ alignItems: 'center' }}>
                <Icon margin={[5, 0, 10, 10]}
                    size={170}
                    // source={globalPath.cpLogo}>
                    // source={globalPath.citilogo2}
                    // source={globalPath.AskariDetaillogo}
                    // source={globalPath.SuiGasSplash}
                    // source={globalPath.PunjabLogo}
                    // source={globalPath.ParkViewInner}
                    // source={globalPath.StateLifeInner}
                    // source={globalPath.NLCdetaillogo}
                    source={globalPath.Clicksplashlogo}


                >

                </Icon>
            </View>
            <ScrollView>
                <View style={styles.footer}>
                    {/* <View style={{ flexDirection: 'row', marginTop: 15, marginHorizontal: 10 }}>
                        <View style={{ flex: 1, }}>
                            <Card>
                                <ResponsiveText margin={[0, 0, 0, 0]} textAlign={'center'} weight={'bold'} color={colors.black}>Name</ResponsiveText>
                                <ResponsiveText margin={[0, 0, 10, 0]} textAlign={'center'} weight={'bold'} color={colors.secondary}>{Detail.ownerName}</ResponsiveText>

                            </Card>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Card>
                                <ResponsiveText margin={[0, 0, 0, 0]} textAlign={'center'} weight={'bold'} color={colors.black}>House#:</ResponsiveText>
                                <ResponsiveText margin={[0, 0, 10, 0]} textAlign={'center'} weight={'bold'} color={colors.secondary}>{Detail.houseNo}</ResponsiveText>

                            </Card>
                        </View>
                    </View> */}
                    <Card>
                        <View style={{ flexDirection: 'row', marginTop: 10, borderBottomWidth: 1, borderBottomColor: colors.lightWhite }}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Name'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={Detail.ownerName}
                                    color={colors.grey1}
                                    size={3.2}

                                />
                            </View>
                        </View>
                        <View style={styles.Text3}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='House#:'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={Detail.houseNo}
                                    color={colors.grey1}
                                    size={3.2}

                                />
                            </View>
                        </View>
                        <View style={styles.Text3}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Block#:'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={Detail.blockName}
                                    color={colors.grey1}
                                    size={3.2}

                                />
                            </View>
                        </View>
                        <View style={styles.Text3}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Meter No.'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={Detail.meterNo}
                                    color={colors.grey1}
                                    size={3.2}

                                />
                            </View>
                        </View>
                        <View style={styles.Text3}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Meter Type'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={Detail.meterType}
                                    color={colors.grey1}
                                    size={3.2}

                                />
                            </View>
                        </View>
                        <View style={styles.Text3}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Conn.Date'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={Detail.connectionDate}
                                    color={colors.grey1}
                                    size={3.2}

                                />
                            </View>
                        </View>
                        <View style={styles.Text3}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Bill Month'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={Detail.billMonth}
                                    color={colors.grey1}
                                    size={3.2}

                                />
                            </View>
                        </View>
                        <View style={styles.Text3}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Reading Date'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={"6-JuL-2020 Dumy"}
                                    color={colors.grey1}
                                    size={3.2}

                                />
                            </View>
                        </View>
                        <View style={styles.Text3}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Issue Date'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={Detail.withinDueDate}
                                    color={colors.grey1}
                                    size={3.2}

                                />
                            </View>
                        </View>
                        <View style={styles.Text3}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Due Date'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={Detail.withinDueDate}
                                    color={colors.grey1}
                                    size={3.2}

                                />
                            </View>
                        </View>
                        <View style={styles.Text3}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Previous Reading'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={Detail.previousReading}
                                    color={colors.grey1}
                                    size={3.2}

                                />
                            </View>
                        </View>
                        <View style={styles.Text3}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Current Reading'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={Detail.currentReading}
                                    color={colors.grey1}
                                    size={3.2}

                                />
                            </View>
                        </View>
                        <View style={styles.Text4}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Unit Consumed'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={Detail.unitConsumed}
                                    color={colors.grey1}
                                    size={3.2}

                                />
                            </View>
                        </View>
                    </Card>
                    <Card>
                        <View style={styles.Text4}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Current Bill'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={Detail.withinBillAmount}
                                    color={colors.grey1}
                                    size={3.2}

                                />
                            </View>
                        </View>
                        <View style={styles.Text4}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Previous Bills'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={"0 Dummy"}
                                    color={colors.grey1}
                                    size={3.2}

                                />
                            </View>
                        </View>
                        <View style={styles.Text4}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Payable within Due Date'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={Detail.withinBillAmount}
                                    color={colors.grey1}
                                    size={3.2}

                                />
                            </View>
                        </View>
                        <View style={styles.Text4}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Payable After Due Date'
                                    color={colors.red}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={Detail.afterBillAmount}
                                    color={colors.grey1}
                                    size={3.2}

                                />
                            </View>
                        </View>
                    </Card>
                    <TouchableOpacity disabled={Detail.billStatus == "Paid"} style={[styles.timestyle, { backgroundColor: Detail.billStatus == "Paid" ? colors.lighterGrey : colors.primary }]}
                        onPress={() => navigation.navigate(routeName.PAYMENT_METHOD, { item: Detail })}
                    >
                        <ResponsiveText weight={'bold'} color={Detail.billStatus == "Paid" ? colors.grey1 : colors.white} size={5}>
                            {Detail.billStatus == "Paid" ? 'Paid' : 'Pay Now'}
                        </ResponsiveText>
                    </TouchableOpacity>
                    <View style={{ height: hp(2) }}>

                    </View>
                    {loading == true ?
                        <Loader />
                        :
                        null
                    }
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default DetailsScreen;
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
    },
    timestyle: {

        borderRadius: 5,
        justifyContent: "center",
        height: hp(7),
        marginHorizontal: '25%',
        borderWidth: 1.5,
        borderColor: colors.secondary,
        marginTop: 5,
        alignItems: 'center'
    },
    Text: {
        flex: 1,
        justifyContent: "center",
        paddingLeft: '5%'
    },
    Text2:
    {
        flex: 0.7,
        justifyContent: "center",
        padding: 5
    },
    Text3: {
        flexDirection: 'row',
        marginTop: 4,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightWhite
    },
    Text4: {
        flexDirection: 'row',
        marginTop: 4,
    },
})