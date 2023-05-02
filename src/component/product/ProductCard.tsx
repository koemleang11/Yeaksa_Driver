import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { Box, HStack, useDisclose, VStack } from 'native-base'
import colors from '../../theme/colors'
import { screenWidth } from '../../theme/layouts'
import { style } from '../../styles/style'
import { Battambang } from '../../services/config/fonts'
import { size } from '../../theme/fonts'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Octicons from 'react-native-vector-icons/Octicons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FastImage from 'react-native-fast-image'
import { formatter } from '../../services/utils/format'
import { AppImages } from '../../theme/images'

interface Props {
    image: any;
    name: string;
    category: string;
    price: any;
    quantity: string;
    onPress?: () => void;
    onEdit?: any;
    onPublish?: any;
}

const ProductCard: React.FC<Props> = (props) => {

    const { isOpen, onClose, onOpen } = useDisclose();

    return (
        <HStack style={styles.container}>
            <FastImage style={styles.image} source={props.image ? { uri: props.image } : AppImages.Logo}>
                <Octicons
                    name={'check-circle-fill'}
                    size={screenWidth(20)}
                    color={colors.green}
                    style={{ backgroundColor: colors.white, borderRadius: screenWidth(14), overflow: 'hidden' }}
                />
            </FastImage>
            <VStack flex={1} style={{
                height: screenWidth(100),
                justifyContent: 'space-between',
                paddingVertical: screenWidth(10)
            }}>
                <HStack justifyContent='space-between'>
                    <VStack justifyContent={'flex-start'}>
                        <Text style={styles.title}>{`${props.name}`}</Text>
                        <Text style={{ ...styles.subtitle, color: colors.grayColor }}>{`${props.category}`}</Text>
                    </VStack>
                    <TouchableOpacity onPress={onOpen} style={{ paddingVertical: screenWidth(5), marginRight: -screenWidth(4) }}>
                        <Entypo name='dots-three-vertical' color={colors.black} size={screenWidth(22)} />
                    </TouchableOpacity>
                </HStack>
                <HStack alignItems={'center'} justifyContent={'space-between'}>
                    <Text style={{ ...styles.title, fontSize: size.font16 }}>{`${formatter.format(props.price)}`}</Text>
                    <HStack alignItems={'center'}>
                        <FontAwesome5 name='box-open' color={colors.grayColor} size={screenWidth(16)} />
                        <Text style={{ ...styles.subtitle, color: colors.grayColor, marginHorizontal: screenWidth(5) }}>{`${props.quantity}`}</Text>
                    </HStack>
                </HStack>
            </VStack>
            {
                isOpen && <Box style={{
                    height: screenWidth(100),
                    backgroundColor: colors.lowOpacityBlack,
                    borderRadius: screenWidth(10),
                    position: 'absolute',
                    flexDirection: 'row',
                    right: 0,
                    left: 0,
                    alignItems: 'flex-end'
                }}>
                    <TouchableOpacity onPress={onClose}>
                        <Box style={{ width: screenWidth(320), height: screenWidth(100) }} />
                    </TouchableOpacity>
                    <Box style={{
                        backgroundColor: colors.white,
                        borderRadius: screenWidth(10),
                        width: screenWidth(120)
                    }}>
                        <TouchableOpacity onPress={() => {
                            onClose();
                            props.onPublish();
                        }} style={{
                            height: screenWidth(50),
                            ...style.center,
                        }}>
                            <Text>Publish</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            onClose();
                            props.onEdit();
                        }} style={{
                            height: screenWidth(50),
                            ...style.center,
                        }}>
                            <Text>Edit</Text>
                        </TouchableOpacity>
                    </Box>
                </Box>
            }
        </HStack>
    )
}

export default React.memo(ProductCard)

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: screenWidth(10),
        height: screenWidth(100),
        marginBottom: screenWidth(15),
        ...style.normalShadow,
        alignItems: 'center',
        paddingHorizontal: screenWidth(10)
    },
    image: {
        height: screenWidth(80),
        width: screenWidth(80),
        borderRadius: screenWidth(10),
        marginRight: screenWidth(10),
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: screenWidth(4)
    },
    title: {
        ...Battambang,
        color: colors.black,
        fontSize: size.font18,
    },
    subtitle: {
        ...Battambang,
        color: colors.black,
        fontSize: size.font14
    }
})