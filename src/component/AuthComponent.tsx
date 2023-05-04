import {
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import React, {ReactNode} from 'react';
import {AppImages} from '../theme/images';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../theme/colors';
import {screenWidth} from '../theme/layouts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {style} from '../styles/style';
import {goBack} from '../services/navigate/navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Box, Center} from 'native-base';
import {useAppSelector} from '../hooks/dispatch';
import SpinnerLoading from './loading/SpinnerLoading';
import {Platform} from 'react-native';

interface Props {
  children: ReactNode;
  disabledBackButton?: boolean;
  onBackPress?: () => void;
}

const AuthComponent: React.FC<Props> = props => {
  const insets = useSafeAreaInsets();
  const loading = useAppSelector(state => state.loading);
  return (
    <>
      <ImageBackground source={AppImages.Background} style={styles.container}>
        <LinearGradient
          colors={['transparent', colors.mainColor, colors.mainColor]}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 0.93,
          }}
        />
        <FlatList
          automaticallyAdjustKeyboardInsets
          showsVerticalScrollIndicator={false}
          data={null}
          renderItem={() => <></>}
          ListHeaderComponent={
            <>
              <Image
                source={AppImages.Logo}
                style={{
                  ...styles.logo,
                  marginTop: screenWidth(50) + insets.top,
                }}
              />
              {props.children}
            </>
          }
        />
        {!props.disabledBackButton && (
          <TouchableOpacity
            onPress={props.onBackPress ?? goBack}
            style={{...styles.button, top: insets.top + screenWidth(15)}}>
            <Ionicons
              name="chevron-back-outline"
              size={screenWidth(30)}
              color={colors.white}
            />
          </TouchableOpacity>
        )}
      </ImageBackground>
      {loading && <SpinnerLoading />}
    </>
  );
};

export default AuthComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    resizeMode: 'stratch',
  },
  logo: {
    width: screenWidth(180),
    height: screenWidth(180),
    alignSelf: 'center',
    marginBottom: screenWidth(30),
  },
  button: {
    position: 'absolute',
    left: screenWidth(30),
    width: screenWidth(45),
    height: screenWidth(45),
    borderRadius: screenWidth(50) / 2,
    backgroundColor: 'rgba(46, 49, 146, 0.3)',
    ...style.center,
    alignSelf: 'flex-start',
  },
});
