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

const BillType = ({ navigation }) => {
    const Data = [
        {
            id: 1,
            title: 'Electricity',
            url: require('../../assets/icons/electricity.png'),
        },

        {
            id: 1,
            title: 'Gas',
            url: require('../../assets/icons/gas.png'),

        },
        {
            id: 1,
            title: 'Water',
            url: require('../../assets/icons/water.png'),

        },
        {
            id: 1,
            title: 'Tv Cable',
            url: require('../../assets/icons/tv.png'),

        },
        {
            id: 1,
            title: 'Internet',
            url: require('../../assets/icons/internet.png'),

        },
        {
            id: 1,
            title: 'Cleaning',
            url: require('../../assets/icons/cleaning.png'),

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
            >Select Bill Type
            </ResponsiveText>
            <View style={styles.footer}>
                {Data.map((item) => {
                    return (<TouchableOpacity onPress={() => navigation.navigate(routeName.ITEM_LIST,{data:item.title})}>
                        <Card flexDirection={'row'}  style={{margin:5,marginHorizontal:15,top:20}}>
                            <Icon margin={[5, 0, 10, 10]}
                                size={35}

                                source={item.url}>
                            </Icon>
                            <ResponsiveText
                                margin={[15, 0, 0, 20]}
                                color={colors.black1}
                                flex={1}
                            >{item.title}</ResponsiveText>
                            <View style={{
                                width: 40,
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                                borderRadius: 100,
                                backgroundColor: colors.grey7,
                                alignSelf: 'center',
                                // marginTop: 5,

                            }}>
                                <Icon margin={[0, 0, 0, 0]}
                                    size={20}
                                    source={globalPath.Arrow}>
                                </Icon>
                            </View>
                        </Card>
                    </TouchableOpacity>)
                })}

            </View>
        </SafeAreaView>
    )
}

export default BillType

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