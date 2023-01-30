import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from './Icon'
import { colors } from '../constants/colorsPallet'
import { globalPath } from '../constants/globalPath'
import { check } from 'yargs'
import ResponsiveText from './RnText'
// import Randomiser from '../screens/Home/BottomTabs/Randomiser/Randomiserrr'

export default function CustomRadioButton(props) {
    const [checked, setCheck] = useState(false);
    const press = () => {
        props.onPress(props.descriptions);
        setCheck(!checked)
    }
    return (
        <TouchableOpacity onPress={press} style={{flexDirection:'row'}} >
            <View style={{
                backgroundColor: checked ? colors.blue : undefined,
                borderRadius: 50,
                marginTop: 10,
                marginLeft: 10,
                borderColor: colors.blue,
                borderWidth: 2, height: 20, width: 20, alignItems: 'center', justifyContent: 'center'
            }}
                 >
                {checked ? <Icon source={globalPath.RADIO_DOT} size={15} tintColor={colors.secondary} /> : <View />}
            </View>
            <ResponsiveText weight={'bold'} size={3.5} margin={[10, 0, 15, 10]}>{props.descriptions}</ResponsiveText>
        </TouchableOpacity>

    )
}
