import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native'
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
import Loader from "../../components/loader";
import Api from '../../redux/lib/api'
import urls from '../../redux/lib/urls'
const Shuttletiming = ({ navigation }) => {
  const [loading, setLoading] = useState([]);
  const [errorString, setErrorString] = React.useState("");
  const [ShuttleServiceAll, setShuttleServiceAll] = React.useState([]);
  console.log('ShuttleServiceAll', ShuttleServiceAll)
  useEffect(() => {
    GetShuttleServiceAll();
  }, []);
  const GetShuttleServiceAll = async (index, item) => {
    try {
      setLoading(true);
      const res = await Api.get(urls.GET_SHUTTLE_SERVICE);
      console.log('setShuttleServiceAll', res);
      if (res && res.success == true) {
        setLoading(false);
        setShuttleServiceAll(res.data);
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
      dep: '08:00 am',
      Arr: '08:30 am',
    },
    {
      dep: '08:30 am',
      Arr: '09:00 am',
    },
    {
      dep: '09:00 am',
      Arr: '09:30 am',
    },
    {
      dep: '09:30 am',
      Arr: '10:00 am',
    },
    {
      dep: '10:00 am',
      Arr: '10:30 am',
    },
    {
      dep: '10:30 am',
      Arr: '10:30 am',
    },
    {
      dep: '11:00 am',
      Arr: '11:30 am',
    },
    {
      dep: '11:30 am',
      Arr: '12:00 am',
    },
    {
      dep: '12:30 am',
      Arr: '12:30 pm',
    },
    {
      dep: '01:00 pm',
      Arr: '01:30 pm',
    },
    {
      dep: '01:30 pm',
      Arr: '02:00 pm',
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
        margin={[15, 0, 10, 15]}
        color={colors.textColor}
        weight={'bold'}
        size={4}
      >Shuttle Service
      </ResponsiveText>
      <Image
        style={{ flex: 0.5, width: '100%', resizeMode: 'cover' }}
        source={require('../../assets/icons/busbannar.png')}
      />
      <View style={styles.footer}>

        <View style={styles.HeaderText}>
          <View style={styles.Text}>
            <TextProfile

              Title={'Departures Time'}
              color={colors.white}
              size={4}
              weight={'bold'}

            />
          </View>
          <View style={styles.Text2}>
            <TextProfile

              Title={'Arrival Time'}
              color={colors.white}
              size={4}
              weight={'bold'}
            />
          </View>
        </View>

        <ScrollView>
          <Card style={{ marginHorizontal: 20, margin: 0, borderRadius: 0 }}>
            {ShuttleServiceAll.length > 0 ?
              ShuttleServiceAll.map((item) => {
                return (
                  <View>
                    <View style={styles.HeaderText2}>
                      <View style={styles.Text}>
                        <TextProfile

                          Title={item.startFrom}
                          color={colors.black}
                          size={3}
                          weight={'bold'}

                        />
                      </View>
                      <View style={styles.Text2}>
                        <TextProfile

                          Title={item.endIn}
                          color={colors.black}
                          size={3}
                          weight={'bold'}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                      <View style={styles.Text}>
                        <TextProfile

                          Title={item.startTime ? item.startTime : '00:00'}
                          color={colors.black}
                          size={4}
                        />
                      </View>
                      <View style={styles.Text2}>
                        <TextProfile

                          Title={item.endTime ? item.endTime : '00:00'}
                          color={colors.black}
                          size={4}
                        />
                      </View>
                    </View>
                  </View>
                )
              }) : (loading == false ?
                <View style={{ width: wp(100), marginTop: 100, alignItems: 'center', alignSelf: 'center' }}>
                  <Icon borderColor={colors.yellow} borderWidth={0} borderRadius={0} size={250} source={require('../../assets/icons/norecordfound.png')} />
                </View> : null
              )}
          </Card>
        </ScrollView>
        <View style={{ marginBottom: 10 }}>

        </View>
        {loading == true ?
          <Loader />
          :
          null
        }
      </View>
    </SafeAreaView>
  )
}

export default Shuttletiming

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
  Text: {
    flex: 1.2,
    justifyContent: "center",
    paddingLeft: '12%',
    borderBottomWidth: 1,
    borderColor: colors.grey,
  },
  Text2:
  {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.grey,
    borderStartWidth: 1,
    paddingLeft: '12%',
  },
  HeaderText2:
  {
    flexDirection: 'row',
    backgroundColor: colors.lighterGrey,
    marginHorizontal: 10,

  },
  HeaderText: {
    flexDirection: 'row',
    backgroundColor: colors.blue,
    marginHorizontal: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 10
  },
})