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
import Complain from '../../components/Complain'

const ComplaintSubmitted = ({ navigation }) => {
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
            >Confirmation
            </ResponsiveText>
            <View style={styles.footer}>
                <View style={{ marginTop: '10%' }}>

                    <Card>
                        <Complain
                            source={globalPath.check}
                            Text={'Complaint Submitted'}
                            AmountText={'Thank you for contacting us.We will soon look into the matter.'}
                            Text1={'To'}
                            Text2={'Babar Azam'}
                            EmailId={'Email Id:'}
                            Email={'Babar@gmail.com'}
                            Mobile={'Mobile No:'}
                            MobileNo={'9123456780'}
                        />
                    </Card>

                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: '10%' }}>
                        <TouchableOpacity style={styles.timestyle}
                           onPress={() => navigation.navigate(routeName.HOME_SCREEN)}
                        >
                            <ResponsiveText color={colors.white} size={5}>
                                OK
                            </ResponsiveText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ComplaintSubmitted

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
        paddingHorizontal: '15%',
        borderWidth: 1.5,
        borderColor: colors.secondary,
        marginBottom: 10,
        alignItems: 'center'
    },
    time: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        justifyContent: "center",
        height: hp(7),
        marginLeft: 10,
        paddingHorizontal: '10%',
        borderWidth: 1.5,
        borderColor: colors.secondary,
        marginBottom: 10,
        alignItems: 'center'
    },
})