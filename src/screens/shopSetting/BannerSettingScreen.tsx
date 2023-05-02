import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import BaseComponent from '../../component/BaseComponent'
import { padding_horizontal, screenWidth } from '../../theme/layouts'
import FastImage from 'react-native-fast-image'
import Octicons from 'react-native-vector-icons/Octicons'
import colors from '../../theme/colors'
import { style } from '../../styles/style'
import ImagePicker from 'react-native-image-crop-picker'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Box } from 'native-base'

const BannerSettingScreen = () => {

  const [banner, setBanner] = useState<any>();

  const onPress = async () => {
    ImagePicker.openPicker({
      width: screenWidth(440),
      height: screenWidth(230),
      cropping: true
    }).then(image => {
      setBanner(image)
      console.log(image.path);
    });
  }

  return (
    <BaseComponent title='banner_setting' style={styles.container}>
      <FastImage source={{ uri: banner?.path }} style={styles.image}>
        {
          !banner?.path && <Box style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FontAwesome
              name='image'
              size={screenWidth(60)}
              color={colors.grayColor}
            />
          </Box>
        }
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Octicons name='pencil' size={screenWidth(20)} />
          <Text style={styles.textButton}>Edit</Text>
        </TouchableOpacity>
      </FastImage>
    </BaseComponent>
  )
}

export default BannerSettingScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: padding_horizontal,
    paddingVertical: padding_horizontal
  },
  image: {
    width: '100%',
    height: screenWidth(230),
    borderRadius: screenWidth(15),
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: screenWidth(15),
    paddingRight: screenWidth(15),
    backgroundColor: colors.lowOpacityGray
  },
  button: {
    ...style.row,
    justifyContent: 'center',
    width: screenWidth(90),
    backgroundColor: colors.white,
    paddingVertical: screenWidth(5),
    borderRadius: screenWidth(40)
  },
  textButton: {
    marginLeft: screenWidth(10)
  }
})