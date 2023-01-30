import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
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
import Modal from "react-native-modal";
import DropDown from '../../../components/DropDown'
import urls from '../../../redux/lib/urls'
import Api from '../../../redux/lib/api'
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from '../../../redux/actions/user.actions'
import { _toast } from '../../../constants/Index'
import Input from '../../../components/Input';

const ManagerRole = ({ navigation }) => {
    const UserProfile = useSelector(state => state.userReducers.profileData.data,);
    const dispatch = useDispatch();
    const UserId = UserProfile.departmentId;
    // const Id = UserProfile.departmentId;
    console.log('UserId', UserId)
    const [isModalVisible, setModalVisible] = useState(false);
    const [SelectedComplainid, setSelectedComplainid] = useState(null)
    const [Value, setValue] = useState(false);
    const toggleModal = (id) => {
        setModalVisible(!isModalVisible);
        setSelectedComplainid(id)
    };
    const [ManagerComplaints, setManagerComplaints] = useState([]);
    const [ManagerComplookup, setManagerComplookup] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorString, setErrorString] = React.useState("");
    const [refreshing, setRefreshing] = React.useState(false);
    const [search, setSearch] = useState("");
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const wait = timeout => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    };
    // console.log('ManagerComplookup', ManagerComplookup)
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(6000).then(() => setRefreshing(false));
        dispatch(getProfile());
        GetComplainslookUp();
        GetAllMangerComplaints();

    }, []);
    useEffect(() => {
        dispatch(getProfile());
        GetComplainslookUp();
    }, [UserId]);
    useEffect(() => {
        GetAllMangerComplaints();
    }, [UserProfile])
    useEffect(() => {
        setFilteredDataSource(ManagerComplaints);
        setMasterDataSource(ManagerComplaints);
    }, [ManagerComplaints])

    const GetAllMangerComplaints = async (index, item) => {
        try {
            setRefreshing(true);
            const res = await Api.get(urls.GET_MANAGER_COMPLAINTS);
            console.log('AllMangerComplaints', res)
            if (res && res.success == true) {
                setRefreshing(false);
                setManagerComplaints(res.data);
            } else {
                setRefreshing(false);
                setErrorString(res.message)
            }
        } catch (error) {
            console.error(error);
        }
    };
    const GetComplainslookUp = async (index, item) => {
        try {
            setRefreshing(true);
            const res = await Api.get(urls.GET_COMP_LOOKUP + UserId);
            console.log('GetComplainslookUp', urls);
            if (res && res.success == true) {
                setRefreshing(false);
                setManagerComplookup(res.data);
            } else {
                setRefreshing(false);
                setErrorString(res.message)
            }
        } catch (error) {
            console.error(error);
        }
    };
    const updateWorker = async () => {
        const id = ManagerComplookup.find(v => v.name == Value).id;
        console.log('first', id)
        var obj = {
            "assignedWorkerId": id,
        }
        try {
            setRefreshing(true);
            const res = await Api.put(urls.UPDATE_WORKER + SelectedComplainid, obj);
            console.log('resfffff', res)
            if (res && res.success == true) {
                // navigation.goBack()
                _toast("Task Assigned successfully")
                setModalVisible(false)
                GetAllMangerComplaints();
                setLoading(false);
            } else {
                setRefreshing(false);
                setErrorString(res.message)
            }
        } catch (error) {
            console.error(error);
        }
    }
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
                status={'Manager Panel'}

            />
            {/* <View style={{ flexDirection: 'row' }}>
                <ResponsiveText
                    margin={[15, 0, 5, 15]}
                    color={colors.textColor}
                    weight={'bold'}
                    size={4}
                >Manager Panel
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
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            // colors={colors.secondary}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    {filteredDataSource.length > 0 ?

                        filteredDataSource.map((item) => {
                            return (
                                // <TouchableOpacity
                                // onPress={() => navigation.navigate(routeName.WORKER_ROLE)}
                                // >
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
                                        <ResponsiveText margin={[0, 0, 0, 5]} color={colors.blue3} flex={1.5}>{item.time} </ResponsiveText>
                                        {/*{moment(item.time).format("HH:mm:ss.sss")}  */}
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
                                        <ResponsiveText margin={[0, 0, 0, 5]} weight={'bold'} color={colors.blue3} flex={0}>TicketNo:</ResponsiveText>

                                        <ResponsiveText margin={[0, 0, 0, 5]} color={colors.blue3} flex={1}>{item.ticketNo}</ResponsiveText>
                                    </View>
                                    <ResponsiveText margin={[0, 0, 5, 10]} color={colors.grey1}>......................................................................................</ResponsiveText>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1 }}>
                                            <ResponsiveText margin={[0, 0, 0, 10]} weight={'bold'} color={colors.black} >Worker Name:</ResponsiveText>
                                        </View>
                                        <View style={{ flex: 2.1 }}>
                                            <ResponsiveText margin={[0, 0, 0, 0]} color={colors.black}>{item.assignedWorkerName}</ResponsiveText>
                                        </View>
                                    </View>
                                    <View >
                                        <ResponsiveText margin={[5, 0, 10, 10]} color={colors.grey1}>{item.description}</ResponsiveText>
                                    </View>

                                    {item.complainStatus == 'InQueue' ?
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flex: 0 }}>
                                                <ResponsiveText margin={[0, 0, 0, 10]} weight={'bold'} color={colors.black} >Delay Reason:</ResponsiveText>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <ResponsiveText margin={[0, 0, 0, 5]} color={colors.black}>{item.message ? item.message : 'Lorem Impsum'}</ResponsiveText>
                                            </View>
                                        </View>
                                        : null}
                                         {item.userNoMeassage ? 
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flex: 0 }}>
                                                <ResponsiveText margin={[0, 0, 0, 10]} weight={'bold'} color={colors.black} >Not Satisfy Reason:</ResponsiveText>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <ResponsiveText margin={[0, 0, 0, 5]} color={colors.black}>{item.userNoMeassage ? item.userNoMeassage : 'Lorem Impsum'}</ResponsiveText>
                                            </View>
                                        </View>
                                        : null}
                                    <View style={{ alignItems: 'flex-end' }}>
                                        <TouchableOpacity

                                            onPress={() => toggleModal(item.id)}

                                            style={{
                                                alignItems: 'center',
                                                marginTop: 0,
                                                justifyContent: 'center',
                                                height: hp(3.8),
                                                width: wp(20),
                                                marginLeft: 10,
                                                borderRadius: 20,
                                                backgroundColor:item.assignedWorkerName ==null? colors.secondary:colors.green
                                            }} >
                                            <ResponsiveText weight={'bold'} color={colors.white} size={2.7} > {item.assignedWorkerName ==null ? 'Assign' : 'Assigned'}</ResponsiveText>

                                        </TouchableOpacity>

                                        <Modal isVisible={isModalVisible}
                                            animationType="fade"
                                        >
                                            <View style={{ flex: 0.3, backgroundColor: colors.white, borderRadius: 10, }}>
                                                <View style={{ alignItems: 'flex-end' }}>
                                                    {/* <ResponsiveText size={4} margin={[15, 0, 0, 0]}
                                                        textAlign={'center'}
                                                        weight={'bold'}
                                                        color={colors.primary}
                                                    >Assign Work to relevent Worker</ResponsiveText> */}
                                                    <TouchableOpacity onPress={toggleModal}>
                                                        <Icon margin={[10, 20, 10, 5]}
                                                            size={25}
                                                            source={globalPath.cross}
                                                        >
                                                        </Icon>
                                                    </TouchableOpacity>
                                                </View>
                                                <ResponsiveText size={4} margin={[0, 0, 30, 0]}
                                                    textAlign={'center'}
                                                    weight={'bold'}
                                                    color={colors.primary}
                                                >" Assign Work to relevent Worker "</ResponsiveText>
                                                <View>
                                                    <DropDown
                                                        width={wp(70)}
                                                        backgroundColor={colors.grey}
                                                        data={ManagerComplookup.map((v) => v.name)}
                                                        onSelect={(item) => {
                                                            console.log("select", item);
                                                            setValue(item);
                                                            // updateWorker(item)
                                                        }}
                                                    />
                                                </View>
                                                <TouchableOpacity disabled={Value==''}
                                                onPress={() => { updateWorker() }}
                                                    style={{
                                                        alignSelf: 'center',
                                                        marginTop: 15,
                                                        // marginLeft: 10,
                                                        justifyContent: 'center',
                                                        height: hp(5),
                                                        width: wp(25),
                                                        borderRadius: 20,
                                                        backgroundColor:Value==''?colors.grey1: colors.secondary,
                                                    }} ><ResponsiveText weight={'bold'} textAlign={'center'} color={colors.white} size={3} >Save</ResponsiveText>
                                                </TouchableOpacity>
                                            </View>
                                        </Modal>
                                    </View>
                                    {/* } */}
                                </Card>
                                // </TouchableOpacity>
                            )
                        })
                        :
                        (loading == false ?
                            <View style={{ width: wp(100), marginTop: 100, alignItems: 'center', alignSelf: 'center' }}>
                                <Icon borderColor={colors.yellow} borderWidth={0} borderRadius={0} size={250} source={require('../../../assets/icons/norecordfound.png')} />
                            </View> : null
                        )
                    }

                    <View style={{ height: wp(10) }}>

                    </View>
                </ScrollView>
            </View>
            {/* {loading == true ?
                <Loader />
                :
                null
            } */}
        </SafeAreaView>
    )
}

export default ManagerRole;

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