import React from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { hp, wp } from "../../helpers/Responsiveness";
import ResponsiveText from "./RnText";
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image'
import { colors } from "../constants/colorsPallet";
import { globalPath } from '../../constants/globalPath'

// import Svg, { Defs, LinearGradient, Stop } from 'react-native-svg';
import { useSelector } from 'react-redux';


const addBanner = (props) => {
    //   const addBanner = useSelector(state => state.appReducers.addBanner.data);

    return (
        <>
            {props.data.length === undefined ? undefined : (
                <Swiper
                    showsButtons={false}
                    // autoplay={true}
                    autoplayTimeout={2.5}
                    removeClippedSubviews={true}
                    autoplayDirection={true}
                    animated={true}
                    key={props.data.length}
                    activeDot={
                        <View
                            style={{
                                backgroundColor: colors.secondary,
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                marginLeft: 3,
                                marginRight: 3,
                                marginTop: 3,
                                marginBottom: -20,
                            }}
                        />
                    }
                    dot={
                        <View
                            style={{
                                backgroundColor: colors.white,
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                marginLeft: 3,
                                marginRight: 3,
                                marginTop: 3,
                                marginBottom: -20,
                            }}
                        />
                    }>
                    {props.data.map((item, index) => {
                        return (
                            <View style={{ flex: 1 }}>
                                {item.fullPath ?
                                    <FastImage
                                        imageStyle={{ opacity: 1 }}
                                        style={styles.advertisementBannerImage}
                                        source={{ uri: item.fullPath }}
                                    >
                                        <View style={styles.advertisementBannerTitleOverlay}>

                                        </View>
                                    </FastImage>
                                    :
                                    <FastImage
                                        imageStyle={{ opacity: 1 }}
                                        style={styles.advertisementBannerImage}
                                        source={item}
                                    >
                                        <View style={styles.advertisementBannerTitleOverlay}>

                                        </View>
                                    </FastImage>}
                            </View>
                        );
                    })}
                </Swiper>
            )}
        </>
    );
};

export default addBanner;

const styles = StyleSheet.create({
    advertisementBannerImage: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    advertisementBannerTitleOverlay: {
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,

        // backgroundColor:  'rgba(52, 52, 52, 0.7)',
        opacity: 1,
        padding: 10,
    },
});
