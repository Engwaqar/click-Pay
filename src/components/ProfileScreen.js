import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Alert, TouchableOpacity, ScrollView, Image } from 'react-native'
import { colors } from '../constants/colorsPallet'
import ChatHeader from '../components/ChatHeader'
import ResponsiveText from '../components/RnText'
// import Card from '../../components/Card'
import Icon from '../components/Icon'
import { globalPath } from '../constants/globalPath'
import Fonts from '../helpers/Fonts'
import { hp, wp } from '../helpers/Responsiveness'
import { TextProfile } from '../components/TextProfile'
import AsyncStorage from "@react-native-community/async-storage";
import { StackActions } from "@react-navigation/native";
import { routeName } from '../constants/routeName'
import Card from './Card'
import Loader from "../components/loader";
import { useDispatch, useSelector } from "react-redux";
import { GetChild, getProfile } from "../redux/actions/user.actions";
import RnButton from './RnButton'
const ProfileScreen = (props, { navigation }) => {
    const dispatch = useDispatch();
    const GetUserData = useSelector(state => state.userReducers.profileData.data,);
    const refreshing = useSelector(state => state.userReducers.profileData.refreshing);
    useEffect(() => {
        dispatch(getProfile());
    }, [])
    console.log('User Profile', GetUserData)
    const logout = () => {
        Alert.alert("Logout", "Confirm Logout", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            {
                text: "OK",
                onPress: async () => {
                    await AsyncStorage.removeItem('@token');
                    await AsyncStorage.removeItem('@loggedInUserTypeId');
                    await AsyncStorage.removeItem('@userId');
                    // await AsyncStorage.clear();

                    props.navigation.dispatch(StackActions.replace("Auth"));
                },
            },
        ]);
    };
    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <View style={{
                flexDirection: "row",
                marginTop: 20,
                justifyContent: 'space-between'

            }}>

                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Icon
                        size={25}
                        margin={[15, 0, 0, 20]}
                        source={globalPath.backArrow}
                        tintColor={colors.white}
                    />
                </TouchableOpacity>

                <ResponsiveText
                    margin={[15, 0, 5, 15]}
                    alignSelf={'center'}
                    color={colors.textColor}
                    weight={'bold'}
                    size={5}
                >Profile
                </ResponsiveText>
                <TouchableOpacity onPress={(logout)}>
                    <Icon
                        style={{ marginTop: 20, marginRight: 20 }}
                        height={20}
                        width={20}
                        resizeMode={"contain"}
                        source={globalPath.logout}

                    />
                </TouchableOpacity>
            </View>
            {GetUserData.userTypeId == '3' ?
                <TouchableOpacity onPress={() => props.navigation.navigate(routeName.EDIT_PROFILE)}>
                    <View style={{
                        alignSelf: 'flex-end',
                        backgroundColor: colors.white,
                        height: hp(6),
                        width: hp(6),
                        borderRadius: 30,
                        marginRight: 20,
                        justifyContent: 'center',
                        marginTop: 20,
                    }}>
                        <Icon
                            margin={[0, 0, 0, 10]}
                            height={20}
                            width={20}
                            resizeMode={"contain"}
                            source={globalPath.edit}
                            tintColor={colors.secondary}

                        />
                    </View>
                </TouchableOpacity>
                : null}
            <View style={{ alignSelf: 'center', marginTop: 0 }}>
                <Image
                    source={
                        GetUserData.fullPath ? { uri: GetUserData.fullPath } : globalPath.user
                    }
                    style={{
                        borderRadius: 70,
                        height: wp(30),
                        width: wp(30),
                        resizeMode: "contain",
                        backgroundColor: colors.white,
                    }}
                />
            </View>
            <View style={styles.Onlinebadge}></View>
            <View style={{ alignSelf: 'center' }}>
                <ResponsiveText
                    margin={[0, 0, 10, 0]}
                    color={colors.white}
                    weight={'bold'}
                    size={5}
                >{GetUserData.username ? GetUserData.username : 'Lorem Ipsum'}
                </ResponsiveText>
            </View>
            <TouchableOpacity onPress={() => props.navigation.navigate(routeName.CHANGE_PASSWORD)}>
                <View style={{ alignSelf: 'center', backgroundColor: colors.black, borderRadius: 15 }}>
                    <ResponsiveText
                        margin={[5, 10, 7, 10]}
                        color={colors.white}
                        weight={'bold'}
                        size={3.3}
                    >{'Change Password'}
                    </ResponsiveText>
                </View>
            </TouchableOpacity>
            <View style={styles.footer}>
                <ScrollView>
                    <Card style={{ marginHorizontal: 20 }}>
                        <View style={{ flexDirection: 'row', marginTop: 20, }}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='User Name'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={GetUserData.username ? GetUserData.username : 'userName'}
                                    color={colors.black}
                                    size={3.2}

                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Father Name'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile
                                    Title={GetUserData.fatherName ? GetUserData.fatherName : 'fatherName'}
                                    color={colors.black}
                                    size={3.2}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Email'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}

                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={GetUserData.email ? GetUserData.email : 'abc@gmail.com'}
                                    color={colors.black}
                                    size={3.2}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Contact'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}
                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={GetUserData.contactNumber ? GetUserData.contactNumber : '03XX-XXXXXXX'}
                                    color={colors.black}
                                    size={3.2}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Gender'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}
                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={GetUserData.gender ? GetUserData.gender : 'Gender'}
                                    color={colors.black}
                                    size={3.2}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='CNIC'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}
                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile
                                    Title={GetUserData.cnic ? GetUserData.cnic : 'XXXXX-XXXXXXX-X'}
                                    color={colors.black}
                                    size={3.2}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Address'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}
                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title={GetUserData.address ? GetUserData.address : 'Lorem Ipsum'}
                                    color={colors.black}
                                    size={3.2}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                            <View style={styles.Text}>
                                <TextProfile

                                    Title='Country'
                                    color={colors.black}
                                    size={4}
                                    weight={'bold'}
                                />
                            </View>
                            <View style={styles.Text2}>
                                <TextProfile

                                    Title='Pakistan'
                                    color={colors.black}
                                    size={3.2}
                                />
                            </View>
                        </View>
                        {/* <View style={{ marginHorizontal: '25%', marginBottom: '5%' }}>
                            <RnButton
                                // onPress={() => submitData()}
                                // onPress={() => navigation.navigate(routeName.INVOICE_SUBMIT)}
                                backgroundColor={colors.primary}
                                margin={[20, 0, 0, 0]}
                                title={"Next"}
                            />
                        </View> */}
                    </Card>
                </ScrollView>
                {refreshing == true ?
                    <Loader />
                    :
                    null
                }
            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen
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
        top: 5
    },
    Text: {
        flex: 1,
        justifyContent: "center",
        paddingLeft: '10%',
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
    },
    Onlinebadge: {
        height: 15,
        width: 15,
        backgroundColor: colors.lightgreen,
        position: "absolute",
        borderRadius: 10,
        bottom: 20,
        right: 10,
    },
})