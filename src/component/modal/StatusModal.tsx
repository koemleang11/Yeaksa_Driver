import { StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { Box, VStack } from 'native-base'
import { AppImages } from '../../theme/images'
import { metrics, screenWidth } from '../../theme/layouts'
import colors from '../../theme/colors'
import { TextTranslate } from '../custom/Label'
import { size } from '../../theme/fonts'
import LottieView from 'lottie-react-native'

interface Props {
  isOpen: boolean;
  onClose: any;
  title?: string;
  subTitle?: string;
  isSuccess?: boolean;
}

const StatusModal: React.FC<Props> = (props) => {
  return (
    <Modal
      visible={props.isOpen}
      transparent
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={props.onClose}>
        <Box style={styles.modalContainer} />
      </TouchableWithoutFeedback>
      <VStack style={styles.container}>
        <LottieView
          source={props.isSuccess ? AppImages.Check : AppImages.Cross}
          style={styles.image}
          resizeMode='contain'
          autoPlay
        />
        <TextTranslate style={{ ...styles.boldText, color: props.isSuccess ? colors.green : colors.red }}>{props.title}</TextTranslate>
        <TextTranslate style={styles.text}>{props.subTitle}</TextTranslate>
      </VStack>
    </Modal>
  )
}

export default React.memo(StatusModal)

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: screenWidth(10),
    paddingBottom: screenWidth(25),
    paddingHorizontal: screenWidth(45),
    marginHorizontal: screenWidth(60),
    marginTop: metrics.screenHeight / 2 - screenWidth(180),
    justifyContent: 'space-between'
  },
  image: {
    height: screenWidth(200),
    width: screenWidth(200),
    alignSelf: 'center'
  },
  boldText: {
    fontSize: size.font28,
    color: colors.green,
    alignSelf: 'center',
    marginTop: -screenWidth(20)
  },
  text: {
    fontSize: size.font22,
    color: colors.grayColor,
    alignSelf: 'center',
    marginBottom: screenWidth(20),
    marginTop: screenWidth(5),
    textAlign: 'center'
  },
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
})