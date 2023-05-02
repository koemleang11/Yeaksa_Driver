import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Text,
} from 'react-native';
import React from 'react';
import {Box, Center, HStack, VStack} from 'native-base';
import colors from '../theme/colors';
import {screenWidth} from '../theme/layouts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextTranslate} from './custom/Label';
import {size} from '../theme/fonts';
import {style} from '../styles/style';
import {goBack, navigate} from '../services/navigate/navigation';
import {Battambang} from '../services/config/fonts';
import SpinnerLoading from './loading/SpinnerLoading';
import {useAppSelector} from '../hooks/dispatch';
import {Routes} from '../temp/Routes';

interface Props {
  children?: any;
  title?: string;
  style?: any;
  keyboardBackgroundColor?: any;
  disabledCloseKeyboard?: boolean;
  disabledTranstate?: boolean;
  enabledAdd?: boolean;
  onAdd?: () => void;
  disabledLoading?: boolean;
}

const BaseComponent: React.FC<Props> = props => {
  const loading = useAppSelector(state => state.loading);
  return (
    <>
      <SafeAreaView style={{backgroundColor: colors.white}}></SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      <HStack
        style={{
          ...styles.header,
          paddingTop: StatusBar.currentHeight,
          height: screenWidth(60) + StatusBar.currentHeight!,
        }}>
        <TouchableOpacity
          onPress={() => navigate(Routes.Dashboard)}
          style={styles.button}>
          <Ionicons
            name="chevron-back-outline"
            size={screenWidth(30)}
            color={colors.grayColor}
          />
        </TouchableOpacity>
        {props.disabledTranstate ? (
          <Text style={styles.title}>{props.title}</Text>
        ) : (
          <Text style={styles.title}>{props.title}</Text>
        )}
        {props.enabledAdd ? (
          <TouchableOpacity onPress={props.onAdd} style={styles.button}>
            <AntDesign
              name="pluscircleo"
              size={screenWidth(28)}
              color={colors.mainColor}
            />
          </TouchableOpacity>
        ) : (
          <Box style={{...styles.button, backgroundColor: 'transparent'}} />
        )}
      </HStack>
      <KeyboardAvoidingView
        enabled
        style={{
          flex: 1,
          backgroundColor: props.keyboardBackgroundColor
            ? props.keyboardBackgroundColor
            : colors.backgroundColor,
        }}
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : undefined}>
        <TouchableWithoutFeedback
          disabled={props.disabledCloseKeyboard}
          onPress={() => Keyboard.dismiss()}>
          <VStack style={props.style}>{props.children}</VStack>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <>{!props.disabledLoading && loading && <SpinnerLoading />}</>
    </>
  );
};

export default BaseComponent;

const styles = StyleSheet.create({
  button: {
    width: screenWidth(45),
    height: screenWidth(45),
    borderRadius: screenWidth(50) / 2,
    backgroundColor: colors.lowOpacityMain,
    ...style.center,
  },
  header: {
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: screenWidth(20),
    ...style.normalShadow,
    marginBottom: screenWidth(2),
  },
  title: {
    fontSize: size.font22,
    color: colors.black,
    ...Battambang,
  },
});
