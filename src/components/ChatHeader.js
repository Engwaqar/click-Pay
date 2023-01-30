import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from 'react'
import Icon from "./Icon";
import ResponsiveText from "./RnText";
import { globalPath } from "../constants/globalPath";
import { colors } from "../constants/colorsPallet";
import { hp, wp } from "../helpers/Responsiveness";
import { routeName } from "../constants/routeName";
import { useDispatch, useSelector } from "react-redux";
import { GetNotification } from "../redux/actions/user.actions";
export default function ChatHeader(props) {
  const dispatch = useDispatch();
  const Notification = useSelector(state => state.userReducers.notifactionData.data,);
  // const refreshing = useSelector(state => state.userReducers.notifactionData.refreshing);
  const result = Notification.filter(item => item.isRead == false)
  console.log('Notification', result.length)

  // console.log('result', result)


  useEffect(() => {
    dispatch(GetNotification());
  }, [])
  return (
    <View style={{
      flexDirection: "row",
      alignItems: "center",
      // margin: wp(7),
      marginTop: 0,
      height: 50,
      backgroundColor: colors.white,
      // marginHorizontal: 10,
      elevation: 5,
    }}>
      {props.backbutton ? (
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon
            size={30}
            margin={[5, 0, 0, 20]}
            source={globalPath.backArrow}
          />
        </TouchableOpacity>
      ) : null}
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          marginHorizontal: 10,
        }}
      >
        <Icon
          style={{ marginTop: 0 }}
          // size={70}
          height={wp(13)}
          width={wp(20)}
          resizeMode={"contain"}
          source={props.source}
        // source={globalPath.HeaderLogo}

        />
        <View style={{ flex: 1, marginLeft: 0, alignContent: 'center' }}>
          <ResponsiveText color={colors.Orange} size={4}>
            {props.title}
          </ResponsiveText>
          <ResponsiveText margin={[0, 0, 15, 0]} weight={'bold'} color={colors.secondary} size={4.5}>
            {props.status}
          </ResponsiveText>

        </View>
        <TouchableOpacity onPress={() => props.navigation.navigate(routeName.NOTIFACTION_LIST)}>
          <Icon
            style={{ marginTop: 4 }}
            borderRadius={30}
            size={25}
            resizeMode={"contain"}
            source={props.notifaction}

          />
        </TouchableOpacity>
        {/* {props.value ? */}
        <View style={{
          // position: 'absolute',
          backgroundColor: colors.red,
          width: 18,
          height: 18,
          borderRadius: 10,
          zIndex: 1,
          // top: 5, 
          right: 10,

        }}>
          <ResponsiveText textAlign={'center'} color={colors.white}>{result.length}</ResponsiveText>
        </View>
        {/* : null} */}
        <TouchableOpacity
          onPress={() => props.navigation.navigate(routeName.PROFILE_SCREEN)}
        >
          <Icon
            style={{ marginTop: 4, marginRight: 7 }}
            borderRadius={30}
            size={28}
            resizeMode={"contain"}
            source={props.user}

          />
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity style={styles.btnBack}>
        <Icon size={15} source={globalPath.video} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnBack}>
        <Icon size={15} source={globalPath.audio} />
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({

  btnBack: {
    backgroundColor: colors.green5, padding: 12, borderRadius: 45, marginRight: 5
  }
});
