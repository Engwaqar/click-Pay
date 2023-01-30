import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
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
import { ScrollView } from 'react-native-gesture-handler'
import urls from '../../redux/lib/urls'
import Api from '../../redux/lib/api'
import moment from 'moment';
import Loader from "../../components/loader";

const ComplaintsList = ({ navigation }) => {
    const [GetAllComplaintsData, setGetAllComplaintsData] = useState([]);
    const [GetAllComplaintTypeAll, setGetAllComplaintTypeAll] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorString, setErrorString] = React.useState("");
    useEffect(() => {
        // GetComplaintbyCategory();
        GetAllComplaints();
        GetComplainTypeAll();
    }, []);
    const GetAllComplaints = async (index, item) => {
        try {
            setLoading(true);
            const res = await Api.get(urls.GET_COMPLAINT_ALL);
            console.log('AllComplaints', res)
            if (res && res.success == true) {
                setLoading(false);
                setGetAllComplaintsData(res.data);

            } else {
                setLoading(false);
                setErrorString(res.message)
            }
        } catch (error) {
            console.error(error);
        }
    };
    const GetComplainTypeAll = async (index, item) => {
        try {
            setLoading(true);
            const res = await Api.get(urls.GET_COMPLAINT_ALL_TYPE);
            console.log('AllComplaintsTypeAll', res)
            if (res && res.success == true) {
                setLoading(false);
                setGetAllComplaintTypeAll(res.data);

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
            title: 'Electricity',
            url: require('../../assets/icons/electricity.png'),
        },

        {
            id: 2,
            title: 'Gas',
            url: require('../../assets/icons/gas.png'),

        },
        {
            id: 3,
            title: 'Internet',
            url: require('../../assets/icons/internet.png'),

        },
        {
            id: 4,
            title: 'Tv Cable',
            url: require('../../assets/icons/tv.png'),

        },
        {
            id: 5,
            title: 'Water',
            url: require('../../assets/icons/water.png'),

        },


        {
            id: 6,
            title: 'Cleaning',
            url: require('../../assets/icons/cleaning.png'),

        },
        {
            id: 7,
            title: 'Security',
            url: require('../../assets/icons/securityAlert.png'),

        },



    ];
    const Data2 = [
        {
            Title: 'Electricity',
            id: 1,
            Date: '26-Jun-2022',
            Time: '01:30 PM',
            TicketNum: '5262562-53636',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
            statusName: 'Inprocess'
        },
        {
            Title: 'Gas',
            id: 1,
            Date: '26-Jun-2022',
            Time: '01:30 PM',
            TicketNum: '5262562-53636',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
            statusName: 'Resolved'
        },
        {
            Title: 'Water',
            id: 1,
            Date: '26-Jun-2022',
            Time: '01:30 PM',
            TicketNum: '5262562-53636',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
            statusName: 'Pending'
        },
        {
            Title: 'Internet',
            id: 1,
            Date: '26-Jun-2022',
            Time: '01:30 PM',
            TicketNum: '5262562-53636',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
            statusName: 'Assigned'
        },
        {
            Title: 'TV Cables',
            id: 1,
            Date: '26-Jun-2022',
            Time: '01:30 PM',
            TicketNum: '5262562-53636',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
            statusName: 'Resolved'
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
            <View style={{ flexDirection: 'row' }}>
                <ResponsiveText
                    margin={[15, 0, 5, 15]}
                    color={colors.textColor}
                    weight={'bold'}
                    size={4}
                >Complaints Category
                </ResponsiveText>


            </View>
            <View style={styles.footer}>
                <ScrollView>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 15, marginHorizontal: 12 }}>
                        {GetAllComplaintTypeAll.map((item) => {
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate(routeName.ALL_ITEM_LIST, { item: item.complainName, Id: item.id })}>
                                    <Card style={{ width: wp(28), alignItems: 'center', justifyContent: 'center', height: wp(25), margin: 5 }}>
                                        <Icon
                                            size={35}
                                            source={
                                                item.complainName == "Electricity" 
                                                ?globalPath.Electricity 
                                                :item.complainName == "Gas" 
                                                ?globalPath.Gas 
                                                :item.complainName == "Internet" 
                                                ?globalPath.Internet
                                                :item.complainName == "Water"
                                                 ?globalPath.Water 
                                                 :globalPath.Water

                                            }
                                        >
                                        </Icon>
                                        <ResponsiveText
                                            margin={[0, 0, 0, 0]}
                                            color={colors.black1}
                                        >{item.complainName}</ResponsiveText>
                                    </Card>
                                </TouchableOpacity>
                            )
                        })}
                    </View>

                    {GetAllComplaintsData.length > 0 ?

                        GetAllComplaintsData.map((item) => {
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate(routeName.COMPLAINTS_DETAILS, { item: item.id })}>
                                    <Card style={{ margin: 5, marginHorizontal: 15, top: 20 }}>
                                        <ResponsiveText margin={[0, 0, 0, 5]} size={3.5} weight={'bold'} color={colors.blue1}>{item.complainName}</ResponsiveText>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Icon margin={[0, 0, 0, 5]}
                                                size={15}
                                                source={globalPath.celender}
                                            >
                                            </Icon>
                                            <ResponsiveText margin={[0, 0, 0, 10]} color={colors.blue3} flex={1}>{item.createdDate}</ResponsiveText>
                                            <Icon margin={[0, 0, 0, 5]}
                                                size={15}
                                                source={globalPath.clock}
                                            >
                                            </Icon>
                                            <ResponsiveText margin={[0, 0, 0, 5]} color={colors.blue3} flex={1.5}>{item.time}</ResponsiveText>
                                            <View style={{
                                                backgroundColor: item.complainStatus == 'InProcess' ? colors.red3 : item.complainStatus == 'Complete' ? colors.green1 : item.complainStatus == 'Pending' ? colors.grey1 : item.complainStatus == 'InQueue' ? colors.Orange : colors.white,
                                                height: wp(6),
                                                borderRadius: 3,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                flex: 1
                                            }}>
                                                <ResponsiveText margin={[0, 0, 0, 0]} color={colors.white}>{item.complainStatus}</ResponsiveText>
                                            </View>
                                        </View>
                                        <ResponsiveText margin={[0, 0, 5, 10]} color={colors.grey1}>......................................................................................</ResponsiveText>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flex: 1 }}>
                                                <ResponsiveText margin={[0, 0, 0, 10]} weight={'bold'} color={colors.black} >Ticket Number:</ResponsiveText>
                                            </View>
                                            <View style={{ flex: 1.7 }}>
                                                <ResponsiveText margin={[0, 0, 0, 0]} color={colors.black}>{item.ticketNo}</ResponsiveText>
                                            </View>
                                        </View>
                                        <View >
                                            <ResponsiveText margin={[5, 0, 10, 10]} color={colors.grey1}>{item.description}</ResponsiveText>
                                        </View>
                                    </Card>
                                </TouchableOpacity>
                            )
                        })
                        :
                        (loading == false ?
                            <View style={{ width: wp(100), marginTop: 10, alignItems: 'center', alignSelf: 'center' }}>
                                <Icon borderColor={colors.yellow} borderWidth={0} borderRadius={0} size={250} source={require('../../assets/icons/norecordfound.png')} />
                            </View> : null
                        )

                    }

                    <View style={{ height: wp(10) }}>

                    </View>

                </ScrollView>
                <View style={{
                    backgroundColor: colors.primary,
                    // flexDirection: 'row',
                    justifyContent: 'center',
                    height: hp(7),
                    marginHorizontal: '15%',
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    marginBottom: 10,
                }}>

                    <TouchableOpacity onPress={() => navigation.navigate(routeName.APPLY_COMPLAINTS)}>
                        <View style={{


                            width: 60,
                            height: 60,
                            justifyContent: 'center',
                            alignItems: 'center',
                            // padding: 10,
                            borderRadius: 100,
                            borderWidth: 5,
                            borderColor: colors.white,
                            backgroundColor: colors.primary,
                            alignSelf: 'center',
                            // marginTop: 12,
                            top: -0

                        }}>
                            <Icon margin={[0, 0, 0, 0]}
                                size={30}
                                source={globalPath.plus}>
                            </Icon>
                        </View>

                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignSelf: 'center', marginBottom: 30 }}>
                        <ResponsiveText
                            margin={[0, 0, 0, 0]}
                            color={colors.white}
                            weight={'bold'}
                            size={3.5}
                        >Add Complaint
                        </ResponsiveText>
                    </View>
                </View>
            </View>
            {loading == true ?
                <Loader />
                :
                null
            }
        </SafeAreaView>
    )
}

export default ComplaintsList;

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
        marginTop: 10
    },
})