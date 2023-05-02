import { FlatList, StyleSheet, Text } from 'react-native';
import React, { useEffect } from 'react';
import BaseComponent from '../../component/BaseComponent';
import FastImage from 'react-native-fast-image';
import { metrics, padding_horizontal, screenWidth } from '../../theme/layouts';
import colors from '../../theme/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { style } from '../../styles/style';
import { Box } from 'native-base';
import { TextTranslate } from '../../component/custom/Label';
import { size } from '../../theme/fonts';
import { Battambang } from '../../services/config/fonts';
import SubmitButton from '../../component/custom/SubmitButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { navigate } from '../../services/navigate/navigation';
import { Routes } from '../../temp/Routes';
import { useAppSelector } from '../../hooks/dispatch';

const MyProfileScreen = () => {
  const insets = useSafeAreaInsets();

  const profileState = useAppSelector(state => state.profile.data);

  return (
    <BaseComponent title="my_profile" style={styles.container} disabledCloseKeyboard>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={null}
        renderItem={() => <></>}
        ListHeaderComponent={
          <Box width={metrics.screenWidth - padding_horizontal * 2} alignItems="center">
            <FastImage
              source={{
                uri: profileState?.profile,
              }}
              style={styles.profile}>
              {!profileState?.profile && (
                <FontAwesome
                  name="image"
                  size={screenWidth(40)}
                  color={colors.grayColor}
                />
              )}
            </FastImage>
            <Box style={styles.whiteBox}>
              <Box style={styles.textContainer}>
                <TextTranslate style={styles.label}>first_name</TextTranslate>
                <Text style={styles.text}>{profileState.name}</Text>
              </Box>
              <Box style={styles.textContainer}>
                <TextTranslate style={styles.label}>last_name</TextTranslate>
                <Text style={styles.text}>{profileState.name}</Text>
              </Box>
              <Box style={styles.textContainer}>
                <TextTranslate style={styles.label}>email_address</TextTranslate>
                <Text style={styles.text}>{profileState.account_name}</Text>
              </Box>
              <Box style={{ ...styles.textContainer, borderBottomWidth: 0 }}>
                <TextTranslate style={styles.label}>phone_number</TextTranslate>
                <Text style={styles.text}>{profileState.phone}</Text>
              </Box>
            </Box>
          </Box>}
      />
      <SubmitButton
        title="edit_profile"
        borderRadius={screenWidth(50)}
        width={'100%'}
        marginTop={screenWidth(20)}
        marginBottom={screenWidth(25) + insets.bottom}
        onPress={() => navigate(Routes.EditProfile)}
      />
    </BaseComponent>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: padding_horizontal,
    justifyContent: 'space-between',
  },
  whiteBox: {
    backgroundColor: colors.white,
    paddingHorizontal: screenWidth(25),
    paddingTop: screenWidth(25),
    borderRadius: screenWidth(10),
    width: '100%',
    ...style.normalShadow,
  },
  profile: {
    width: screenWidth(140),
    height: screenWidth(140),
    borderRadius: screenWidth(140) / 2,
    borderColor: colors.white,
    borderWidth: screenWidth(5),
    backgroundColor: colors.lowOpacityGray,
    marginVertical: screenWidth(30),
    ...style.center,
    ...style.normalShadow,
  },
  button: {
    backgroundColor: colors.white,
    width: screenWidth(36),
    height: screenWidth(36),
    borderRadius: screenWidth(40),
    ...style.center,
    position: 'absolute',
    bottom: screenWidth(5),
    right: 0,
  },
  textContainer: {
    borderBottomWidth: screenWidth(1.5),
    borderBottomColor: colors.lowOpacityGray,
    paddingBottom: screenWidth(10),
    marginBottom: screenWidth(15),
  },
  label: {
    color: colors.grayColor,
    fontSize: size.font18,
  },
  text: {
    color: colors.black,
    fontSize: size.font18,
    ...Battambang,
  },
});
