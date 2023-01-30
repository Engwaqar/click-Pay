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
import Api from '../../redux/lib/api'
import urls from '../../redux/lib/urls'
import Loader from "../../components/loader";

const AllItemList = ({ navigation, route }) => {
    const [GetAllComplaintsData, setGetAllComplaintsData] = useState([]);
    const [loading, setLoading] = useState([]);
    const [errorString, setErrorString] = React.useState("");
    const title = route.params.item
    const id = route.params.Id
    console.log('title', title)
    console.log('id', id)
    console.log('GetAllComplaintsData', GetAllComplaintsData)
    useEffect(() => {
        // GetComplaintbyCategory();
        GetAllComplaints();
    }, []);
    const GetAllComplaints = async (index, item) => {
        try {
            setLoading(true);
            const res = await Api.get(urls.GET_COMPLAINT_BY_CATEGORY + id);
            console.log('jjjjjjjj', res)
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
    console.log('first', title)
    console.log('id', id)


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
            Title: 'Electricity',
            id: 1,
            Date: '26-Jun-2022',
            Time: '01:30 PM',
            TicketNum: '5262562-53636',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
            statusName: 'Done'
        },
        {
            Title: 'Electricity',
            id: 1,
            Date: '26-Jun-2022',
            Time: '01:30 PM',
            TicketNum: '5262562-53636',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
            statusName: 'Pending'
        },
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
            Title: 'Electricity',
            id: 1,
            Date: '26-Jun-2022',
            Time: '01:30 PM',
            TicketNum: '5262562-53636',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
            statusName: 'Done'
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
        >{title} Complaints
            </ResponsiveText>
            <View style={styles.footer}>

                <ScrollView>

                    {GetAllComplaintsData.length > 0 ?

                        GetAllComplaintsData.map((item) => {
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate(routeName.COMPLAINTS_DETAILS, { item: item.id })}>
                                    <Card>
                                        <ResponsiveText margin={[0, 0, 0, 10]} size={3.5} weight={'bold'} color={colors.blue1}>{item.complainName}</ResponsiveText>
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
                                                backgroundColor: item.complainStatus == 'InProcess' ? colors.red3 : item.complainStatus == 'Complete' ? colors.green11 : item.complainStatus == 'Pending' ? colors.yellow : colors.white,
                                                height: wp(6),
                                                borderRadius: 3,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                flex: 1
                                            }}>
                                                <ResponsiveText margin={[0, 0, 0, 0]} color={colors.black}>{item.complainStatus}</ResponsiveText>
                                            </View>
                                        </View>
                                        <ResponsiveText margin={[0, 0, 5, 10]} color={colors.grey1}>..........................................................................................</ResponsiveText>
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
                        : (loading == false ?
                            <View style={{ width: wp(100), marginTop: 100, alignItems: 'center', alignSelf: 'center' }}>
                                <Icon borderColor={colors.yellow} borderWidth={0} borderRadius={0} size={250} source={require('../../assets/icons/norecordfound.png')} />
                            </View> : null
                        )}

                </ScrollView>
                {loading == true ?
                    <Loader />
                    :
                    null
                }
            </View>
        </SafeAreaView>
    )
}

export default AllItemList;

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