import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native'
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
import Api from '../../redux/lib/api'
import urls from '../../redux/lib/urls'
import Loader from "../../components/loader";
import { useDispatch, useSelector } from "react-redux";
import { getSecurityAlert } from "../../redux/actions/user.actions";
import Swipeout from "react-native-swipeout";
import { _toast } from '../../constants/Index'
const SecurityList = ({ navigation }) => {
    const GetSecurityList = useSelector(state => state.userReducers.securityAlert.data,);
    const dispatch = useDispatch();
    const refreshing = useSelector(state => state.userReducers.securityAlert.refreshing);
    const [errorString, setErrorString] = React.useState("");
    const [loading, setLoading] = useState([]);

    console.log('GetSecurityList', GetSecurityList)
    useEffect(() => {
        dispatch(getSecurityAlert());
    }, [])
    const Delete_Notification = (id) => {
        Alert.alert(
            'Security Alert',
            'Do you want to remove this notifaction ?',
            [
                {
                    text: 'Cancel',
                    onPress: () => { },
                    style: 'cancel',
                },
                {
                    text: 'OK',

                    onPress: async () => {
                        console.log(id, "iddddd")
                        // if(item.statusName === 'PreOrder'){
                        try {
                            setLoading(true);
                            const res = await Api.put(urls.Delete_Notification_SOCIETY + id);
                            if (res && res.success == true) {
                                setLoading(false);
                                console.log('response', res)
                                dispatch(getSecurityAlert());
                                _toast("Notifaction delete successfully")
                                // navigation.navigate.goBack()
                            } else {
                                setLoading(false);
                                setErrorString(res.message)
                            }
                        } catch (error) { }
                    },
                },
            ],
        );
    };
    const button_style = (
        <View
            style={{
                alignSelf: 'center',
                backgroundColor: colors.red,
                height: hp(5),
                width: hp(5),
                borderRadius: 30,
                marginRight: 10,
                justifyContent: 'center',
                marginTop: '40%',
                alignItems: 'center',

            }}
        >
            <Icon source={globalPath.del} tintColor={colors.white} />
        </View>
    );
    const read = async (id) => {
        try {
            setLoading(true);
            const res = await Api.put(urls.UPDATE_NOTIFICATIONS + id);
            console.log('NotificationUpdate', res);
            if (res && res.success == true) {
                setLoading(false);
                dispatch(getSecurityAlert());
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
            url: require('../../assets/icons/securityAlert.png'),
            Date: ' 2 hours ago',
            Title: 'Be alert that thieves have entered society',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
        },

        {
            id: 1,
            url: require('../../assets/icons/securityAlert.png'),
            Date: ' 2 hours ago',
            Title: 'Be alert that thieves have entered society',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
        },

        {
            id: 1,
            url: require('../../assets/icons/securityAlert.png'),
            Date: ' 2 hours ago',
            Title: 'Be alert that thieves have entered society',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
        },

        {
            id: 1,
            url: require('../../assets/icons/securityAlert.png'),
            Date: ' 2 hours ago',
            Title: 'Be alert that thieves have entered society',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
        },

        {
            id: 1,
            url: require('../../assets/icons/securityAlert.png'),
            Date: ' 2 hours ago',
            Title: 'Be alert that thieves have entered society',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
        },

        {
            id: 1,
            url: require('../../assets/icons/securityAlert.png'),
            Date: ' 2 hours ago',
            Title: 'Be alert that thieves have entered society',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
        },

        {
            id: 1,
            url: require('../../assets/icons/securityAlert.png'),
            Date: ' 2 hours ago',
            Title: 'Be alert that thieves have entered society',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
        },
        {
            id: 1,
            url: require('../../assets/icons/securityAlert.png'),
            Date: ' 2 hours ago',
            Title: 'Be alert that thieves have entered society',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
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
            >Security Alert
            </ResponsiveText>
            <View style={styles.footer}>
                <ScrollView>
                    {GetSecurityList.length > 0 ?
                        GetSecurityList.map((item) => {
                            return (
                                <Swipeout
                                    autoClose={true}
                                    style={{
                                        marginHorizontal: wp(0),

                                        marginTop: 10,
                                        backgroundColor: colors.white,
                                        // borderColor: colors.black,
                                        marginHorizontal: 10, borderRadius: 5,
                                    }}
                                    right={[
                                        {
                                            component: button_style,
                                            autoClose: true,
                                            backgroundColor: colors.white,
                                            onPress: () => Delete_Notification(item.id)
                                        },
                                    ]}
                                >
                                    <TouchableOpacity
                                        onPress={() => read(item.id)}
                                    >

                                        <View
                                            flexDirection='row' style={{
                                                backgroundColor: item.isRead == false ? colors.lighterGrey : colors.white,
                                                borderRadius: 5,
                                                elevation: 10
                                            }}>
                                            <View style={{
                                                alignItems: 'center',
                                                marginTop: 5,


                                            }}>
                                                <Icon margin={[0, 0, 0, 5]}
                                                    size={50}
                                                    source={require('../../assets/icons/securityAlert.png')}>
                                                </Icon>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <ResponsiveText weight={'bold'} margin={[5, 0, 0, 5]} color={colors.black} >{item.Title}</ResponsiveText>
                                                <ResponsiveText margin={[5, 0, 0, 5]} size={3.2} color={item.isRead == false ? colors.white : colors.secondary} >{item.message}</ResponsiveText>

                                                <View style={{ flexDirection: 'row' }}>
                                                    {/* <Icon margin={[10, 0, 0, 5]}
                                                size={17}
                                                source={globalPath.celender}>
                                            </Icon> */}
                                                    <ResponsiveText size={3} margin={[10, 0, 5, 0]} color={item.isRead == false ? colors.black : colors.grey1} >{item.dateTime}</ResponsiveText>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </Swipeout>
                            )
                        }) : (refreshing == false ?
                            <View style={{ width: wp(100), marginTop: 100, alignItems: 'center', alignSelf: 'center' }}>
                                <Icon borderColor={colors.yellow} borderWidth={0} borderRadius={0} size={250} source={require('../../assets/icons/norecordfound.png')} />
                            </View> : null
                        )}
                    <View style={{ height: wp(10) }}>                              
                    </View>
                </ScrollView>
            </View>
            {refreshing == true ?
                <Loader />
                :
                null
            }
        </SafeAreaView>
    )
}

export default SecurityList

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