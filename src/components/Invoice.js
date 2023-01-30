import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { globalPath } from "../constants/globalPath";
import ResponsiveText from '../components/RnText'
import { colors } from "../constants/colorsPallet";
import { hp, wp } from "../helpers/Responsiveness";
import Input from "../components/Input";
import ImagePicker from "react-native-image-crop-picker";
import Card from './Card'
const Invoice = (props) => {

    return (
        // <View style={styles.middlebar}>
        <TouchableOpacity style={[styles.middle_images, { backgroundColor: props.colors }]}
            onPress={(props.onPress)}>
            <Image
                source={props.source}
                style={{
                    height: hp(10),
                    width: hp(40),
                    resizeMode: "contain",
                }}
            />
            <View style={{ alignItems: 'center' }}>
                <ResponsiveText
                    flex={0}
                    // weight={'bold'}
                    size={5}
                    margin={[0, 0, 0, 10]}
                    color={colors.grey5}
                >{props.Text}
                </ResponsiveText>

                <ResponsiveText
                    flex={0}
                    weight={'bold'}
                    size={6}
                    margin={[10, 10, 0, 10]}
                    color={colors.primary}
                >Rs:<ResponsiveText
                    flex={0}
                    weight={'bold'}
                    size={6}
                    margin={[10, 10, 0, 10]}
                    color={colors.primary}
                >{props.AmountText}
                    </ResponsiveText>
                </ResponsiveText>
                <ResponsiveText
                    flex={0}
                    weight={'bold'}
                    size={3.5}
                    margin={[10, 10, 0, 10]}
                    color={colors.grey5}
                >{props.Text1}
                </ResponsiveText>
                <ResponsiveText
                    flex={0}
                    weight={'bold'}
                    size={3.5}
                    margin={[10, 10, 0, 10]}
                    color={colors.grey5}
                >This No: <ResponsiveText
                    flex={0}
                    weight={'bold'}
                    size={3.5}
                    margin={[10, 10, 0, 10]}
                    color={colors.grey5}
                >{props.Text2}
                    </ResponsiveText>
                </ResponsiveText>
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        source={props.logo}
                        style={{
                            marginTop: 13,
                            height: hp(5),
                            width: hp(8),
                            resizeMode: "contain",
                        }}
                    />
                    <ResponsiveText
                        flex={0}
                        weight={'bold'}
                        size={5}
                        margin={[20, 10, 0, 10]}
                        color={colors.grey5}
                    >{props.logoText}
                    </ResponsiveText>
                </View>
            </View>
        </TouchableOpacity>

        // </View>
    )
}

export default Invoice

const styles = StyleSheet.create({
    middlebar: {
        flexDirection: "row",
        backgroundColor: colors.red,

        // alignItems: "center",
        padding: 10,
        // borderTopRightRadius: 25,
        paddingHorizontal: hp(1),
        // alignSelf: "center",
        marginVertical: 10
    },
    Middle_Text: {
        fontSize: 11,
        fontWeight: "bold",
        marginTop: 0,
        textAlign: "center",
        color: colors.red,
    },

    middle_images: {
        alignSelf: 'center',
        marginVertical: '10%'

    },
})