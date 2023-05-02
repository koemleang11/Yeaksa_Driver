import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '../../theme/colors';
import { style } from '../../styles/style';
import { metrics, padding_horizontal, screenHeight } from '../../theme/layouts';
import { HStack } from 'native-base';

const CustomSpinner = (props: any) => {
  // const insect = useSafeAreaInsets();
  return props.visible ? (
    <View
      style={[
        styles.container,
        // {marginTop: insect.top}
      ]}>
      <HStack style={[styles.loading]}>
        <ActivityIndicator size="large" color={colors.mainColor} />
        <Text style={{ marginLeft: 15 }}>កំពុងដំណើរការ....</Text>
      </HStack>
    </View>
  ) : null;
};

export default React.memo(CustomSpinner);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: metrics.screenHeight,
    width: metrics.screenWidth,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9,
  },
  loading: {
    padding: padding_horizontal * 2,
    backgroundColor: colors.backgroundColor,
    borderRadius: padding_horizontal / 2,
  },
});
