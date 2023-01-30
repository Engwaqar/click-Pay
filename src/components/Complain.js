import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { globalPath } from "../constants/globalPath";
import ResponsiveText from '../components/RnText'
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../constants/colorsPallet";
import { hp, wp } from "../helpers/Responsiveness";
const Complain = (props) => {
    return (
        // <View style={styles.middlebar}>
        <TouchableOpacity style={[styles.middle_images, { backgroundColor: props.colors }]}
            onPress={(props.onPress)}>
            <Image
                source={props.source}
                style={{
                    height: hp(15),
                    width: hp(40),
                    resizeMode: "contain",
                }}
            />
            <View style={{ alignItems: 'center' }}>
                <ResponsiveText
                    flex={0}
                    weight={'bold'}
                    size={5}
                    margin={[10, 0, 0, 10]}
                    color={colors.black}
                >{props.Text}
                </ResponsiveText>

                <ResponsiveText
                    flex={0}
                    weight={'bold'}
                    textAlign={'center'}
                    size={5}
                    margin={[10, 0, 0, 0]}
                    color={colors.primary}
                >{props.AmountText}
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
                    color={colors.secondary}
                >{props.Text2}
                </ResponsiveText>
                <View style={{ flexDirection: 'row' }}>
                    <ResponsiveText
                        flex={0.5}
                        weight={'bold'}
                        size={4}
                        margin={[20, 10, 0, 10]}
                        color={colors.grey5}
                    >{props.EmailId}
                    </ResponsiveText>
                    <ResponsiveText
                        flex={0}
                        // weight={'bold'}
                        size={4}
                        margin={[20, 10, 0, 10]}
                        color={colors.grey5}
                    >{props.Email}
                    </ResponsiveText>

                </View>
                <View style={{ flexDirection: 'row' }}>
                    <ResponsiveText
                        flex={0.6}
                        weight={'bold'}
                        size={4}
                        margin={[20, 10, 0, 10]}
                        color={colors.grey5}
                    >{props.Mobile}
                    </ResponsiveText>
                    <ResponsiveText
                        flex={0}
                        // weight={'bold'}
                        size={4}
                        margin={[20, 10, 0, 10]}
                        color={colors.grey5}
                    >{props.MobileNo}
                    </ResponsiveText>

                </View>
            </View>
        </TouchableOpacity>

        // </View>
    )
}

export default Complain

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