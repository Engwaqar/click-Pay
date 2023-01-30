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

const EventList = ({ navigation }) => {
    const [loading, setLoading] = useState([]);
    const [errorString, setErrorString] = React.useState("");
    const [EventAll, setEventAll] = React.useState([]);

    useEffect(() => {
        GetSocietyEventsAll();
    }, []);
    const GetSocietyEventsAll = async (index, item) => {
        try {
            setLoading(true);
            const res = await Api.get(urls.GET_SOCIETY_EVENTS+1);
            console.log('GetSocietyEventsAll', res);
            if (res && res.success == true) {
                setLoading(false);
                setEventAll(res.data);
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
            url: require('../../assets/icons/event1.png'),
            Month: 'jul',
            Date: '24',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
        },

        {
            id: 1,
            url: require('../../assets/icons/event2.png'),
            Month: 'Aug',
            Date: '4',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
        },

        {
            id: 1,
            url: require('../../assets/icons/event3.png'),
            Month: 'Aug',
            Date: '14',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
        },

        {
            id: 1,
            url: require('../../assets/icons/event1.png'),
            Month: 'Sep',
            Date: '23',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
        },

        {
            id: 1,
            url: require('../../assets/icons/event3.png'),
            Month: 'Dec',
            Date: '25',
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
            >News & Events
            </ResponsiveText>
            <View style={styles.footer}>
                <ScrollView>
                    {EventAll.length > 0 ?
                        EventAll.map((item) => {
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate(routeName.NEWS_DETAILS, { item: item })}>
                                    <Card style={{ margin: 5, marginHorizontal: 15, top: 20 }}>
                                        <Icon margin={[0, 0, 0, 0]}
                                            // size={50}
                                            resizeMode={'contain'}
                                            height={wp(42)}
                                            width={wp(89)}
                                            source={{ uri: item.fullPath }}>
                                        </Icon>
                                        <View>
                                            <View style={{ flexDirection: 'row' }}>

                                                <View style={{
                                                    flex: 0.2,
                                                    backgroundColor: colors.blue,
                                                    height: hp(7),
                                                    width: wp(13),
                                                    alignItems: 'center',
                                                    marginTop: 5,
                                                    marginLeft: 5,
                                                    borderRadius: 5,
                                                }}>
                                                    <ResponsiveText weight={'bold'} color={colors.white} >{moment(item.createdDateTime).format("MMM")}</ResponsiveText>
                                                    <ResponsiveText weight={'bold'} size={5} color={colors.white} >{moment(item.createdDateTime).format("DD")}</ResponsiveText>
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                    <ResponsiveText weight={'bold'} margin={[5, 0, 0, 5]} color={colors.black} >{item.titleName}</ResponsiveText>
                                                    <ResponsiveText weight={'bold'} size={2.9} margin={[5, 0, 5, 5]} color={colors.grey1} >{item.description}</ResponsiveText>
                                                </View>

                                            </View>
                                        </View>
                                    </Card>
                                </TouchableOpacity>
                            )
                        }) : (loading == false ?
                            <View style={{ width: wp(100), marginTop: 100, alignItems: 'center', alignSelf: 'center' }}>
                                <Icon borderColor={colors.yellow} borderWidth={0} borderRadius={0} size={250} source={require('../../assets/icons/norecordfound.png')} />
                            </View> : null
                        )}
                    <View style={{ height: wp(10) }}>

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

export default EventList

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