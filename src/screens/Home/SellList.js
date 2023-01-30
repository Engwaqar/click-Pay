import {
    StyleSheet, Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Image,
    Alert,
    RefreshControl
} from 'react-native'
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
import Swiper from "../../components/Swiper";
import urls from '../../redux/lib/urls'
import Api from '../../redux/lib/api';
import moment from 'moment';
import Loader from "../../components/loader";
import { useDispatch, useSelector } from "react-redux";
import { getFavorite } from '../../redux/actions/user.actions'
import { _toast } from '../../constants/Index'
import AsyncStorage from "@react-native-community/async-storage";

const SellList = ({ navigation }) => {
    const dispatch = useDispatch();
    const GetUserfav = useSelector(state => state.userReducers.favorite.data,);
    const refreshing = useSelector(state => state.userReducers.favorite.refreshing);
    const [SalePurchaseAl, setSalePurchaseAl] = useState([]);
    const [loading, setLoading] = useState([]);
    const [errorString, setErrorString] = React.useState("");
    const [activeTab, setActiveTab] = React.useState(1);
    const [MyAdsactiveTab, setMyAdsactiveTab] = React.useState(1);
    const [GetProduct, setGetProduct] = React.useState([]);
    const [GetUserProductAds, setGetUserProductAds] = React.useState([]);
    const [GetProductRequest, setGetProductRequest] = React.useState([]);
    const [Refreshing, setRefreshing] = React.useState(false);
    const wait = timeout => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    };
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(6000).then(() => setRefreshing(false));
        GetUserSalePurchaseAll();
        GetProductRequestAll();
        GetUserProductSaleAd();
        dispatch(getFavorite());
        GetProductRequestAlluserId();
        arrayUniqueByKey

    }, []);
    const key = 'id';
    console.log('GetProductRequest', GetProductRequest)
    const arrayUniqueByKey = [...new Map(GetUserfav.map(item =>
        [item[key], item])).values()];

    console.log(arrayUniqueByKey, 'arrayUniqueByKey');
    useEffect(() => {
        GetUserSalePurchaseAll();
        GetProductRequestAll();
        GetUserProductSaleAd();
        dispatch(getFavorite());
        GetProductRequestAlluserId();
    }, []);
    const deleteproduct = (id) => {
        Alert.alert(
            '',
            'Do you want to remove this Product ?',
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
                            const res = await Api.delete(urls.PRODUCT_DELETE + id);
                            if (res && res.success == true) {
                                setLoading(false);
                                console.log('response', res)
                                GetUserProductSaleAd();
                                _toast("Product delete successfully")
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
    const deleteproductReq = (id) => {
        Alert.alert(
            '',
            'Do you want to remove this Product ?',
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
                            const res = await Api.delete(urls.PRODUCT_REQUEST_DELETE + id);
                            if (res && res.success == true) {
                                setLoading(false);
                                console.log('response', res)
                                GetProductRequestAlluserId();
                                _toast("Product delete successfully")
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
    const GetUserSalePurchaseAll = async (index, item) => {
        try {
            setLoading(true);
            const res = await Api.get(urls.GET_USER_PURCHASE);
            console.log('GetUserSalePurchaseAll', res);
            if (res && res.success == true) {
                setLoading(false);
                setSalePurchaseAl(res.data);
            } else {
                setLoading(false);
                setErrorString(res.message)
            }
        } catch (error) {
            console.error(error);

        }
    };
    const GetProductRequestAll = async (index, item) => {
        try {
            setLoading(true);
            const res = await Api.get(urls.GET_PRODUCT);
            console.log('GetProductRequestAll', res);
            if (res && res.success == true) {
                setLoading(false);
                setGetProduct(res.data);
            } else {
                setLoading(false);
                setErrorString(res.message)
            }
        } catch (error) {
            console.error(error);

        }
    };
    const GetUserProductSaleAd = async (index, item) => {
        try {
            setLoading(true);
            const res = await Api.get(urls.GET_USER_PRODUCT_SALE);
            console.log('GetUserProductSaleAd', res);
            if (res && res.success == true) {
                setLoading(false);
                setGetUserProductAds(res.data);
            } else {
                setLoading(false);
                setErrorString(res.message)
            }
        } catch (error) {
            console.error(error);

        }
    };
    const GetProductRequestAlluserId = async (index, item) => {
        const userType = await AsyncStorage.getItem("@userId");
        // console.log('userType', userType)
        try {
            setLoading(true);
            const res = await Api.get(urls.BY_USER_WANT_TO_BUY + userType);
            console.log('GetProductRequestAlluserId', res);
            if (res && res.success == true) {
                setLoading(false);
                setGetProductRequest(res.data);
            } else {
                setLoading(false);
                setErrorString(res.message)
            }
        } catch (error) {
            console.error(error);

        }
    };
    const arr = [
        require('../../assets/icons/pbanner.png'),
        require('../../assets/icons/banner.jpg'),

    ]
    const Data = [
        {
            id: 1,
            url: require('../../assets/icons/product1.png'),
            Price: '12,500',
            des: 'Original Siemens hand dryer',
            Date: '9/23/2022'

        },

        {
            id: 2,
            url: require('../../assets/icons/product2.png'),
            Price: '12,500',
            des: 'Honda CG 125 Model 2016-B Good Condition',
            Date: '9/23/2022'
        },

        {
            id: 3,
            url: require('../../assets/icons/product3.png'),
            Price: '76,000',
            des: 'vivo y33s for sale',
            Date: '9/23/2022'
        },

        {
            id: 4,
            url: require('../../assets/icons/product4.png'),
            Price: '34,000',
            des: 'NEOS World Slimest Swiss',
            Date: '9/23/2022'
        },

        {
            id: 5,
            url: require('../../assets/icons/product1.png'),
            Price: '12,500',
            des: 'Original Siemens hand dryer',
            Date: '9/23/2022'
        },

        {
            id: 6,
            url: require('../../assets/icons/pbanner.png'),
            Price: '12,500',
            des: 'Honda CG 125 Model 2016-B Good Condition',
            Date: '9/23/2022'
        },

    ];
    const Data1 = [
        {
            id: 7,
            Price: '12,500-15,00',
            Title: 'Original Siemens hand dryer',
            des: "Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis",
            Date: '9/23/2022'
        },

        {
            id: 8,
            Price: '12,500-16,000',
            Title: 'Honda CG 125 Model 2016-B Good Condition',
            des: "Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis",
            Date: '9/23/2022'
        },

        {
            id: 9,
            Price: '76,000-80,000',
            Title: 'vivo y33s for sale',
            des: "Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis",
            Date: '9/23/2022'
        },

        {
            id: 10,
            Price: '34,000-36,000',
            Title: 'NEOS World Slimest Swiss',
            des: "Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis",
            Date: '9/23/2022'
        },

        {
            id: 11,
            Price: '12,500-17,000',
            Title: 'Original Siemens hand dryer',
            des: "Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis",
            Date: '9/23/2022'
        },

        {
            id: 12,
            Price: '12,500-14,000',
            Title: 'Honda CG 125 Model 2016-B Good Condition',
            des: "Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis",
            Date: '9/23/2022'
        },

    ];
    const BuynSell = [
        {
            id: 1,
            name: 'WANT TO SELL',
            url: require('../../assets/icons/sell.png'),
        },
        {
            id: 2,
            name: 'WANT TO BUY',
            url: require('../../assets/icons/buy.png'),
        },
        {
            id: 3,
            name: 'My Ads',
            url: require('../../assets/icons/ads-icon.png'),
        },
        {
            id: 4,
            name: 'Favourite',
            url: require('../../assets/icons/Favourite.png'),
        },
    ]
    const MyAds = [
        {
            id: 1,
            name: 'WANT TO SELL',
            url: require('../../assets/icons/sell.png'),
        },
        {
            id: 2,
            name: 'WANT TO BUY',
            url: require('../../assets/icons/buy.png'),
        },

    ]
    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate(routeName.SELLS_DETAILS, { item: item })}
        >
            <Card style={{
                width: hp(23),
                height: hp(21),
                alignItems: 'center',
                justifyContent: 'center',
                margin: 5,
                //  marginHorizontal:10,
                marginLeft: 10,
            }}>
                <Image
                    style={{ flex: 1, width: '100%', resizeMode: 'cover' }}
                    source={{ uri: item.fullPath1 }}
                />
                <ResponsiveText
                    margin={[0, 0, 0, 0]}
                    color={colors.black1}
                >
                    {item.adTitle}
                </ResponsiveText>
                <View style={{ flexDirection: "row" }}>
                    <ResponsiveText
                        margin={[0, 10, 0, 0]}
                        color={colors.black}
                        weight={'bold'}
                    >
                        Post Date:
                    </ResponsiveText>
                    <ResponsiveText
                        margin={[0, 0, 0, 0]}
                        color={colors.black}
                    >
                        {/* {item.createdDateTime} */}
                        {moment(item.createdDateTime).format("MM/DD/YY")}
                    </ResponsiveText>
                </View>
                <ResponsiveText
                    margin={[0, 0, 0, 0]}
                    color={colors.blue}
                    weight={'bold'}
                >
                    Rs: {item.price}
                </ResponsiveText>
            </Card>
        </TouchableOpacity>
    );
    const renderItem1 = ({ item }) => (
        // <TouchableOpacity
        // // onPress={() => navigation.navigate(routeName.ALL_ITEM_LIST, { item: item.title })}
        // >
        <Card style={{
            // width: hp(23),
            // height: hp(10),
            //  alignItems: 'center',
            padding: 10,
            justifyContent: 'center',
            margin: 5,
            marginHorizontal: 15,
            // marginLeft:10
        }}>

            <ResponsiveText
                margin={[5, 0, 0, 10]}
                color={colors.blue1}
                weight={'bold'}
            >
                {item.adTitle}
            </ResponsiveText>
            <ResponsiveText
                margin={[5, 0, 0, 10]}
                color={colors.black1}
            >
                {item.describe}
            </ResponsiveText>
            <ResponsiveText
                margin={[5, 0, 0, 10]}
                color={colors.blue}
                weight={'bold'}

            >
                Range:
                <ResponsiveText
                    margin={[5, 0, 0, 10]}
                    color={colors.black}
                    weight={'bold'}

                >
                    {item.priceRange}
                </ResponsiveText>
            </ResponsiveText>
            <ResponsiveText
                margin={[5, 0, 0, 10]}
                color={colors.blue}
                weight={'bold'}

            >
                Contact Number: <ResponsiveText
                    margin={[5, 0, 0, 10]}
                    color={colors.black}
                    weight={'bold'}

                >
                    {item.contactNumber}
                </ResponsiveText>
            </ResponsiveText>
        </Card>
        // </TouchableOpacity>
    );
    const renderItem2 = ({ item }) => (

        <TouchableOpacity
            onPress={() => navigation.navigate(routeName.SELLS_DETAILS, { item: item })}
        >
            <Card style={{
                width: hp(23),
                height: hp(21),
                alignItems: 'center',
                justifyContent: 'center',
                margin: 5,
                //  marginHorizontal:10,
                marginLeft: 10,
            }}>
                <Image
                    style={{ flex: 1, width: '100%', resizeMode: 'cover' }}
                    source={{ uri: item.fullPath1 }}
                />
                <ResponsiveText
                    margin={[0, 0, 0, 0]}
                    color={colors.black1}
                >
                    {item.adTitle}
                </ResponsiveText>
                <View style={{ flexDirection: "row" }}>
                    <ResponsiveText
                        margin={[0, 10, 0, 0]}
                        color={colors.black}
                        weight={'bold'}
                    >
                        Pst Date:
                    </ResponsiveText>
                    <ResponsiveText
                        margin={[0, 0, 0, 0]}
                        color={colors.black}
                    >
                        {/* {item.createdDateTime} */}
                        {moment(item.createdDateTime).format("MM/DD/YY")}
                    </ResponsiveText>
                </View>
                <View style={{ flexDirection: 'row', }}>
                    <ResponsiveText
                        margin={[10, 0, 0, 0]}
                        color={colors.blue}
                        weight={'bold'}
                        flex={0.8}
                    >
                        Rs: {item.price}
                    </ResponsiveText>
                    <TouchableOpacity
                        onPress={() => deleteproduct((item.id))}
                    >
                        <View style={{

                            backgroundColor: colors.red,
                            height: hp(5),
                            width: hp(5),
                            borderRadius: 30,
                            // marginRight: 10,
                            justifyContent: 'center',
                            marginTop: 0,
                            // alignItems:'center'
                            marginBottom: 0
                        }}>
                            <Icon
                                margin={[0, 0, 0, 10]}
                                // height={20}
                                // width={20}
                                size={15}
                                resizeMode={"contain"}
                                source={globalPath.del}

                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </Card>
        </TouchableOpacity>

    );
    const renderItem3 = ({ item }) => (

        <TouchableOpacity
            onPress={() => navigation.navigate(routeName.SELLS_DETAILS, { item: item })}
        >
            <Card style={{
                width: hp(23),
                height: hp(21),
                alignItems: 'center',
                justifyContent: 'center',
                margin: 5,
                //  marginHorizontal:10,
                marginLeft: 10,
            }}>

                <Image
                    style={{ flex: 1, width: '100%', resizeMode: 'cover' }}
                    source={{ uri: item.fullPath1 }}
                />
                <ResponsiveText
                    margin={[0, 0, 0, 0]}
                    color={colors.black1}
                >
                    {item.adTitle}
                </ResponsiveText>
                <View style={{ flexDirection: "row" }}>
                    <ResponsiveText
                        margin={[0, 10, 0, 0]}
                        color={colors.black}
                        weight={'bold'}
                    >
                        Post Date:
                    </ResponsiveText>
                    <ResponsiveText
                        margin={[0, 0, 0, 0]}
                        color={colors.black}
                    >
                        {/* {item.createdDateTime} */}
                        {moment(item.createdDateTime).format("MM/DD/YY")}
                    </ResponsiveText>
                </View>
                <ResponsiveText
                    margin={[0, 0, 0, 0]}
                    color={colors.blue}
                    weight={'bold'}
                >
                    Rs: {item.price}
                </ResponsiveText>

            </Card>
        </TouchableOpacity>

    );
    const renderItem4 = ({ item }) => (
        // <TouchableOpacity
        // // onPress={() => navigation.navigate(routeName.ALL_ITEM_LIST, { item: item.title })}
        // >
        <Card style={{
            // width: hp(23),
            // height: hp(10),
            //  alignItems: 'center',
            padding: 10,
            justifyContent: 'center',
            margin: 5,
            marginHorizontal: 15,
            // marginLeft:10
        }}>
            <View style={{ flexDirection: 'row', }}>
                <ResponsiveText
                    flex={1}
                    margin={[5, 0, 0, 10]}
                    color={colors.blue1}
                    weight={'bold'}
                >
                    {item.adTitle}
                </ResponsiveText>
                <TouchableOpacity
                    onPress={() => deleteproductReq((item.id))}
                >
                    <View style={{

                        backgroundColor: colors.red,
                        height: hp(5),
                        width: hp(5),
                        borderRadius: 30,
                        // marginRight: 10,
                        justifyContent: 'center',
                        marginTop: 0,
                        // alignItems:'center'
                        marginBottom: 0
                    }}>
                        <Icon
                            margin={[0, 0, 0, 10]}
                            // height={20}
                            // width={20}
                            size={15}
                            resizeMode={"contain"}
                            source={globalPath.del}

                        />
                    </View>
                </TouchableOpacity>
            </View>
            <ResponsiveText
                margin={[5, 0, 0, 10]}
                color={colors.black1}
            >
                {item.describe}
            </ResponsiveText>
            <ResponsiveText
                margin={[5, 0, 0, 10]}
                color={colors.blue}
                weight={'bold'}

            >
                Range:
                <ResponsiveText
                    margin={[5, 0, 0, 10]}
                    color={colors.black}
                    weight={'bold'}

                >
                    {item.priceRange}
                </ResponsiveText>
            </ResponsiveText>
            <ResponsiveText
                margin={[5, 0, 0, 10]}
                color={colors.blue}
                weight={'bold'}

            >
                Contact Number: <ResponsiveText
                    margin={[5, 0, 0, 10]}
                    color={colors.black}
                    weight={'bold'}

                >
                    {item.contactNumber}
                </ResponsiveText>
            </ResponsiveText>
        </Card>
        // </TouchableOpacity>
    );
    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <ChatHeader
                backbutton
                notifaction={globalPath.notifaction}
                value={'1'}
                user={globalPath.user}
                navigation={navigation}
            />
            <View style={styles.advertisementBanner}>
                <Swiper data={arr} />
            </View>
            <View
                style={{
                    justifyContent: "center",
                    padding: 10,
                    flexDirection: "row",
                    borderRadius: 10,

                }}
            >
                {BuynSell.map((items, index) => {
                    return (
                        <React.Fragment key={items.id}>
                            <TouchableOpacity
                                id={index}
                                onPress={() => setActiveTab(items.id)}
                                style={{
                                    width: wp(22),
                                    borderWidth: 1,
                                    borderColor: colors.white,
                                    // borderTopRightRadius: index == 0 ? 0 : 10,
                                    // borderBottomRightRadius: index == 0 ? 0 : 10,
                                    // borderBottomLeftRadius: index == 1 ? 0 : 10,
                                    // borderTopLeftRadius: index == 1 ? 0 : 10,
                                    height: hp(6),
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 0,
                                    backgroundColor: items.id === activeTab ? colors.white : colors.blue3,
                                }}
                                padding={[3, 15]}
                            >
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon margin={[0, 2, 0, 0]}
                                        size={25}
                                        source={items.url}>
                                    </Icon>
                                </View>
                                <ResponsiveText
                                    margin={[3, 2, 0, 0]}
                                    size={2}
                                    weight={'bold'}
                                    fontFamily={
                                        items.id === activeTab ? "Boldedium" : undefined
                                    }
                                    color={
                                        items.id === activeTab ? colors.black : colors.white
                                    }
                                >
                                    {items.name}
                                </ResponsiveText>
                            </TouchableOpacity>
                        </React.Fragment>
                    );
                })}
            </View>
            <View style={styles.footer}>
                {activeTab == 1 ?
                    SalePurchaseAl.length > 0 ?
                        <FlatList
                            data={SalePurchaseAl}
                            renderItem={renderItem}
                            // key={'_'}
                            keyExtractor={(item, index) => 'key' + index}
                            horizontal={false}
                            numColumns={2}
                        /> : (loading == false ?
                            <View style={{ width: wp(100), marginTop: 100, alignItems: 'center', alignSelf: 'center' }}>
                                <Icon borderColor={colors.yellow} borderWidth={0} borderRadius={0} size={250} source={require('../../assets/icons/norecordfound.png')} />
                            </View> : null
                        )
                    : activeTab == 2 ?
                        GetProduct.length > 0 ?
                            <FlatList
                                data={GetProduct}
                                renderItem={renderItem1}
                                key={'#'}
                                keyExtractor={item => "#" + item.id}
                                horizontal={false}
                                numColumns={1}
                            /> : (loading == false ?
                                <View style={{ width: wp(100), marginTop: 100, alignItems: 'center', alignSelf: 'center' }}>
                                    <Icon borderColor={colors.yellow} borderWidth={0} borderRadius={0} size={250} source={require('../../assets/icons/norecordfound.png')} />
                                </View> : null
                            )
                        : activeTab == 3 ?
                            // GetUserProductAds.length > 0 ?

                            <View
                                style={{
                                    justifyContent: "center",
                                    padding: 10,
                                    flexDirection: "row",
                                    borderRadius: 10,

                                }}
                            >
                                {MyAds.map((items, index) => {
                                    return (
                                        <React.Fragment key={items.id}>
                                            <TouchableOpacity
                                                id={index}
                                                onPress={() => setMyAdsactiveTab(items.id)}
                                                style={{
                                                    width: wp(40),
                                                    borderWidth: 1,
                                                    borderColor: colors.white,
                                                    borderTopRightRadius: index == 0 ? 0 : 10,
                                                    borderBottomRightRadius: index == 0 ? 0 : 10,
                                                    borderBottomLeftRadius: index == 1 ? 0 : 10,
                                                    borderTopLeftRadius: index == 1 ? 0 : 10,
                                                    height: hp(6),
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    marginTop: 0,
                                                    backgroundColor: items.id === MyAdsactiveTab ? colors.blue3 : colors.white,
                                                }}
                                                padding={[3, 15]}
                                            >
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Icon margin={[0, 2, 0, 0]}
                                                        size={25}
                                                        source={items.url}>
                                                    </Icon>
                                                </View>
                                                <ResponsiveText
                                                    margin={[3, 2, 0, 0]}
                                                    size={2}
                                                    weight={'bold'}
                                                    fontFamily={
                                                        items.id === MyAdsactiveTab ? "Boldedium" : undefined
                                                    }
                                                    color={
                                                        items.id === MyAdsactiveTab ? colors.white : colors.black
                                                    }
                                                >
                                                    {items.name}
                                                </ResponsiveText>
                                            </TouchableOpacity>
                                        </React.Fragment>
                                    );
                                })}

                            </View>
                            : activeTab == 4 ?
                                arrayUniqueByKey.length > 0 ?
                                    <FlatList
                                        data={arrayUniqueByKey}
                                        renderItem={renderItem3}
                                        // key={'@'}
                                        keyExtractor={(item, index) => 'Na' + index}
                                        horizontal={false}
                                        numColumns={2}
                                        refreshing={Refreshing}
                                        onRefresh={onRefresh}

                                    /> : (refreshing == false ?
                                        <View style={{ width: wp(100), marginTop: 100, alignItems: 'center', alignSelf: 'center' }}>
                                            <Icon borderColor={colors.yellow} borderWidth={0} borderRadius={0} size={250} source={require('../../assets/icons/norecordfound.png')} />
                                        </View> : null
                                    ) : null
                }

                {MyAdsactiveTab == 1 && activeTab == 3 ?
                    GetUserProductAds.length > 0 ?
                        <FlatList
                            data={GetUserProductAds}
                            renderItem={renderItem2}
                            // key={'_'}
                            keyExtractor={(item, index) => 'key' + index}
                            horizontal={false}
                            numColumns={2}
                        /> : (loading == false ?
                            <View style={{ width: wp(100), marginTop: 100, alignItems: 'center', alignSelf: 'center' }}>
                                <Icon borderColor={colors.yellow} borderWidth={0} borderRadius={0} size={250} source={require('../../assets/icons/norecordfound.png')} />
                            </View> : null
                        )
                    : MyAdsactiveTab == 2 && activeTab == 3 ?
                        GetProductRequest.length > 0 ?
                            <FlatList
                                data={GetProductRequest}
                                renderItem={renderItem4}
                                key={'#'}
                                keyExtractor={item => "#" + item.id}
                                horizontal={false}
                                numColumns={1}
                            /> : (loading == false ?
                                <View style={{ width: wp(100), marginTop: 100, alignItems: 'center', alignSelf: 'center' }}>
                                    <Icon borderColor={colors.yellow} borderWidth={0} borderRadius={0} size={250} source={require('../../assets/icons/norecordfound.png')} />
                                </View> : null
                            ) : null

                }

                {activeTab == 1 ?
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate(routeName.CREATE_ADS)}
                            style={{
                                borderRadius: 100,
                                //  borderWidth: 2,
                                // borderColor: colors.white,
                                backgroundColor: colors.blue,
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: hp(7),
                                width: hp(7),
                                alignSelf: 'flex-end',
                                right: 30,
                                position: "absolute",
                                bottom: 50,
                                elevation: 5,
                                shadowOpacity: 0.2,
                            }}
                        >
                            <Icon margin={[0, 0, 0, 0]}
                                size={30}
                                source={globalPath.plus}
                                tintColor={colors.white}
                            >
                            </Icon>

                        </TouchableOpacity>

                        <View style={{
                            alignSelf: 'flex-end',
                            bottom: 30,
                            right: 20,
                            elevation: 5,


                        }}>
                            <ResponsiveText
                                margin={[0, 0, 0, 10]}
                                color={colors.blue}
                                weight={'bold'}
                                size={3.5}
                            > Create Ads
                            </ResponsiveText>
                        </View>
                    </View>
                    : activeTab == 2 ?
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate(routeName.ADD_PRODUCT)}
                                style={{
                                    borderRadius: 100,
                                    //  borderWidth: 2,
                                    // borderColor: colors.white,
                                    elevation: 5,
                                    shadowOpacity: 0.2,
                                    backgroundColor: colors.blue2,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: hp(7),
                                    width: hp(7),
                                    alignSelf: 'flex-end',
                                    right: 30,
                                    position: "absolute",
                                    bottom: 50,

                                }}
                            >
                                <Icon margin={[0, 0, 0, 0]}
                                    size={30}
                                    source={globalPath.plus}
                                    tintColor={colors.white}
                                >
                                </Icon>
                            </TouchableOpacity>
                            <View style={{
                                alignSelf: 'flex-end',
                                bottom: 30,
                                right: 27,
                                elevation: 5,

                            }}>
                                <ResponsiveText
                                    margin={[0, 0, 0, 10]}
                                    color={colors.blue2}
                                    weight={'bold'}
                                    size={3.5}
                                > Add Want
                                </ResponsiveText>
                            </View>
                        </View>
                        : null}
            </View>
            {loading == true ?
                <Loader />
                :
                null
            }
        </SafeAreaView>
    )
}

export default SellList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.blue3,
    },
    footer: {
        flex: 1,
        backgroundColor: colors.lightWhite,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        // justifyContent:'flex-end'
    },
    advertisementBanner: {
        height: 150,
    },
})