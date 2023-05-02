import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {Box, VStack} from 'native-base';
import colors from '../../theme/colors';
import {screenWidth} from '../../theme/layouts';

const CustomTextInput = (props: any) => {
  return (
    <VStack>
      <Text
        style={{
          color: colors.lightGrayColor,
        }}>
        {props.text}
      </Text>
      <Box style={styles.box_container}>
        <TextInput placeholder={props.placeholder} keyboardType={props.type} />
      </Box>
    </VStack>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  box_container: {
    height: screenWidth(60),
    width: '100%',
    flexDirection: 'row',
    marginTop: screenWidth(20),
    backgroundColor: '#ffffff70',
    alignItems: 'center',
    paddingHorizontal: screenWidth(10),
    borderRadius: screenWidth(8),
    justifyContent: 'space-between',
    marginBottom: screenWidth(10),
  },
});
