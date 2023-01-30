import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
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
import { TextProfile } from '../../components/TextProfile'
import Api from '../../redux/lib/api'
import urls from '../../redux/lib/urls'
import Loader from "../../components/loader";
import RnButton from '../../components/RnButton'
import AsyncStorage from '@react-native-community/async-storage'
import Modal from "react-native-modal";
import Input from "../../components/Input";
import { _toast } from '../../constants/Index'

const ComplaintsDetails = ({ navigation, route }) => {
    const id = route.params.item
    const GetWorkerComplaints = route.params.GetWorkerComplaints
    console.log('id', id)
    // console.log('GetWorkerComplaints', GetWorkerComplaints)
    const [isModalVisible, setModalVisible] = useState(false);
    const [ComplaintsText, setComplaintsText] = useState('');


    const toggleModal = (id) => {
        setModalVisible(!isModalVisible);
        // setSelectedComplainid(id)
    };
    // console.log('GetWorkerComplaints', GetWorkerComplaints)
    const [GetComplaintsDetail, setGetComplaintsDetail] = useState([]);
    const [loading, setLoading] = useState(false);
    const [UserType, setUserType] = useState(false);
    const [errorString, setErrorString] = React.useState("");
    console.log('GetComplaintsDetailTest', GetComplaintsDetail)
    console.log('userType', UserType)
    useEffect(() => {
        getuserType();
    }, []);
    const getuserType = async () => {
        const userType = await AsyncStorage.getItem("@loggedInUserTypeId");
        setUserType(userType)
        if (userType=='3') {
        GetAllComplaintsDetail(urls.GET_COMPLAINT_DETAIL_USER);
            
        } else {
        GetAllComplaintsDetail(urls.GET_COMPLAINT_DETAIL);
            
        }
    }
    const GetAllComplaintsDetail = async (url) => {
        try {
            setLoading(true);
            const res = await Api.get(url + id);
            console.log('AllComplaintsdetail', res)
            if (res && res.success == true) {
                setLoading(false);
                setGetComplaintsDetail(res.data[0]);

            } else {
                setLoading(false);
                setErrorString(res.message)
            }
        } catch (error) {
            console.error(error);
        }
    };
    const ComplaintStatus = async (id, status) => {
        var obj = {
            "assignedComplainStatus": status,
            "message": ComplaintsText
        }
        try {
            setLoading(true);
            const res = await Api.put(urls.UPDATE_COMPLAINT_STATUS + id, obj);
            console.log('ComplaintUpdate', res);
            if (res && res.success == true) {
                setLoading(false);
                navigation.goBack()
                GetWorkerComplaints()
                setComplaintsText('')
                _toast("Late Reason successfully Submitted")

            } else {
                setLoading(false);
                setErrorString(res.message)
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right", 'bottom']}>
            <ChatHeader
                backbutton
                notifaction={globalPath.notifaction}
                value={'1'}
                user={globalPath.user}
                navigation={navigation}
            />
            <View style={{ alignItems: 'center' }}>
                <Icon margin={[5, 0, 10, 10]}
                    size={170}
                    // source={globalPath.cpLogo}
                    // source={globalPath.AskariDetaillogo}
                    // source={globalPath.SuiGasSplash}
                    // source={globalPath.PunjabLogo}
                    // source={globalPath.ParkViewInner}
                    // source={globalPath.StateLifeInner}
                    // source={globalPath.NLCdetaillogo}
                    source={globalPath.Clicksplashlogo}


                >
                </Icon>
            </View>
            <ScrollView>
                <View style={styles.footer}>
                    {/* <View style={{ flexDirection: 'row', marginTop: 15, marginHorizontal: 10 }}>
                        <View style={{ flex: 1, }}>
                            <Card>
                                <ResponsiveText margin={[0, 0, 0, 0]} textAlign={'center'} weight={'bold'} color={colors.black}>Name</ResponsiveText>
                                <ResponsiveText margin={[0, 0, 10, 0]} textAlign={'center'} weight={'bold'} color={colors.secondary}>{GetComplaintsDetail.complainerName}</ResponsiveText>

                            </Card>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Card>
                                <ResponsiveText margin={[0, 0, 0, 0]} textAlign={'center'} weight={'bold'} color={colors.black}>House#:</ResponsiveText>
                                <ResponsiveText margin={[0, 0, 10, 0]} textAlign={'center'} weight={'bold'} color={colors.secondary}>{GetComplaintsDetail.houseNo}</ResponsiveText>

                            </Card>
                        </View>
                    </View> */}
                    <Card>
                        <View style={{ flexDirection: 'row', marginTop: 10, borderBottomWidth: 1, borderBottomColor: colors.lightWhite }}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Complaints By'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={GetComplaintsDetail.complainerName}
                                    color={colors.grey1}
                                    size={3.2}

                                />
                            </View>
                        </View>
                        <View style={styles.Text3}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='House#'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={GetComplaintsDetail.houseNo}
                                    color={colors.grey1}
                                    size={3.2}

                                />
                            </View>
                        </View>
                        <View style={styles.Text3}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Block#'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={GetComplaintsDetail.blockName}
                                    color={colors.grey1}
                                    size={3.2}

                                />
                            </View>
                        </View>
                        <View style={styles.Text3}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Complaint Date'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={GetComplaintsDetail.createdDate}
                                    color={colors.grey1}
                                    size={3.2}

                                />
                            </View>
                        </View>
                        <View style={styles.Text3}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Complaint Time'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={GetComplaintsDetail.time}
                                    color={colors.grey1}
                                    size={3.2}

                                />
                            </View>
                        </View>
                        <View style={styles.Text3}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Ticket Number'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={GetComplaintsDetail.ticketNo}
                                    color={colors.grey1}
                                    size={3.2}

                                />
                            </View>
                        </View>
                        <View style={styles.Text3}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Complaint Category'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={GetComplaintsDetail.complainName}
                                    color={colors.grey1}
                                    size={3.2}

                                />
                            </View>
                        </View>
                        <View style={styles.Text3}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Complaint Status'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={GetComplaintsDetail.complainStatus}
                                    color={colors.grey1}
                                    size={3.2}

                                />
                            </View>
                        </View>
                        {/* <View style={styles.Text3}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Complaint Assigned to'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={GetComplaintsDetail.assignedManagerName ? GetComplaintsDetail.assignedManagerName : 'Lorem Impsum'}
                                    color={colors.grey1}
                                    size={3.2}

                                />
                            </View>
                        </View> */}
                        {/* <View style={styles.Text3}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Expected Dead line'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={"15-Jun-2020 Dummy"}
                                    color={colors.grey1}
                                    size={3.2}

                                />
                            </View>
                        </View> */}
                        {/* <View style={styles.Text4}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Complaint Resolved'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={GetComplaintsDetail.assignedWorkerName ? GetComplaintsDetail.assignedWorkerName : 'Lorem Impsum'}
                                    color={colors.grey1}
                                    size={3.2}

                                />
                            </View>
                        </View> */}

                    </Card>
                    <Card>
                        <View style={{ marginTop: 10 }} >
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Complaint Detail'
                                    color={colors.green}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={{ flex: 1, marginLeft: 20 }}>
                                <TextProfile

                                    Title={GetComplaintsDetail.description}
                                    color={colors.grey1}
                                    size={3.2}

                                />
                            </View>
                        </View>
                        {/* <View style={{ marginTop: 10 }} >
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Additional Detail'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={{ flex: 1, marginLeft: 15 }}>
                                <TextProfile

                                    Title={"Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis"}
                                    color={colors.grey1}
                                    size={3.2}

                                />
                            </View>
                        </View> */}
                    </Card>
                    {UserType == "4" ?
                        <View>
                            <View style={{ marginHorizontal: '30%', flexDirection: 'row', justifyContent: 'center' }}>
                                <RnButton
                                    onPress={() => ComplaintStatus(GetComplaintsDetail.id, 2)}
                                    // onPress={() => navigation.goBack()}
                                    backgroundColor={colors.primary}
                                    margin={[20, 10, 0, 0]}
                                    title={"InProcess"}
                                />
                                <RnButton
                                    onPress={() => ComplaintStatus(GetComplaintsDetail.id, 3)}
                                    backgroundColor={colors.primary}
                                    margin={[20, 0, 0, 0]}
                                    title={"Fixed"}
                                />

                            </View>
                            <View style={{ marginHorizontal: '30%', flexDirection: 'row', justifyContent: 'center' }}>
                                <RnButton
                                    onPress={() => toggleModal()}
                                    // onPress={() => navigation.goBack()}
                                    backgroundColor={colors.primary}
                                    margin={[20, 10, 0, 0]}
                                    title={"Delay Reason"}
                                />

                            </View>
                            <View style={{ height: hp(35) }}>

                            </View>
                            <Modal isVisible={isModalVisible}
                                animationType="fade"
                            >
                                <View style={{ flex: 0, backgroundColor: colors.white, borderRadius: 10, }}>
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
                                        color={colors.red}
                                    >" Please describe the Delay Reason"</ResponsiveText>
                                    <View
                                        style={{
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 0,
                                            },
                                            shadowOpacity: 0.29,
                                            shadowRadius: 4.65,

                                            elevation: 3,
                                            borderRadius: 10,
                                            marginTop: 0,

                                            backgroundColor: colors.white,
                                            marginHorizontal: 10
                                        }}
                                    >
                                        <Input
                                            placeholder={"Message"}
                                            width={wp(80)}
                                            height={hp(18)}
                                            inputHeight={hp(15)}
                                            padding={[0, 0, 0, 25]}
                                            margin={[0, 0, 0, 0]}
                                            multiline={true}
                                            // secureTextEntry
                                            onChnageText={(text) => setComplaintsText(text)}
                                        //  value={ComplaintsText}
                                        //   leftIcon={globalPath.Lock}
                                        />
                                    </View>
                                    <TouchableOpacity
                                        disabled={!ComplaintsText}
                                        onPress={() => { ComplaintStatus(GetComplaintsDetail.id, 4) }}
                                        style={{
                                            alignSelf: 'center',
                                            // marginTop: 20,
                                            // marginLeft: 10,
                                            marginVertical: 20,
                                            justifyContent: 'center',
                                            height: hp(5),
                                            width: wp(25),
                                            borderRadius: 20,
                                            backgroundColor: colors.secondary,
                                        }} ><ResponsiveText weight={'bold'} textAlign={'center'} color={colors.white} size={3} >Save</ResponsiveText>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                        </View>
                        : null}


                </View>
                {loading == true ?
                    <Loader />
                    :
                    null
                }
            </ScrollView>
        </SafeAreaView >
    )
}

export default ComplaintsDetails;
const styles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: colors.secondary,
    },
    footer: {
        flex: 1,
        backgroundColor: colors.lightWhite,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    timestyle: {
        backgroundColor: colors.yellow1,
        borderRadius: 5,
        justifyContent: "center",
        height: hp(7),
        marginHorizontal: '25%',
        borderWidth: 1.5,
        borderColor: colors.yellow,
        marginTop: 5,
        alignItems: 'center'
    },
    Text: {
        flex: 1,
        justifyContent: "center",
        paddingLeft: '5%'
    },
    Text2:
    {
        flex: 0.7,
        justifyContent: "center",
        padding: 5,
    },
    Text3: {
        flexDirection: 'row',
        marginTop: 4,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightWhite
    },
    Text4: {
        flexDirection: 'row',
        marginTop: 4,
    },
})