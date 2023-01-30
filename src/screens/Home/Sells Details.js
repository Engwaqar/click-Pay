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
import Swiper from "../../components/Swiper";
import moment from 'moment';
import urls from '../../redux/lib/urls'
import Api from '../../redux/lib/api'
import { _toast } from '../../constants/Index'
import { getFavorite } from '../../redux/actions/user.actions'
import Loader from "../../components/loader";
import { useDispatch, useSelector } from "react-redux";
const SellsDetails = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [errorString, setErrorString] = React.useState("");
    const [loading, setLoading] = useState([]);

    const item = route.params.item
    console.log('item', item)
    console.log('first', item.objListSalePurchaseImagesDto)

    const AdFavourites = async () => {
        var obj = {
            "id": 0,
            "userSalePurchaseId": item.id,
        }
        try {
            setLoading(true);
            const res = await Api.post(urls.ADD_FAVORITE_PRODUCT, obj);
            console.log('Like', res)
            if (res && res.success == true) {
                // navigation.goBack()
                _toast("Like")
                dispatch(getFavorite());
                setLoading(false);
            } else {
                setLoading(false);
                setErrorString(res.message)
            }
        } catch (error) {
            console.error(error);
        }
    }
    const RemoveAdFromFavourites = async () => {

        try {
            setLoading(true);
            const res = await Api.delete(urls.REMOVE_FAVORITE + item.favouriteId);
            console.log('Unlike ', res)
            if (res && res.success == true) {
                //   navigation.goBack()
                _toast("Unlike")
                dispatch(getFavorite());
                setLoading(false);
            } else {
                setLoading(false);
                setErrorString(res.message)
            }
        } catch (error) {
            console.error(error);
        }
    }
    const Data = [
        {
            id: 1,
            url: require('../../assets/icons/event1.png'),
            Date: ' 24 jul-2022',
            Title: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis ',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis ',
        },

    ];
    const arr = [
        require('../../assets/icons/pbanner.png'),
        require('../../assets/icons/banner.jpg'),

    ]
    const bannerData = () => {
        var array = []
        var data = item.objListSalePurchaseImagesDto[0]
        Object.keys(data).forEach(function (key, index) {
            array.push({ fullPath: data[key] })

        });
        console.log('array', array)
        return array
    }
    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <ChatHeader
                backbutton
                notifaction={globalPath.notifaction}
                value={'1'}
                user={globalPath.user}
                navigation={navigation}
            />

            {/* <ResponsiveText
                margin={[15, 0, 5, 15]}
                color={colors.yellow1}
                weight={'bold'}
                size={5}
            >News & Events Details
            </ResponsiveText> */}
            <View style={styles.footer}>
                <ScrollView>
                    <View>
                        <View style={styles.advertisementBanner}>
                            <Swiper data={bannerData()} />
                        </View>
                        <Card style={{ marginHorizontal: 20 }}>

                            <View style={styles.Des}>
                                <TextProfile

                                    Title={item.des}
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <TouchableOpacity onPress={() => {
                                item.isLike = !item.isLike
                                if (item.isLike) {
                                    AdFavourites()

                                } else {
                                    RemoveAdFromFavourites()

                                }
                            }} >
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Icon margin={[0, 10, 0, 0]}
                                        size={30}
                                        source={item.isLike ? globalPath.Heart : globalPath.E_heart}>
                                    </Icon>
                                </View>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', }}>
                                <View style={styles.Text}>
                                    <TextProfile
                                        Title={'Rs: ' + '' + item.price}
                                        color={colors.black}
                                        size={4}
                                        weight={'bold'}
                                    />
                                </View>

                                <View style={styles.Text2}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon margin={[0, 2, 0, 0]}
                                            size={17}
                                            source={globalPath.celender}>
                                        </Icon>
                                        <TextProfile

                                            Title={moment(item.createdDateTime).format("MM/DD/YY")}
                                            color={colors.black}
                                            size={3.2}
                                        />
                                    </View>
                                </View>
                            </View>
                            {/* <View style={{ flexDirection: 'row', }}>
                                <View style={styles.Des}>
                                    <TextProfile

                                        Title='Details'
                                        color={colors.black}
                                        size={4}
                                        weight={'bold'}

                                    />
                                </View>

                            </View> */}
                            {item.year ?
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={styles.Text}>
                                        <TextProfile

                                            Title='Year'
                                            color={colors.black}
                                            size={4}
                                            weight={'bold'}

                                        />
                                    </View>
                                    <View style={styles.Text2}>
                                        <TextProfile

                                            Title={item.year}
                                            color={colors.black}
                                            size={3.2}
                                        />
                                    </View>
                                </View>
                                : null}
                            <View style={{ flexDirection: 'row', }}>
                                <View style={styles.Text}>
                                    <TextProfile

                                        Title='Make'
                                        color={colors.black}
                                        size={4}
                                        weight={'bold'}
                                    />
                                </View>
                                <View style={styles.Text2}>
                                    <TextProfile

                                        Title={item.make}
                                        color={colors.black}
                                        size={3.2}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <View style={styles.Text}>
                                    <TextProfile

                                        Title='Condition'
                                        color={colors.black}
                                        size={4}
                                        weight={'bold'}
                                    />
                                </View>
                                <View style={styles.Text2}>
                                    <TextProfile

                                        Title={item.condition}
                                        color={colors.black}
                                        size={3.2}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <View style={styles.Text}>
                                    <TextProfile

                                        Title='Contact No'
                                        color={colors.black}
                                        size={4}
                                        weight={'bold'}
                                    />
                                </View>
                                <View style={styles.Text2}>
                                    <TextProfile

                                        Title={item.contactNo}
                                        color={colors.black}
                                        size={3.2}
                                    />
                                </View>
                            </View>

                            <View>
                                <View style={styles.Des}>
                                    <TextProfile

                                        Title='Description'
                                        color={colors.black}
                                        size={4}
                                        weight={'bold'}
                                    />
                                </View>
                                <View style={{ height: hp(20), marginLeft: '5%', marginTop: 5 }}>
                                    <TextProfile

                                        Title={item.description}
                                        // Title= {item.des}
                                        color={colors.grey1}
                                        size={4}
                                    />
                                </View>
                            </View>

                        </Card>
                        {/* <View style={{ flex: 1, marginHorizontal: 10 }}>
                            <ResponsiveText weight={'bold'} size={4} margin={[20, 0, 0, 8]} color={colors.black} >{item.des}</ResponsiveText>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon margin={[10, 0, 0, 14]}
                                size={17}
                                source={globalPath.celender}>
                            </Icon>
                            <ResponsiveText weight={'bold'} size={3} margin={[10, 0, 5, 2]} color={colors.grey1} >{item.Date + ' ' + item.Month} 2022</ResponsiveText>
                        </View>

                        <View style={{ flex: 1, marginHorizontal: 10 }}>
                            <ResponsiveText margin={[5, 0, 0, 2]} color={colors.grey1} >{item.des}</ResponsiveText>
                        </View> */}
                    </View>

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

export default SellsDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightWhite,
    },
    footer: {
        flex: 1,
        backgroundColor: colors.lightWhite,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        // justifyContent:'flex-end'
    },
    Text: {
        flex: 1,
        justifyContent: "center",
        paddingLeft: '5%',
        borderBottomWidth: 1,
        borderColor: colors.grey,
    },
    Text2:
    {
        flex: 1,
        justifyContent: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderColor: colors.grey,
    },
    Des: {
        flex: 1,
        justifyContent: "center",
        paddingLeft: '5%',
        borderColor: colors.grey,
    },
    advertisementBanner: {
        height: 170,
        // marginHorizontal:10,
    },
})