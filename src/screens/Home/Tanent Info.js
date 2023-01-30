import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
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
const TanentInfo = ({ navigation, route }) => {
    const data = route.params.item
    console.log('first', data)
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
                    source={globalPath.NLCdetaillogo}

                >
                </Icon>
            </View>
            <ScrollView>
                <View style={styles.footer}>

                    {/* <Card> */}
                    <View style={{ backgroundColor: colors.lighterGrey, marginHorizontal: 15, marginTop: '5%', borderRadius: 5 }}>
                        <ResponsiveText
                            margin={[5, 0, 10, 15]}
                            color={colors.black}
                            weight={'bold'}
                            size={4}
                        >Tenant Detail Information:
                        </ResponsiveText>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: '8%' }}>
                        <View style={styles.Text}>
                            <TextProfile

                                Title='Tenant Name.'
                                color={colors.black}
                                size={4}
                                weight={'bold'}

                            />
                        </View>
                        <View style={styles.Text2}>
                            <TextProfile

                                Title={data.name}
                                color={colors.grey1}
                                size={3.2}

                            />
                        </View>
                    </View>
                    <View style={styles.Text3}>
                        <View style={styles.Text}>
                            <TextProfile

                                Title='Mobile Number'
                                color={colors.black}
                                size={4}
                                weight={'bold'}

                            />
                        </View>
                        <View style={styles.Text2}>
                            <TextProfile

                                Title={data.mobileNo}
                                color={colors.grey1}
                                size={3.2}

                            />
                        </View>
                    </View>
                    <View style={styles.Text4}>
                        <View style={styles.Text}>
                            <TextProfile

                                Title='Address'
                                color={colors.black}
                                size={4}
                                weight={'bold'}

                            />
                        </View>
                        <View style={styles.Text2}>
                            <TextProfile

                                Title={"Punjab Housing Society"}
                                color={colors.grey1}
                                size={3.2}

                            />
                        </View>
                    </View>
                    <View style={styles.Text3}>
                        <View style={styles.Text}>
                            <TextProfile

                                Title='Floor'
                                color={colors.black}
                                size={4}
                                weight={'bold'}

                            />
                        </View>
                        <View style={styles.Text2}>
                            <TextProfile

                                Title={data.floor}
                                color={colors.grey1}
                                size={3.2}

                            />
                        </View>
                    </View>
                    <View style={styles.Text3}>
                        <View style={styles.Text}>
                            <TextProfile

                                Title='CNIC'
                                color={colors.black}
                                size={4}
                                weight={'bold'}

                            />
                        </View>
                        <View style={styles.Text2}>
                            <TextProfile

                                Title={data.cnic}
                                color={colors.grey1}
                                size={3.2}

                            />
                        </View>
                    </View>
                    {/* </Card> */}
                    {/* <TouchableOpacity style={styles.timestyle}
                        onPress={() => navigation.navigate(routeName.PAYMENT_METHOD)}
                    >
                        <ResponsiveText color={colors.white} size={5}>
                            Pay Now
                        </ResponsiveText>
                    </TouchableOpacity> */}
                    <View style={{ height: hp(2) }}>

                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default TanentInfo;
const styles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: colors.secondary,
    },
    footer: {
        flex: 0,
        backgroundColor: colors.lightWhite,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    timestyle: {
        backgroundColor: colors.primary,
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
        // borderBottomWidth: 1,
        borderBottomColor: colors.lightWhite
    },
    Text4: {
        flexDirection: 'row',
        marginTop: 4,
    },
})