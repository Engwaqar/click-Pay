import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors } from '../../../constants/colorsPallet'
import ChatHeader from '../../../components/ChatHeader'
import ResponsiveText from '../../../components/RnText'
import Card from '../../../components/Card'
import Icon from '../../../components/Icon'
import { globalPath } from '../../../constants/globalPath'
import Fonts from '../../../helpers/Fonts'
import { hp, wp } from '../../../helpers/Responsiveness'
import { routeName } from '../../../constants/routeName'
import { ScrollView } from 'react-native-gesture-handler'
import moment from 'moment';
import Loader from "../../../components/loader";
import urls from '../../../redux/lib/urls'
import Api from '../../../redux/lib/api'
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from '../../../redux/actions/user.actions'
import { _toast } from '../../../constants/Index'
import Input from '../../../components/Input';

const WorkerRole = ({ navigation }) => {
    const UserProfile = useSelector(state => state.userReducers.profileData.data,);
    const dispatch = useDispatch();
    const id = UserProfile.departmentId;
    console.log('departmentId', id)
    const [GetWorkerData, setGetWorkerData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorString, setErrorString] = React.useState("");
    const [search, setSearch] = useState("");
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    useEffect(() => {
        dispatch(getProfile());
        // GetWorkerComplaints();

    }, []);
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         GetWorkerComplaints();
    //     }, 5000);
    //     return () => clearInterval(interval);
    // }, []);
    useEffect(() => {
        setFilteredDataSource(GetWorkerData);
        setMasterDataSource(GetWorkerData);
    }, [GetWorkerData])

    useEffect(() => {
        GetWorkerComplaints()
    }, [UserProfile])

    const GetWorkerComplaints = async (index, item) => {
        try {
            setLoading(true);
            const res = await Api.get(urls.GET_WORKER_DATA);
            console.log('GetWorkerComplaints', res)
            if (res && res.success == true) {
                setLoading(false);
                setGetWorkerData(res.data);
            } else {
                setLoading(false);
                setErrorString(res.message)
            }
        } catch (error) {
            console.error(error);
        }
    };
    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource and update FilteredDataSource
            const newData = masterDataSource.filter((item) => {
                // Applying filter for the inserted text in search bar
                const itemData = item.ticketNo
                    ? item.ticketNo.toString()
                    : "";
                const textData = text;
                return itemData.indexOf(textData) > -1;
            });
            // const newData=masterDataSource.filter((item)=>item.ticketNo==Number(text) );
            console.log('newData', newData)
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };;


    const Data2 = [
        {
            Title: 'Electricity',
            id: 1,
            Date: '26-Jun-2022',
            Time: '01:30 PM',
            TicketNum: '5262562-53636',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
            statusName: 'InProcess'
        },
        {
            Title: 'Gas',
            id: 1,
            Date: '26-Jun-2022',
            Time: '01:30 PM',
            TicketNum: '5262562-53636',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
            statusName: 'InProcess'
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
            statusName: 'Assigned'
        },

    ];
    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <ChatHeader
                // backbutton
                notifaction={globalPath.notifaction}
                value={'1'}
                user={globalPath.user}
                navigation={navigation}
                status={'Worker Panel'}
            />
            {/* <View style={{ flexDirection: 'row' }}>
                <ResponsiveText
                    margin={[15, 0, 5, 15]}
                    color={colors.textColor}
                    weight={'bold'}
                    size={4}
                >Worker Panel
                </ResponsiveText>


            </View> */}
            <View style={styles.Search}>
                <Input
                    padding={[0, 10, 0, 25]}
                    placeholder="Search With Ticket No..."
                    color={colors.black}
                    backgroundColor={colors.white}
                    searchBox
                    onChnageText={(text) => searchFilterFunction(text)}
                />
            </View>
            <View style={styles.footer}>
                <ScrollView>


                    {filteredDataSource.length > 0 ?

                        filteredDataSource.map((item) => {
                            return (
                                // <TouchableOpacity onPress={() => navigation.navigate(routeName.COMPLAINTS_DETAILS, { item: item.id })}>
                                <Card style={{ margin: 5, marginHorizontal: 15, top: 10 }}>
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
                                            backgroundColor: item.complainStatus == 'InProcess' ? colors.red3 : item.complainStatus == 'Complete' ? colors.green1 : item.complainStatus == 'InQueue' ? colors.Orange : item.complainStatus == 'Pending' ? colors.grey1 : colors.white,
                                            height: wp(6),
                                            borderRadius: 3,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flex: 1
                                        }}>
                                            <ResponsiveText margin={[0, 0, 0, 0]} color={colors.white}>{item.complainStatus}</ResponsiveText>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <ResponsiveText margin={[0, 0, 0, 5]}weight={'bold'} color={colors.blue3} flex={0}>TicketNo:</ResponsiveText>

                                        <ResponsiveText margin={[0, 0, 0, 5]} color={colors.blue3} flex={1}>{item.ticketNo}</ResponsiveText>
                                    </View>
                                    <ResponsiveText margin={[0, 0, 5, 10]} color={colors.grey1}>......................................................................................</ResponsiveText>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1 }}>
                                            <ResponsiveText margin={[0, 0, 0, 10]} weight={'bold'} color={colors.black} >Manager Name:</ResponsiveText>
                                        </View>
                                        <View style={{ flex: 1.7 }}>
                                            <ResponsiveText margin={[0, 0, 0, 0]} color={colors.black}>{item.assignedManagerName}</ResponsiveText>
                                        </View>
                                    </View>
                                    <View >
                                        <ResponsiveText margin={[5, 0, 10, 10]} color={colors.grey1}>{item.description}</ResponsiveText>
                                    </View>
                                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>

                                        <TouchableOpacity
                                            onPress={() => navigation.navigate(routeName.COMPLAINTS_DETAILS, { item: item.id, GetWorkerComplaints: GetWorkerComplaints })}
                                            style={{
                                                alignItems: 'center',
                                                marginTop: 0,
                                                marginLeft: 20,
                                                justifyContent: 'center',
                                                height: hp(3.8),
                                                width: wp(20),
                                                borderRadius: 5,
                                                backgroundColor: colors.secondary,
                                            }} ><ResponsiveText weight={'bold'} color={colors.white} size={2.7} >Detail</ResponsiveText>
                                        </TouchableOpacity>
                                    </View>
                                </Card>
                                // </TouchableOpacity>
                            )
                        })
                        :
                        (loading == false ?
                            <View style={{ width: wp(100), marginTop: 10, alignItems: 'center', alignSelf: 'center' }}>
                                <Icon borderColor={colors.yellow} borderWidth={0} borderRadius={0} size={250} source={require('../../../assets/icons/norecordfound.png')} />
                            </View> : null
                        )
                    }

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

export default WorkerRole;

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
    Search: {
        marginHorizontal: 15,
        marginTop: 10
    },
})