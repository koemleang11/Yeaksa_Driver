import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { BlurView } from '@react-native-community/blur'
import { Box } from 'native-base'
import colors from '../../theme/colors'


const BlurBackground = (props: any) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Box style={styles.container} />
            {/* <BlurView
                style={styles.absolute}
                blurAmount={10}
                reducedTransparencyFallbackColor={'rgba(22, 22, 22, 0.8)'}
            /> */}
        </TouchableWithoutFeedback>
    )
}

export default BlurBackground

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
})