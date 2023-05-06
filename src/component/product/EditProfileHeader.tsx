import {Box, Center, HStack, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import colors from '../../theme/colors';
import {AppImages} from '../../theme/images';
import {padding_horizontal, screenWidth} from '../../theme/layouts';
import {size} from '../../theme/fonts';
import {style} from '../../styles/style';
import FastImage from 'react-native-fast-image';
import {goBack, navigate} from '../../services/navigate/navigation';
import {Routes} from '../../temp/Routes';
import {TextTranslate} from '../custom/Label';
import Entypo from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const EditProfileHeader = (props: any) => {
  const [notification, setNotification] = useState(false);

  const onPress = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
    }).then(async (image: any) => {});
  };
  return (
    <View>
      <StatusBar translucent={false} backgroundColor={colors.white} />
      <HStack style={styles.container}>
        <TouchableOpacity onPress={() => goBack()} style={styles.goBackButton}>
          <Ionicons
            name="chevron-back-outline"
            size={screenWidth(30)}
            color={colors.grayColor}
          />
        </TouchableOpacity>
        <TextTranslate style={styles.title}>{props.title}</TextTranslate>
      </HStack>
      <HStack style={styles.profileContainer}>
        <HStack>
          <Center>
            <FastImage
              source={AppImages.Sunchhay}
              style={styles.profile}></FastImage>
            <Box style={styles.active}>
              <TouchableOpacity onPress={onPress} style={styles.button}>
                <Entypo
                  name="camera"
                  size={screenWidth(22)}
                  color={colors.mainColor}
                />
              </TouchableOpacity>
            </Box>
          </Center>

          <VStack>
            <Text style={styles.name}>ReakSmey Sunchhay</Text>
            <Text style={styles.name}>Code: 000123</Text>
          </VStack>
        </HStack>
      </HStack>
    </View>
  );
};

export default EditProfileHeader;

const styles = StyleSheet.create({
  container: {
    height: screenWidth(150),
    backgroundColor: colors.white,
    width: screenWidth(480),
    paddingHorizontal: padding_horizontal,
  },
  profileContainer: {
    height: screenWidth(120),
    backgroundColor: colors.mainColor,
    marginTop: screenWidth(-70),
    marginHorizontal: screenWidth(20),
    borderRadius: screenWidth(8),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: padding_horizontal,
    ...style.normalShadow,
    marginBottom: screenWidth(20),
  },
  profile: {
    width: screenWidth(70),
    height: screenWidth(70),
    overflow: 'hidden',
    borderRadius: screenWidth(50),
  },
  icon: {
    height: screenWidth(30),
    width: screenWidth(30),
  },
  title: {
    fontSize: size.font24,
    color: colors.black,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenWidth(5),
  },
  name: {
    paddingLeft: screenWidth(20),
    color: colors.white,
    fontSize: size.font20,
  },
  subtitle: {
    color: colors.white,
  },
  active: {
    marginTop: screenWidth(12),
    marginLeft: screenWidth(68),
  },
  button: {
    backgroundColor: colors.white,
    width: screenWidth(28),
    height: screenWidth(28),
    borderRadius: screenWidth(40),
    ...style.center,
    position: 'absolute',
    bottom: screenWidth(5),
    right: 0,
  },
  goBackButton: {
    marginRight: screenWidth(20),
    width: screenWidth(45),
    height: screenWidth(45),
    borderRadius: screenWidth(50) / 2,
    backgroundColor: colors.lowOpacityMain,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
