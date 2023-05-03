import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Box} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {screenWidth} from '../../theme/layouts';
import colors from '../../theme/colors';
import {size} from '../../theme/fonts';
import Octicons from 'react-native-vector-icons/Octicons';
import {style} from '../../styles/style';

interface Props {
  isOpen: boolean;
  value: any;
  title: any;
  data: Array<any>;
  onSelectedChange: any;
  onPress: () => void;
}

const SelectDate: React.FC<Props> = props => {
  const _renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => props.onSelectedChange(item)}
        style={{
          ...styles.item,
          backgroundColor:
            item?.id == props.value?.id ? colors.lightYellow : colors.white,
        }}>
        <Text style={{...styles.title, color: colors.black}}>{item.title}</Text>
        <Octicons
          name={item?.id == props.value?.id ? 'check-circle-fill' : 'circle'}
          size={screenWidth(25)}
          color={colors.yellowColor}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{width: screenWidth(150), alignItems: 'flex-end'}}>
      <TouchableOpacity onPress={props.onPress} style={styles.button}>
        <Text style={styles.title}>{props.title}</Text>
        {props.isOpen}
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(SelectDate);

const styles = StyleSheet.create({
  title: {
    color: colors.white,
    fontSize: size.font20,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: screenWidth(70),
    width: screenWidth(120),
    backgroundColor: colors.mainColor,
    marginHorizontal: screenWidth(20),
    borderRadius: screenWidth(15),
  },
  box: {
    backgroundColor: colors.mainColor,
    borderRadius: screenWidth(10),
    width: screenWidth(150),
    ...style.shadow,
    overflow: 'hidden',
    position: 'absolute',
    top: screenWidth(6),
  },
  item: {
    flexDirection: 'row',
    paddingVertical: screenWidth(12),
    paddingLeft: screenWidth(15),
    paddingRight: screenWidth(10),
    justifyContent: 'space-between',
  },
});
