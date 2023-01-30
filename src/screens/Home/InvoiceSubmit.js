import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
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
import Invoice from '../../components/Invoice'
import { IsDueDate } from '../../constants/Index'
const InvoiceSubmit = ({ navigation, route }) => {
    const data = route.params.item;
    const billData = route.params.billData;
    console.log('billData submit', billData)

    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <ChatHeader
                // backbutton
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
            >Successfully Paid
            </ResponsiveText>
            <View style={styles.footer}>
                <View style={{ marginTop: '10%' }}>
                    <Card>

                        <Invoice
                            source={globalPath.check}
                            Text={'You have successfully paid'}
                            AmountText={IsDueDate(billData.withinDueDate) ? billData.withinBillAmount : billData.afterBillAmount}
                            Text1={'To'}
                            Text2={data.accountNumber}
                            logo={{ uri: data.fullPath }}
                            logoText={data.name}
                        />
                    </Card>
                </View>
                <View style={{ alignSelf: 'center', }}>
                    <TouchableOpacity style={styles.time}
                        onPress={() => navigation.navigate(routeName.HOME_SCREEN)}
                    >
                        <ResponsiveText color={colors.white} size={5}>
                            OK
                        </ResponsiveText>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default InvoiceSubmit

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
    time: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        justifyContent: "center",
        height: hp(7),
        marginLeft: 10,
        paddingHorizontal: '20%',
        borderWidth: 1.5,
        borderColor: colors.secondary,
        marginBottom: 10,
        alignItems: 'center'
    },
})