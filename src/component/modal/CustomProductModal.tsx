import { FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextTranslate } from '../custom/Label'
import { style } from '../../styles/style'
import BlurBackground from '../custom/BlurBackground'
import { HStack, useDisclose, VStack } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { metrics, screenWidth } from '../../theme/layouts'
import colors from '../../theme/colors'
import { size } from '../../theme/fonts'
import { Battambang } from '../../services/config/fonts'
import { useAppSelector } from '../../hooks/dispatch'

const CustomProductModal = () => {
    const { isOpen, onClose, onOpen } = useDisclose();
    const lang: any = useAppSelector(state => state.lang);
    const [search, setSearch] = useState('');
    return (
        <View style={{ flex: 1 }}>
            <TextTranslate style={style.labelTextInput}>product</TextTranslate>
            <TouchableOpacity onPress={onOpen} style={styles.button}>
                <Text style={styles.text}>Please select product</Text>
                <Ionicons name='chevron-down-outline' size={screenWidth(25)} color={colors.grayColor} />
            </TouchableOpacity>
            <Modal visible={isOpen} transparent statusBarTranslucent>
                <BlurBackground onPress={onClose} />
                <VStack style={styles.container}>
                    <HStack style={styles.searchContainer}>
                        <Ionicons name='search' size={screenWidth(30)} color={colors.mainColor} />
                        <TextInput
                            placeholder={lang['product_name...']}
                            placeholderTextColor={colors.placeholderColor}
                            style={styles.textInput}
                            autoCorrect={false}
                            value={search}
                            onChangeText={setSearch}
                        />
                    </HStack>
                    <FlatList
                        data={[1, 2, 3, 4, 5]}
                        renderItem={() => {
                            return <TouchableOpacity onPress={onClose} style={{
                                ...style.row,
                                borderBottomColor: colors.lowOpacityGray,
                                borderBottomWidth: screenWidth(1.5),
                                paddingVertical: screenWidth(6)
                            }}>
                                <Image style={styles.image} source={{ uri: 'https://cdn.shopify.com/s/files/1/1414/2498/products/ClassicShirt_FrenchBlue1_1080x.jpg?v=1667207840' }} />
                                <VStack>
                                    <Text style={{
                                        ...styles.smallText,
                                        width: screenWidth(290),
                                        color: colors.black
                                    }}>Fashion amazing mix colors shirt from CamboCo.Ltd</Text>
                                    <Text style={styles.smallText}>Men Clothing & Fashion</Text>
                                </VStack>
                                <Ionicons name={true ? 'checkbox' : 'square-outline'} color={colors.mainColor} size={screenWidth(24)} />
                            </TouchableOpacity>
                        }}
                    />
                    <TouchableOpacity onPress={onClose} style={{
                        padding: screenWidth(5),
                        alignSelf: 'flex-end',
                        marginTop: screenWidth(5)
                    }}>
                        <Text style={{ color: colors.mainColor, fontSize: size.font18 }}>Ok</Text>
                    </TouchableOpacity>
                </VStack>
            </Modal>
        </View>
    )
}

export default CustomProductModal

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: screenWidth(10),
        paddingTop: screenWidth(30),
        paddingBottom: screenWidth(15),
        paddingHorizontal: screenWidth(25),
        marginHorizontal: screenWidth(20),
        marginTop: metrics.screenHeight / 2 - screenWidth(300),
        justifyContent: 'space-between',
        height: screenWidth(600)
    },
    text: {
        fontSize: size.font18,
        color: colors.black,
        ...Battambang
    },
    button: {
        ...style.row,
        paddingRight: screenWidth(15),
        paddingLeft: screenWidth(20),
        backgroundColor: colors.white,
        borderRadius: screenWidth(10),
        height: screenWidth(60),
        ...style.normalShadow
    },
    textInput: {
        flex: 1,
        fontSize: size.font16,
        paddingVertical: screenWidth(10),
        paddingHorizontal: screenWidth(10),
    },
    searchContainer: {
        borderRadius: screenWidth(10),
        borderWidth: screenWidth(1.5),
        borderColor: colors.mainColor,
        height: screenWidth(50),
        alignItems: 'center',
        paddingHorizontal: screenWidth(10),
        marginBottom: screenWidth(10)
    },
    image: {
        width: screenWidth(60),
        height: screenWidth(60),
        borderRadius: screenWidth(10),
        marginRight: screenWidth(10)
    },
    smallText: {
        fontSize: size.font14,
        color: colors.grayColor,
        ...Battambang
    },
})