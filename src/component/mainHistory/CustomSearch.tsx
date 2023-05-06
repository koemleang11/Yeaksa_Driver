import React from 'react';
import {TextTranslate} from '../../component/custom/Label';
import {StyleSheet, TextInput, Image} from 'react-native';
import colors from '../../theme/colors';
import {style} from '../../styles/style';
import {screenWidth} from '../../theme/layouts';
import {Box, HStack} from 'native-base';
import {size} from '../../theme/fonts';
import {Battambang} from '../../services/config/fonts';
import {AppImages} from '../../theme/images';

interface Props {
  label: string;
  placeholder: string;
  value: any;
  onChangeText: any;
}

const CustomSearch: React.FC<Props> = props => {
  return (
    <>
      <Box style={styles.textContainer}>
        <HStack alignItems={'center'}>
          <Image source={AppImages.Search} style={styles.icon} />
          <TextInput
            placeholder={props.placeholder}
            placeholderTextColor={colors.placeholderColor}
            style={styles.textInput}
            onChangeText={props.onChangeText}
            multiline
          />
        </HStack>
      </Box>
    </>
  );
};

export default React.memo(CustomSearch);

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: colors.white,
    borderRadius: screenWidth(50),
    ...style.normalShadow,
    marginTop: screenWidth(20),
    justifyContent: 'flex-start',
    paddingHorizontal: screenWidth(20),
    paddingVertical: screenWidth(5),
  },
  textInput: {
    minWidth: screenWidth(200),
    fontSize: size.font16,
    color: colors.black,
    ...Battambang,
    backgroundColor: colors.white,
    paddingHorizontal: screenWidth(25),
    height: screenWidth(50),
    marginTop: screenWidth(20),
  },
  icon: {
    height: screenWidth(25),
    width: screenWidth(25),
  },
});
