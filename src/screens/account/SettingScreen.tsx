import { Image, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import BaseComponent from '../../component/BaseComponent';
import { Box, HStack } from 'native-base';
import { TextTranslate } from '../../component/custom/Label';
import { size } from '../../theme/fonts';
import colors from '../../theme/colors';
import { AppImages } from '../../theme/images';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppDispatch, useAppSelector } from '../../hooks/dispatch';
import { padding_horizontal, screenWidth } from '../../theme/layouts';
import { loadLanguage } from '../../redux/actions';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
var kh = require('../../res/lang/kh.json');
var en = require('../../res/lang/en.json');

const SettingScreen = () => {

    const dispatch = useAppDispatch();
    const lang: any = useAppSelector(state => state.lang);
    const [notification, setNotification] = useState(false);
    const [initial, setInitial] = useState(true);

    useEffect(() => {
        if (!initial) onUpdateNotification();
    }, [notification]);

    useEffect(() => {
        getNotification();
    }, []);

    const getNotification = async () => {
        let allow_noti = await AsyncStorage.getItem('allowNotification');
        if (allow_noti != null) {
            if (allow_noti == '1') setNotification(true);
            else setNotification(false);
        } else {
            setNotification(true);
        }
        setTimeout(() => {
            setInitial(false);
        }, 250);
    };

    const onUpdateNotification = async () => {
        if (notification) {
            await messaging().subscribeToTopic('Shop');
        } else {
            await messaging().unsubscribeFromTopic('Shop');
        }
        await AsyncStorage.setItem('allowNotification', notification ? '1' : '0');
    };

    const handleKhmer = async () => {
        await AsyncStorage.setItem('@lang', 'kh');
        dispatch(loadLanguage(kh));
    }

    const handleEnglish = async () => {
        await AsyncStorage.setItem('@lang', 'en');
        dispatch(loadLanguage(en));
    }

    return (
        <BaseComponent title='settings'>
            <HStack justifyContent={'space-between'} style={{
                paddingHorizontal: padding_horizontal,
                paddingTop: screenWidth(30)
            }}>
                <TextTranslate style={styles.text}>notification</TextTranslate>
                <Switch value={notification} onChange={() => setNotification(!notification)} />
            </HStack>
            <TextTranslate style={{
                ...styles.text,
                paddingHorizontal: padding_horizontal,
                paddingTop: screenWidth(20),
                paddingBottom: screenWidth(15),
            }}>select_language</TextTranslate>
            <TouchableOpacity onPress={handleKhmer} style={styles.item}>
                <HStack>
                    <Image source={AppImages.Khmer} style={styles.flagIcon} />
                    <TextTranslate style={styles.label}>khmer</TextTranslate>
                </HStack>
                <MaterialCommunityIcons
                    name={lang?.lang == 'kh' ? 'circle-slice-8' : 'circle-outline'}
                    size={screenWidth(34)}
                    color={lang?.lang == 'kh' ? colors.mainColor : colors.grayColor}
                />
            </TouchableOpacity>
            <Box style={styles.line} />
            <TouchableOpacity onPress={handleEnglish} style={styles.item}>
                <HStack>
                    <Image source={AppImages.english} style={styles.flagIcon} />
                    <TextTranslate style={styles.label}>english</TextTranslate>
                </HStack>
                <MaterialCommunityIcons
                    name={lang?.lang == 'en' ? 'circle-slice-8' : 'circle-outline'}
                    size={screenWidth(34)}
                    color={lang?.lang == 'en' ? colors.mainColor : colors.grayColor}
                />
            </TouchableOpacity>
        </BaseComponent>
    )
}

export default SettingScreen

const styles = StyleSheet.create({
    text: {
        fontSize: size.font22,
        color: colors.black,
    },
    flagIcon: {
        width: screenWidth(40),
        height: screenWidth(30),
        resizeMode: 'cover',
        borderRadius: screenWidth(5),
        marginRight: screenWidth(20),
        marginTop: -screenWidth(3)
    },
    label: {
        color: colors.black,
        fontSize: size.font20
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.white,
        paddingVertical: screenWidth(15),
        paddingHorizontal: screenWidth(20)
    },
    line: {
        height: screenWidth(2),
        backgroundColor: colors.lowOpacityGray,
        alignSelf: 'center',
        width: '80%'
    }
})