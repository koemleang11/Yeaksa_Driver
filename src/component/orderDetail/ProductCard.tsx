import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { HStack, VStack } from 'native-base'
import FastImage from 'react-native-fast-image'
import { screenWidth } from '../../theme/layouts'
import colors from '../../theme/colors'
import { size } from '../../theme/fonts'
import Octicons from 'react-native-vector-icons/Octicons'

interface Props {
    disabledCheck?: boolean;
}

const ProductCard: React.FC<Props> = (props) => {
    return (
        <HStack style={{ marginBottom: screenWidth(10) }}>
            <HStack alignItems='center'>
                {
                    !props.disabledCheck && <Octicons
                        name={'check-circle-fill'}
                        size={screenWidth(25)}
                        color={colors.mainColor}
                        style={{ marginRight: screenWidth(12) }}
                    />
                }
                <FastImage source={{ uri: 'https://rukminim1.flixcart.com/image/612/612/xif0q/t-shirt/y/t/k/xxs-t653-cgblwh-eyebogler-original-imaghyjv7kppbqxb.jpeg?q=70' }} style={{
                    width: screenWidth(65),
                    height: screenWidth(65),
                    borderRadius: screenWidth(10),
                    marginRight: screenWidth(10),
                }} />
            </HStack>
            <VStack flex={1} style={{
                borderBottomColor: colors.lowOpacityGray,
                borderBottomWidth: screenWidth(1.5),
                paddingBottom: screenWidth(10)
            }}>
                <Text numberOfLines={1} style={styles.title}>Amanzarae golden Cambodian</Text>
                <Text style={styles.title}>Black/S</Text>
                <HStack justifyContent={'space-between'}>
                    <Text style={styles.title}>$120.00</Text>
                    <Text style={styles.title}>Qty:02</Text>
                </HStack>
            </VStack>
        </HStack>
    )
}

export default ProductCard

const styles = StyleSheet.create({
    title: {
        fontSize: size.font16,
        color: colors.black,
        paddingVertical: screenWidth(1)
    }
})