import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {BattambangBold} from '../../services/config/fonts';
import colors from '../../theme/colors';
import {size} from '../../theme/fonts';
import {padding_horizontal, screenWidth} from '../../theme/layouts';
import {TextTranslate} from '../custom/Label';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export function MyTabBar({state, descriptors, navigation, position}: any) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: padding_horizontal,
        paddingVertical: screenWidth(20),
      }}>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

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

        const inputRange = state.routes.map((_: any, i: any) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i: any) => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            style={{
              ...styles.button,
              backgroundColor: isFocused
                ? colors.mainColor
                : colors.lowOpacityMain,
            }}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            {index == 0 ? (
              <>
                <Text
                  style={{
                    ...styles.title,
                    color: isFocused ? colors.lightGrayColor : colors.mainColor,
                  }}>
                  Completed
                </Text>
              </>
            ) : (
              <>
                <Text
                  style={{
                    ...styles.title,
                    color: isFocused ? colors.lightGrayColor : colors.mainColor,
                  }}>
                  Rejected
                </Text>
              </>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: screenWidth(10),
    backgroundColor: colors.mainColor,
    width: '48%',
    height: screenWidth(60),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: screenWidth(15),
  },
  title: {
    color: colors.lightGrayColor,
    fontSize: size.font18,
  },
  value: {
    color: colors.white,
    fontSize: size.font24,
    ...BattambangBold,
    marginBottom: -screenWidth(10),
  },
});
