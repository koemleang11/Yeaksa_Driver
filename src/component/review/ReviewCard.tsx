import { Image, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../theme/colors'
import { screenWidth } from '../../theme/layouts'
import { Avatar, HStack, VStack } from 'native-base'
import { AppImages } from '../../theme/images'
import { Battambang } from '../../services/config/fonts'
import { size } from '../../theme/fonts'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { style } from '../../styles/style'

const ReviewCard = () => {
    const [enabled, setEnabled] = useState(false);
    return (
        <TouchableOpacity style={styles.container}>
            <HStack alignItems={'flex-start'}>
                <HStack style={{ alignItems: 'center', flex: 1 }}>
                    <Avatar
                        source={AppImages.Sunchhay}
                        size={screenWidth(40)}
                        style={{ marginRight: screenWidth(10), marginTop: screenWidth(5) }}
                    />
                    <VStack>
                        <Text numberOfLines={1} style={styles.title}>Reaksmey Sunchhay</Text>
                        <HStack>
                            {
                                [...Array(5)].map(() => {
                                    return <Ionicons name='star' size={screenWidth(14)} color={colors.yellowColor} style={{ paddingHorizontal: screenWidth(2) }} />
                                })
                            }
                        </HStack>
                    </VStack>
                </HStack>
                <VStack alignItems={'flex-end'}>
                    <Switch value={enabled} onChange={() => setEnabled(!enabled)} />
                    <Text style={{ ...styles.date, marginTop: screenWidth(10) }}>31/08/2023, 11:11 AM</Text>
                </VStack>
            </HStack>
            <HStack justifyContent={'space-between'}>
                <Text numberOfLines={3} style={styles.description}>Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using content here, content here, making it look like readable English.</Text>
                <Image style={styles.image} source={{ uri: 'data:image/jpeg;base64,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' }} />
            </HStack>
        </TouchableOpacity>
    )
}

export default React.memo(ReviewCard)

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: screenWidth(10),
        paddingHorizontal: screenWidth(20),
        paddingVertical: screenWidth(15),
        marginBottom: screenWidth(15)
    },
    title: {
        ...Battambang,
        fontSize: size.font18,
        color: colors.black,
        width: screenWidth(260),
    },
    date: {
        ...Battambang,
        fontSize: size.font14,
        color: colors.grayColor
    },
    image: {
        width: screenWidth(70),
        height: screenWidth(70),
        borderRadius: screenWidth(10)
    },
    description: {
        color: colors.grayColor,
        fontSize: size.font16,
        width: screenWidth(310),
    }
})