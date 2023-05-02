import { StyleSheet, Image, Modal } from 'react-native'
import React from 'react'
import { Center, HStack, VStack } from 'native-base'
import { AppImages } from '../../theme/images'
import { metrics, screenWidth } from '../../theme/layouts'
import colors from '../../theme/colors'
import BlurBackground from '../custom/BlurBackground'
import { TextTranslate } from '../custom/Label'
import SubmitButton from '../custom/SubmitButton'
import { size } from '../../theme/fonts'

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
}

const CustomModal: React.FC<Props> = (props) => {
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
          {props.icon}
        </Center>
        <TextTranslate style={styles.boldText}>{props.title}</TextTranslate>
        <TextTranslate style={styles.text}>{props.subTitle}</TextTranslate>
        <HStack
          justifyContent={(props.firstButton && props.secondButton) ? 'space-between' : 'center'}
          style={{
            marginTop: screenWidth(10)
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

export default React.memo(CustomModal)

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: screenWidth(10),
    paddingVertical: screenWidth(30),
    paddingHorizontal: screenWidth(45),
    marginHorizontal: screenWidth(40),
    marginTop: metrics.screenHeight / 2 - screenWidth(180),
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
    fontSize: size.font20,
    color: colors.black,
    alignSelf: 'center',
    marginBottom: screenWidth(15),
    textAlign: 'center'
  }
})