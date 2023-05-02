import { StyleSheet, Image, Modal, TextInput, FlatList, TouchableOpacity, Text } from 'react-native'
import React, { useState } from 'react'
import { Center, HStack, VStack } from 'native-base'
import { AppImages } from '../../theme/images'
import { metrics, padding_horizontal, screenWidth } from '../../theme/layouts'
import colors from '../../theme/colors'
import BlurBackground from '../custom/BlurBackground'
import { TextTranslate } from '../custom/Label'
import SubmitButton from '../custom/SubmitButton'
import { size } from '../../theme/fonts'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Battambang } from '../../services/config/fonts'
import { style } from '../../styles/style'

interface Props {
    isOpen: boolean;
    onClose: any;
    firstButton?: any;
    secondButton?: any;
    firstButtonPress?: () => void;
    secondButtonPress?: () => void;
    title?: string;
    subTitle?: string;
    yellow?: boolean;
    image?: any;
    icon?: any;
    value?: any;
    onSelectedChange?: any;
}

const data = [
    {
        id: 1,
        title: 'Product is out stock'
    },
    {
        id: 2,
        title: 'Wrong Price/Price error'
    },
    {
        id: 3,
        title: 'Other'
    },
];

const CustomRejectModal: React.FC<Props> = (props) => {
    const [selected, setSelected] = useState(data[0]);
    return (
        <Modal
            visible={props.isOpen}
            transparent
            statusBarTranslucent
        >
            <BlurBackground onPress={props.onClose} />
            <VStack style={styles.container}>
                <Center style={{
                    height: screenWidth(80),
                    width: screenWidth(80),
                    borderRadius: screenWidth(80),
                    backgroundColor: colors.mainColor,
                    borderWidth: screenWidth(5),
                    borderColor: colors.lightMainColor,
                    alignSelf: 'center'
                }}>
                    <MaterialCommunityIcons name='clipboard-edit-outline' color={colors.white} size={screenWidth(36)} />
                </Center>
                <TextTranslate style={styles.text}>{'please_leave_your_reason_here'}</TextTranslate>
                <FlatList
                    data={data}
                    renderItem={({ item }: any) => {
                        return <TouchableOpacity onPress={() => {
                            setSelected(item);
                            // props.onSelectedChange(item);
                        }} style={styles.itemContainer}>
                            <Text style={styles.textItem}>{item.title}</Text>
                            <MaterialCommunityIcons
                                name={item?.id === selected?.id ? 'circle-slice-8' : 'circle-outline'}
                                color={item?.id === selected?.id ? colors.mainColor : colors.grayColor}
                                size={screenWidth(30)}
                            />
                        </TouchableOpacity>
                    }}
                />
                <TextInput
                    multiline
                    placeholder='Type your reason here'
                    placeholderTextColor={colors.placeholderColor}
                    style={styles.multiLineTextInput}
                />
                <HStack
                    justifyContent={(props.firstButton && props.secondButton) ? 'space-between' : 'center'}
                    style={{
                        marginTop: screenWidth(20)
                    }}>
                    {
                        props.firstButton && <SubmitButton title={props.firstButton}
                            fontSize={size.font18}
                            width={'48%'}
                            height={screenWidth(50)}
                            backgroundColor={colors.white}
                            borderWidth={1.5}
                            borderColor={colors.red}
                            color={colors.red}
                            onPress={props.firstButtonPress}
                        />
                    }
                    {
                        props.secondButton && <SubmitButton
                            fontSize={size.font18}
                            title={props.secondButton}
                            backgroundColor={props.yellow ? colors.yellowColor : colors.mainColor}
                            width={'48%'}
                            height={screenWidth(50)}
                            onPress={props.secondButtonPress}
                        />
                    }
                </HStack>
            </VStack>
        </Modal>
    )
}

export default React.memo(CustomRejectModal)

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: screenWidth(10),
        paddingVertical: screenWidth(30),
        paddingHorizontal: padding_horizontal,
        marginHorizontal: screenWidth(40),
        marginTop: metrics.screenHeight / 2 - screenWidth(270),
        justifyContent: 'space-between'
    },
    image: {
        width: screenWidth(110),
        height: screenWidth(110),
        alignSelf: 'center',
        marginBottom: screenWidth(5),
    },
    boldText: {
        fontSize: size.font22,
        color: colors.black,
        alignSelf: 'center',
        marginTop: screenWidth(10)
    },
    text: {
        fontSize: size.font18,
        color: colors.black,
        alignSelf: 'center',
        marginBottom: screenWidth(15),
        textAlign: 'center',
        marginTop: screenWidth(10)
    },
    multiLineTextInput: {
        fontSize: size.font18,
        color: colors.black,
        ...Battambang,
        backgroundColor: colors.textInputColor,
        height: screenWidth(100),
        padding: screenWidth(20),
        borderRadius: screenWidth(10),
        marginTop: screenWidth(10)
    },
    itemContainer: {
        ...style.row,
        height: screenWidth(60),
        paddingLeft: screenWidth(20),
        paddingRight: screenWidth(15)
    },
    textItem: {
        fontSize: size.font18,
        color: colors.black
    },
})