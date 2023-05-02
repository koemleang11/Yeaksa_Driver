import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import colors from '../../theme/colors';
import {metrics, screenWidth} from '../../theme/layouts';
import {size} from '../../theme/fonts';
import {LabelButtonTab} from '../custom/Label';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {style} from '../../styles/style';
import {tabBarItem} from '../../temp/TabBar';
import {AppImages} from '../../theme/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Center} from 'native-base';
import {useAppSelector} from '../../hooks/dispatch';
import {color} from 'native-base/lib/typescript/theme/styled-system';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export function CustomTabBar({state, descriptors, navigation}: any) {
  const insets = useSafeAreaInsets();
  const lang: any = useAppSelector(state => state.lang);

  return (
    <ImageBackground
      source={AppImages.MainTabBG}
      style={[
        styles.container,
        {
          bottom: insets.bottom,
          display: state.index == 2 || state.index == 4 ? 'none' : 'flex',
        },
      ]}>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index.toString()}
            activeOpacity={tabBarItem[index].id === 2 ? 1 : 0.8}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              ...styles.button,
              paddingBottom:
                lang?.lang == 'kh' ? screenWidth(5) : screenWidth(10),
            }}>
            {tabBarItem[index].id === 2 ? (
              <>
                <View style={styles.uniqueButton}>
                  <Image
                    source={AppImages.Dashboard}
                    style={{
                      height: 30,
                      width: 30,
                      tintColor: colors.mainColor,
                    }}
                  />
                </View>
                <LabelButtonTab
                  style={{
                    ...styles.text,
                    position: 'absolute',
                    bottom: screenWidth(5),
                    opacity: isFocused ? 1 : 0.5,
                  }}>
                  {tabBarItem[index].name}
                </LabelButtonTab>
              </>
            ) : (
              <>
                <Image
                  source={tabBarItem[index].icon}
                  style={{...styles.icon, opacity: isFocused ? 1 : 0.5}}
                />
                <LabelButtonTab
                  style={{...styles.text, opacity: isFocused ? 1 : 0.5}}>
                  {tabBarItem[index].name}
                </LabelButtonTab>
              </>
            )}
          </TouchableOpacity>
        );
      })}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: screenWidth(110),
    right: 0,
    left: 0,
  },
  button: {
    width: metrics.screenWidth / 5,
    ...style.center,
    justifyContent: 'flex-end',
  },
  uniqueButton: {
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: screenWidth(45),
    width: screenWidth(80),
    height: screenWidth(80),
    borderRadius: screenWidth(80) / 2,
    borderWidth: screenWidth(7),
    borderColor: colors.lightMainColor,
    ...style.center,
    ...style.normalShadow,
  },
  text: {
    color: colors.white,
    fontSize: size.font14,
  },
  icon: {
    height: screenWidth(25),
    width: screenWidth(25),
    marginBottom: screenWidth(10),
    resizeMode: 'contain',
  },
});
