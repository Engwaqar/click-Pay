import React, { version } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { colors } from "../constants/colorsPallet";
import { hp, wp } from "../helpers/Responsiveness";
import ResponsiveText from "./RnText";
import moment from "moment";
import Icon from "./Icon";
const DashBoardCard = (props) => {
  return (
    <TouchableOpacity
      disabled={!props.disabled ? props.disabled : true}
      style={styles.container1}
      onPress={props.onPress}
    >
      <View style={{ flexDirection: 'row' }}>
        {props.source ? (
          <Icon
            margin={[5, 0, 0, 10]}
            size={40}
            tintColor={props.tintColor}
            source={props.source}
          />
        ) : null}
        {props.value ?
          <View style={{
            // position: 'absolute',
            backgroundColor: colors.Orange,
            width: 19,
            height: 19,
            borderRadius: 10,
            zIndex: 1,
            // top: 5, 
            right: 10,
            alignSelf: "center"

          }}>
            <ResponsiveText textAlign={'center'} color={colors.white}>{props.value}</ResponsiveText>
          </View>
          : null}
      </View>
      <ResponsiveText
        margin={[0, 0, 0, 10]}
        color={colors.black1}
        weight={"bold"}
        size={3.8} >
        {props.Title}
      </ResponsiveText>
      <ResponsiveText
        margin={[0, 0, 0, 10]}
        weight={props.weight}
        size={3}
        color={colors.grey1}
      >
        {props.subTitle}
      </ResponsiveText>

    </TouchableOpacity>
  );
};
export { DashBoardCard };
const styles = StyleSheet.create({
  container1: {
    elevation: 9,
    shadowColor: colors.green,
    shadowOpacity: 0.2,
    // flexDirection: "row",
    height: hp(15),
    // width:wp(40),
    shadowOffset: {
      width: 0,
      height: 0,
    },
    backgroundColor: colors.white,
    // marginHorizontal: 40,
    borderRadius: 10,
    marginTop: 5,
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    margin: 5,

  },
});
