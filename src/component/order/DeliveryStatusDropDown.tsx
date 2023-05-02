import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Box, HStack } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { screenWidth } from '../../theme/layouts'
import colors from '../../theme/colors'
import { style } from '../../styles/style'
import { size } from '../../theme/fonts'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

interface Props {
  placeholder: string;
  value: any;
  data: Array<any>;
  onSelectedChange: any;
}

const DeliveryStatusDropDown: React.FC<Props> = (props) => {
  const [enabled, setEnabled] = useState(false);
  const _renderItem = ({ item }: any) => {
    return <TouchableOpacity onPress={() => {
      props.onSelectedChange(item);
      setEnabled(false);
    }} style={styles.itemContainer}>
      <Text style={styles.textItem}>{item.title}</Text>
      <MaterialCommunityIcons
        name={item?.id === props.value?.id ? 'circle-slice-8' : 'circle-outline'}
        color={item?.id === props.value?.id ? colors.mainColor : colors.grayColor}
        size={screenWidth(30)}
      />
    </TouchableOpacity>
  }
  return (
    <>
      <TouchableOpacity onPress={() => setEnabled(!enabled)} style={styles.container}>
        <Text style={styles.title}>{props.value?.title}</Text>
        <Ionicons name='chevron-down-outline' size={screenWidth(25)} color={colors.grayColor} />
      </TouchableOpacity>
      {
        enabled && <Box style={styles.dropDownBox}>
          <FlatList
            nestedScrollEnabled
            contentContainerStyle={{ paddingVertical: screenWidth(10) }}
            data={props.data}
            renderItem={_renderItem}
          />
        </Box>
      }
    </>
  )
}

export default DeliveryStatusDropDown

const styles = StyleSheet.create({
  container: {
    width: screenWidth(210),
    backgroundColor: colors.white,
    height: screenWidth(50),
    borderRadius: screenWidth(10),
    marginVertical: screenWidth(15),
    marginTop: screenWidth(13),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: screenWidth(20),
    paddingRight: screenWidth(15),
    ...style.normalShadow
  },
  title: {
    fontSize: size.font20,
    color: colors.black
  },
  textItem: {
    fontSize: size.font18,
    color: colors.black
  },
  itemContainer: {
    ...style.row,
    height: screenWidth(50),
    paddingLeft: screenWidth(20),
    paddingRight: screenWidth(15)
  },
  dropDownBox: {
    width: screenWidth(210),
    backgroundColor: colors.white,
    borderRadius: screenWidth(10),
    marginTop: screenWidth(5),
    ...style.normalShadow,
    // overflow: 'hidden',
    position: 'absolute',
    top: screenWidth(65),
    right: 0
  }
})