import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AutoHeightImage from 'react-native-auto-height-image';
import colors from '../../theme/colors';
import { screenWidth } from '../../theme/layouts';
import { AppImages } from '../../theme/images';
import { Battambang } from '../../services/config/fonts';
import { size } from '../../theme/fonts';
import { TextTranslate } from './Label';

const NoData = (props: any) => {
  return (
    <View style={styles.container}>
      <AutoHeightImage
        width={screenWidth(130)}
        source={AppImages.NoData}
        style={{ opacity: 0.8, marginTop: screenWidth(100) }}
      />
      <TextTranslate style={styles.text}>{props.title}</TextTranslate>
    </View>
  );
};

export default React.memo(NoData);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.grayColor,
    ...Battambang,
    fontSize: size.font20,
    marginTop: screenWidth(15),
  },
});
