import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,Image,
    TouchableOpacity,
    Alert,
} from "react-native";
import { hp, wp } from "../helpers/Responsiveness";
import { colors } from "../constants/colorsPallet";
import ResponsiveText from "./RnText";
import { globalPath } from "../constants/globalPath";
import Icon from "./Icon";
import ImagePicker from "react-native-image-crop-picker";
import PlainCard from "../components/AddPicCard";
import RnButton from "./RnButton";

const AddPicCard = (props) => {
    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log(image);
            props.setImg(image)


        });
    }
    const takephotofromgallary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image.cropRect);
            props.setImg(image)
        });
    }
    const toggel = () => {
        Alert.alert(props.alter_title?props.alter_title:"Profile Image",props.alter_body?props.alter_body:"change profile Image",
         [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            {
                text: "Select from gallary",
                onPress: async () => {
                    takephotofromgallary();
                },
            },
            {
                text: "Select from Camera",
                onPress: async () => {
                    takePhotoFromCamera();
                },
            },
        ]);
    };
    return (
        <PlainCard>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <ResponsiveText weight={'bold'} margin={[hp(2), 0, 0, 0]}>{props.title}</ResponsiveText>
                {props.source == null ?

                    <View style={{ borderWidth: 1, borderColor: colors.grey1, height: hp(15), width: wp(70), marginTop: hp(5), alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={()=>toggel()}
                            style={{ backgroundColor: colors.grey7, height: wp(20), width: wp(20), alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}>
                            <Icon size={35} source={globalPath.Camera} />
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{ borderWidth: 1, borderColor: colors.grey1, height: hp(15), width: wp(70), marginTop: hp(5), alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ height: wp(30), width: wp(50) }} source={{ uri: props.source.path == undefined ? props.source : props.source.path }} />
                        {/* <Image source={{ uri: img2.path }} /> */}
                    </View>
                }
                <View style={{ marginTop: hp(1) }}>
                    <RnButton
                        width={wp(40)}
                        height={hp(4)}
                        textColor={'black'}
                        backgroundColor={colors.lightYellow}
                        margin={[10, 0, 0, 0]}
                        title={"Add Photo"}
                        onPress={()=>toggel()}

                    />
                </View>
            </View>
        </PlainCard>



    );
};
export default AddPicCard;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },

});
