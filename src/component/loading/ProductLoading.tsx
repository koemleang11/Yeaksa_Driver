import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, HStack, VStack } from 'native-base'
import { padding_horizontal, screenWidth } from '../../theme/layouts'
import colors from '../../theme/colors'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';
import { style } from '../../styles/style'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const LoadingCardItem = (props: any) => {
    return (
        <HStack style={[styles.whiteBox, { marginTop: props.marginTop ? props.marginTop : screenWidth(3) }]}>
            <HStack alignItems={'center'}>
                <ShimmerPlaceholder style={styles.image} />
                <VStack justifyContent={'center'}>
                    <ShimmerPlaceholder style={styles.longText} />
                    <ShimmerPlaceholder style={styles.text} />
                    <ShimmerPlaceholder style={{ ...styles.longText, width: screenWidth(80), marginBottom: 0 }} />
                </VStack>
            </HStack>
            <Box style={{
                paddingVertical: screenWidth(5),
                marginRight: -screenWidth(4),
                height: screenWidth(85),
                justifyContent: 'space-between'
            }}>
                <Entypo name='dots-three-vertical' color={colors.lightGrayColor} size={screenWidth(22)} />
                <FontAwesome5 name='box-open' color={colors.lightGrayColor} size={screenWidth(16)} />
            </Box>
        </HStack>
    )
}

export default React.memo(LoadingCardItem)

const styles = StyleSheet.create({
    whiteBox: {
        backgroundColor: colors.white,
        borderRadius: screenWidth(10),
        height: screenWidth(100),
        marginBottom: screenWidth(15),
        ...style.normalShadow,
        alignItems: 'center',
        paddingHorizontal: screenWidth(10),
        justifyContent: 'space-between'
    },
    image: {
        height: screenWidth(80),
        width: screenWidth(80),
        borderRadius: screenWidth(10),
        marginRight: screenWidth(10),
    },
    text: {
        height: screenWidth(12),
        borderRadius: screenWidth(2),
        width: screenWidth(140),
        marginBottom: screenWidth(15)
    },
    longText: {
        height: screenWidth(12),
        borderRadius: screenWidth(2),
        width: screenWidth(200),
        marginBottom: screenWidth(15)
    },
    obsolute: {
        position: 'absolute',
        bottom: screenWidth(14),
        right: screenWidth(20),
        width: screenWidth(255),
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})