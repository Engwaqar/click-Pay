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
import urls from '../../redux/lib/urls'
import Api from '../../redux/lib/api';
import moment from 'moment';
import Loader from "../../components/loader";
import { getProfile } from '../../redux/actions/user.actions'
import { useDispatch, useSelector } from "react-redux";
const AllBills = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const GetUserProfile = useSelector(state => state.userReducers.profileData.data,);
  // const title = route.params.data
  console.log('GetUserProfile', GetUserProfile)
  const [Bills, setBills] = useState([]);
  const [loading, setLoading] = useState([]);
  useEffect(() => {
    GetAllbills();
    dispatch(getProfile());
  }, []);
  const GetAllbills = async (index, item) => {
    try {
      setLoading(true);
      const res = await Api.get(urls.GET_ALL_BILLS + GetUserProfile.houseId + '?billid=');
      console.log('All Bills data', res);
      if (res && res.success == true) {
        setLoading(false);
        setBills(res.data);
      } else {
        setLoading(false);
        setErrorString(res.message)
      }
    } catch (error) { }
  };
  const Electricity = [
    {
      id: 1,
      title: 'Electricity',
      url: require('../../assets/icons/electricity.png'),
      Ref: 'UD/AA/123654',
      Amount: '20,900',
      Date: '27/05/22',
      Method: 'JazzCash',
      Unit: '869',
      status: 'Unpaid',
      userName: 'Waqar Ahmad',
    },
    {
      id: 1,
      title: 'Cleaning',
      url: require('../../assets/icons/cleaning.png'),
      Ref: 'UD/AA/123654',
      Amount: '15,900',
      Date: '27/05/22',
      Unit: '469',
      status: 'Unpaid',
      userName: 'Ramzan',

    },
    {
      id: 1,
      title: 'SNGPL',
      url: require('../../assets/icons/gas.png'),
      Ref: 'UD/AA/123654',
      Amount: '19,900',
      Date: '27/05/22',
      Method: 'Mazaan Bank',
      Unit: '1369',
      status: 'Paid',
      userName: 'Wasa Bill water',
    },
    {
      id: 1,
      title: 'Internet',
      url: require('../../assets/icons/internet.png'),
      Ref: 'UD/AA/123654',
      Amount: '17,900',
      Date: '27/05/22',
      Unit: '1469',
      status: 'Paid',
      userName: 'Altaf Hussain',

    },
    {
      id: 1,
      title: 'Internet',
      url: require('../../assets/icons/internet.png'),
      Ref: 'UD/AA/123654',
      Amount: '17,900',
      Date: '27/05/22',
      Unit: '1469',
      status: 'Paid',
      userName: 'Altaf Hussain',

    },
    {
      id: 1,
      title: 'Electricity',
      url: require('../../assets/icons/electricity.png'),
      Ref: 'UD/AA/123654',
      Amount: '20,900',
      Date: '27/05/22',
      Method: 'JazzCash',
      Unit: '869',
      status: 'Unpaid',
      userName: 'Waqar Ahmad',
    },
    {
      id: 1,
      title: 'Electricity',
      url: require('../../assets/icons/electricity.png'),
      Ref: 'UD/AA/123654',
      Amount: '20,900',
      Date: '27/05/22',
      Method: 'JazzCash',
      Unit: '869',
      status: 'Unpaid',
      userName: 'Waqar Ahmad',
    },
  ];
  const gas = [
    {
      id: 1,
      title: 'SNGPL',
      url: require('../../assets/icons/gas.png'),
      Ref: 'UD/AA/123654',
      Amount: '19,900',
      Date: '27/05/22',
      Method: 'Mazaan Bank',
      Unit: '1369',
      status: 'Paid',
      userName: 'Wasa Bill water',
    },
    {
      id: 1,
      title: 'SNGPL',
      url: require('../../assets/icons/gas.png'),
      Ref: 'UD/AA/123654',
      Amount: '9,900',
      Date: '27/05/22',
      Method: 'Hbl Bank',
      Unit: '469',
      status: 'Unpaid',
      userName: 'Wasa Bill water',
    },
    {
      id: 1,
      title: 'SNGPL',
      url: require('../../assets/icons/gas.png'),
      Ref: 'UD/AA/123654',
      Amount: '12,900',
      Date: '27/05/22',
      Method: 'Allied Bank',
      Unit: '369',
      status: 'Paid',
      userName: 'Sui Gas Bill',
    },

  ];
  const Cleaning = [
    {
      id: 1,
      title: 'Cleaning',
      url: require('../../assets/icons/cleaning.png'),
      Ref: 'UD/AA/123654',
      Amount: '15,900',
      Date: '27/05/22',
      Unit: '469',
      status: 'Unpaid',
      userName: 'Ramzan',

    },
    {
      id: 1,
      title: 'Cleaning',
      url: require('../../assets/icons/cleaning.png'),
      Ref: 'UD/AA/123654',
      Amount: '15,900',
      Date: '27/05/22',
      Unit: '469',
      status: 'Unpaid',
      userName: 'Ramzan',

    },
    {
      id: 1,
      title: 'Cleaning',
      url: require('../../assets/icons/cleaning.png'),
      Ref: 'UD/AA/123654',
      Amount: '15,900',
      Date: '27/05/22',
      Unit: '469',
      status: 'Unpaid',
      userName: 'Ramzan',

    },

  ];
  const Internet = [
    {
      id: 1,
      title: 'Internet',
      url: require('../../assets/icons/internet.png'),
      Ref: 'UD/AA/123654',
      Amount: '17,900',
      Date: '27/05/22',
      Unit: '1469',
      status: 'Paid',
      userName: 'Altaf Hussain',

    },
    {
      id: 1,
      title: 'Internet',
      url: require('../../assets/icons/internet.png'),
      Ref: 'UD/AA/123654',
      Amount: '17,900',
      Date: '27/05/22',
      Unit: '1469',
      status: 'Paid',
      userName: 'Altaf Hussain',

    },
    {
      id: 1,
      title: 'Internet',
      url: require('../../assets/icons/internet.png'),
      Ref: 'UD/AA/123654',
      Amount: '17,900',
      Date: '27/05/22',
      Unit: '1469',
      status: 'Paid',
      userName: 'Altaf Hussain',

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
      >All Bills
      </ResponsiveText>
      <View style={styles.footer}>
        <ScrollView>
          {/* <View style={{ backgroundColor: colors.lighterGrey,marginHorizontal: 15,marginTop:15 }}>
            <ResponsiveText
              margin={[5, 0, 10, 15]}
              color={colors.red}
              weight={'bold'}
              size={4}
            >Electricity Bills
            </ResponsiveText>
          </View> */}

          {Bills.length > 0 ?
            Bills.map((item) => {
              return (
                <Card flexDirection='row' style={{ margin: 5, marginHorizontal: 15, top: 5 }}>
                  <View style={{ justifyContent: 'center' }}>
                    <Icon margin={[0, 0, 0, 5]}
                      size={30}
                      source={item.billTitle == 'Electricity' ? globalPath.ElectricityImg : item.billTitle == 'Internet' ? globalPath.InternetImg : item.billTitle == 'Gas' ? globalPath.SNGPLImg : item.billTitle == 'Water' ? globalPath.water : item.billTitle == 'Cable' ? globalPath.CleaningImg : null}
                    />
                  </View>
                  <View>
                    <View style={{ flexDirection: 'row' }}>
                      <ResponsiveText margin={[0, 0, 0, 10]} weight={'bold'} color={colors.blue3} flex={0.5}>User Name</ResponsiveText>
                      <ResponsiveText margin={[0, 0, 0, 10]} weight={'bold'} color={colors.blue3} flex={0.5}>{item.ownerName}</ResponsiveText>
                      <ResponsiveText margin={[0, 10, 0, 0]} weight={'bold'} color={item.billStatus == 'Paid' ? colors.green : colors.red} >{item.billStatus}</ResponsiveText>
                    </View>
                    <ResponsiveText margin={[0, 0, 5, 10]} color={colors.grey1}>...............................................................................</ResponsiveText>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ flex: 0.7 }}>
                        <ResponsiveText margin={[0, 0, 0, 10]} weight={'bold'} color={colors.black} >Bill For</ResponsiveText>
                        <ResponsiveText margin={[0, 0, 0, 10]} color={colors.grey1} >{item.billTitle}</ResponsiveText>
                      </View>
                      <View style={{ flex: 0.6 }}>
                        <ResponsiveText margin={[0, 0, 0, 0]} weight={'bold'} color={colors.red}  >Due Date</ResponsiveText>
                        <ResponsiveText margin={[0, 0, 0, 0]} color={colors.grey1} >{moment(item.withinDueDate).format("MM/DD/YY")}</ResponsiveText>
                      </View>
                      <View style={{ flex: 0.6 }}>
                        <ResponsiveText margin={[0, 0, 0, 0]} weight={'bold'} color={colors.black}  >Payable</ResponsiveText>
                        <ResponsiveText margin={[0, 0, 0, 0]} color={colors.grey1} >{parseFloat(item.withinBillAmount).toFixed(2)}</ResponsiveText>
                      </View>
                      <TouchableOpacity style={styles.timestyle}
                        onPress={() => navigation.navigate(routeName.DETAILS_SCREEN, { item: item.id })}
                      >
                        <ResponsiveText color={colors.white} size={2.9}>
                          Detail
                        </ResponsiveText>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Card>
              )
            }) : (loading == false ?
              <View style={{ width: wp(100), marginTop: 100, alignItems: 'center', alignSelf: 'center' }}>
                <Icon borderColor={colors.yellow} borderWidth={0} borderRadius={0} size={250} source={require('../../assets/icons/norecordfound.png')} />
              </View> : null
            )}

          {/* <View style={{ backgroundColor: colors.lighterGrey,marginTop:15,marginHorizontal: 15, }}>
            <ResponsiveText
              margin={[5, 0, 10, 15]}
              color={colors.red}
              weight={'bold'}
              size={4}
            >Gas Bills
            </ResponsiveText>
          </View>
          {gas.map((item) => {
            return (
              <Card flexDirection='row' style={{ margin: 5, marginHorizontal: 15, top: 5 }}>
                <View style={{ justifyContent: 'center' }}>
                  <Icon margin={[0, 0, 0, 5]}
                    size={30}
                    source={item.url}
                  />
                </View>
                <View>
                  <View style={{ flexDirection: 'row' }}>
                    <ResponsiveText margin={[0, 0, 0, 10]} weight={'bold'} color={colors.blue3} flex={0.5}>User Name</ResponsiveText>
                    <ResponsiveText margin={[0, 0, 0, 10]} weight={'bold'} color={colors.blue3} flex={0.5}>{item.userName}</ResponsiveText>
                    <ResponsiveText margin={[0, 10, 0, 0]} weight={'bold'} color={item.status == 'Paid' ? colors.primary : colors.red} >{item.status}</ResponsiveText>
                  </View>
                  <ResponsiveText margin={[0, 0, 5, 10]} color={colors.grey1}>...............................................................................</ResponsiveText>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 0.7 }}>
                      <ResponsiveText margin={[0, 0, 0, 10]} weight={'bold'} color={colors.black} >Bill For</ResponsiveText>
                      <ResponsiveText margin={[0, 0, 0, 10]} color={colors.grey1} >{item.title}</ResponsiveText>
                    </View>
                    <View style={{ flex: 0.6 }}>
                      <ResponsiveText margin={[0, 0, 0, 0]} weight={'bold'} color={colors.red}  >Due Date</ResponsiveText>
                      <ResponsiveText margin={[0, 0, 0, 0]} color={colors.grey1} >{item.Date}</ResponsiveText>
                    </View>
                    <View style={{ flex: 0.6 }}>
                      <ResponsiveText margin={[0, 0, 0, 0]} weight={'bold'} color={colors.black}  >Payable</ResponsiveText>
                      <ResponsiveText margin={[0, 0, 0, 0]} color={colors.grey1} >{item.Amount}</ResponsiveText>
                    </View>
                    <TouchableOpacity style={styles.timestyle}
                      onPress={() => navigation.navigate(routeName.DETAILS_SCREEN)}
                    >
                      <ResponsiveText color={colors.white} size={2.9}>
                        Pay
                      </ResponsiveText>
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            )
          })}
           <View style={{ backgroundColor: colors.lighterGrey,marginTop:15,marginHorizontal: 15, }}>
            <ResponsiveText
              margin={[5, 0, 10, 15]}
              color={colors.red}
              weight={'bold'}
              size={4}
            >Internet Bills
            </ResponsiveText>
          </View>
          {Internet.map((item) => {
            return (
              <Card flexDirection='row' style={{ margin: 5, marginHorizontal: 15, top: 5 }}>
                <View style={{ justifyContent: 'center' }}>
                  <Icon margin={[0, 0, 0, 5]}
                    size={30}
                    source={item.url}
                  />
                </View>
                <View>
                  <View style={{ flexDirection: 'row' }}>
                    <ResponsiveText margin={[0, 0, 0, 10]} weight={'bold'} color={colors.blue3} flex={0.5}>User Name</ResponsiveText>
                    <ResponsiveText margin={[0, 0, 0, 10]} weight={'bold'} color={colors.blue3} flex={0.5}>{item.userName}</ResponsiveText>
                    <ResponsiveText margin={[0, 10, 0, 0]} weight={'bold'} color={item.status == 'Paid' ? colors.primary : colors.red} >{item.status}</ResponsiveText>
                  </View>
                  <ResponsiveText margin={[0, 0, 5, 10]} color={colors.grey1}>...............................................................................</ResponsiveText>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 0.7 }}>
                      <ResponsiveText margin={[0, 0, 0, 10]} weight={'bold'} color={colors.black} >Bill For</ResponsiveText>
                      <ResponsiveText margin={[0, 0, 0, 10]} color={colors.grey1} >{item.title}</ResponsiveText>
                    </View>
                    <View style={{ flex: 0.6 }}>
                      <ResponsiveText margin={[0, 0, 0, 0]} weight={'bold'} color={colors.red}  >Due Date</ResponsiveText>
                      <ResponsiveText margin={[0, 0, 0, 0]} color={colors.grey1} >{item.Date}</ResponsiveText>
                    </View>
                    <View style={{ flex: 0.6 }}>
                      <ResponsiveText margin={[0, 0, 0, 0]} weight={'bold'} color={colors.black}  >Payable</ResponsiveText>
                      <ResponsiveText margin={[0, 0, 0, 0]} color={colors.grey1} >{item.Amount}</ResponsiveText>
                    </View>
                    <TouchableOpacity style={styles.timestyle}
                      onPress={() => navigation.navigate(routeName.DETAILS_SCREEN)}
                    >
                      <ResponsiveText color={colors.white} size={2.9}>
                        Pay
                      </ResponsiveText>
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            )
          })}
           <View style={{ backgroundColor: colors.lighterGrey,marginTop:15,marginHorizontal: 15, }}>
            <ResponsiveText
              margin={[5, 0, 10, 15]}
              color={colors.red}
              weight={'bold'}
              size={4}
            >Cleaning Bills
            </ResponsiveText>
          </View>
          {Cleaning.map((item) => {
            return (
              <Card flexDirection='row' style={{ margin: 5, marginHorizontal: 15, top: 5 }}>
                <View style={{ justifyContent: 'center' }}>
                  <Icon margin={[0, 0, 0, 5]}
                    size={30}
                    source={item.url}
                  />
                </View>
                <View>
                  <View style={{ flexDirection: 'row' }}>
                    <ResponsiveText margin={[0, 0, 0, 10]} weight={'bold'} color={colors.blue3} flex={0.5}>User Name</ResponsiveText>
                    <ResponsiveText margin={[0, 0, 0, 10]} weight={'bold'} color={colors.blue3} flex={0.5}>{item.userName}</ResponsiveText>
                    <ResponsiveText margin={[0, 10, 0, 0]} weight={'bold'} color={item.status == 'Paid' ? colors.primary : colors.red} >{item.status}</ResponsiveText>
                  </View>
                  <ResponsiveText margin={[0, 0, 5, 10]} color={colors.grey1}>...............................................................................</ResponsiveText>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 0.7 }}>
                      <ResponsiveText margin={[0, 0, 0, 10]} weight={'bold'} color={colors.black} >Bill For</ResponsiveText>
                      <ResponsiveText margin={[0, 0, 0, 10]} color={colors.grey1} >{item.title}</ResponsiveText>
                    </View>
                    <View style={{ flex: 0.6 }}>
                      <ResponsiveText margin={[0, 0, 0, 0]} weight={'bold'} color={colors.red}  >Due Date</ResponsiveText>
                      <ResponsiveText margin={[0, 0, 0, 0]} color={colors.grey1} >{item.Date}</ResponsiveText>
                    </View>
                    <View style={{ flex: 0.6 }}>
                      <ResponsiveText margin={[0, 0, 0, 0]} weight={'bold'} color={colors.black}  >Payable</ResponsiveText>
                      <ResponsiveText margin={[0, 0, 0, 0]} color={colors.grey1} >{item.Amount}</ResponsiveText>
                    </View>
                    <TouchableOpacity style={styles.timestyle}
                      onPress={() => navigation.navigate(routeName.DETAILS_SCREEN)}
                    >
                      <ResponsiveText color={colors.white} size={2.9}>
                        Pay
                      </ResponsiveText>
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            )
          })} */}
          <View style={{ height: wp(10) }}>

          </View>

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

export default AllBills;
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
  },
  timestyle: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    justifyContent: "center",
    height: hp(5),
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: colors.secondary,
    marginTop: 2
  },

})