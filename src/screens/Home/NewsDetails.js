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
import moment from 'moment';

const NewsDetail = ({ navigation, route }) => {
    const item = route.params.item
    console.log('item', item)
    const Data = [
        {
            id: 1,
            url: require('../../assets/icons/event1.png'),
            Date: ' 24 jul-2022',
            Title: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis ',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis ',
        },

        // {
        //     id: 1,
        //     url: require('../../assets/icons/event2.png'),
        //     Month: 'Aug',
        //     Date: '4',
        //     des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
        // },

        // {
        //     id: 1,
        //     url: require('../../assets/icons/event3.png'),
        //     Month: 'Aug',
        //     Date: '14',
        //     des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
        // },

        // {
        //     id: 1,
        //     url: require('../../assets/icons/event1.png'),
        //     Month: 'Sep',
        //     Date: '23',
        //     des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
        // },

        // {
        //     id: 1,
        //     url: require('../../assets/icons/event3.png'),
        //     Month: 'Dec',
        //     Date: '25',
        //     des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
        // },

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
            >News & Events Details
            </ResponsiveText>
            <View style={styles.footer}>
                <ScrollView>
                    <View>

                        <View style={{ flex: 1, marginHorizontal: 10 }}>
                            <ResponsiveText weight={'bold'}size={4} margin={[20, 0, 0, 8]} color={colors.black} >{item.titleName}</ResponsiveText>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon margin={[10, 0, 0, 14]}
                                size={17}
                                source={globalPath.celender}>
                            </Icon>
                            <ResponsiveText weight={'bold'} size={3} margin={[10, 0, 5, 2]} color={colors.grey1} >{moment(item.createdDateTime).format("DD-MMM-YYYY")}</ResponsiveText>
                        </View>
                        <Icon margin={[20, 0, 0, 0]}
                            // size={50}
                            // borderRadius={1}
                            resizeMode={'contain'}
                            height={hp(43)}
                            width={wp(100)}
                            source={{uri:item.fullPath}}>
                        </Icon>
                        <View style={{ flex: 1, marginHorizontal: 10 }}>
                            <ResponsiveText margin={[5, 0, 0, 2]} color={colors.grey1} >{item.description}</ResponsiveText>
                        </View>
                    </View>

                    <View style={{ height: wp(10) }}>

                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default NewsDetail

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