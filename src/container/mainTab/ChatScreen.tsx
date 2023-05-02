import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import BaseComponent from '../../component/BaseComponent'
import colors from '../../theme/colors'
import { padding_horizontal, screenWidth } from '../../theme/layouts'
import { style } from '../../styles/style'
import { size } from '../../theme/fonts'
import { VStack } from 'native-base'
import { navigate } from '../../services/navigate/navigation'
import { Routes } from '../../temp/Routes'
import SearchTextInput from '../../component/input/SearchTextInput'
import { FlatListVertical } from '../../component/custom/FlatListVertical'
import LinearGradient from 'react-native-linear-gradient'

const CardItem = React.memo((props: any) => {
  return <TouchableOpacity onPress={props.onPress} style={styles.cardContainer}>
    <LinearGradient style={styles.profileContainer} colors={['#d62976', '#962fbf', '#4f5bd5']}>
      <Image style={styles.profile} source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg' }} />
    </LinearGradient>
    <VStack>
      <Text style={styles.title}>Hel Sreyet</Text>
      <Text style={styles.text}>Do you have another color?</Text>
    </VStack>
    <Text style={{
      ...styles.text,
      position: 'absolute',
      top: screenWidth(10),
      right: screenWidth(15),
    }}>15min</Text>
  </TouchableOpacity>
});

const ChatScreen = () => {
  const [search, setSearch] = useState('');

  const onClose = () => {
    setSearch('');
  }

  const _renderItem = useCallback(() => {
    return <CardItem onPress={() => navigate(Routes.ChatBox)} />
  }, [])
  return (
    <>
      <BaseComponent title='chat'>
        <FlatListVertical
          ListHeaderComponent={
            <SearchTextInput
              placeholder='search'
              value={search}
              onChangeText={setSearch}
              onClose={onClose}
            />
          }
          data={['1', '2']}
          renderItem={_renderItem}
        />
      </BaseComponent>
      <SafeAreaView style={{ backgroundColor: colors.mainColor }} />
    </>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: screenWidth(15),
    alignItems: 'center',
    marginBottom: screenWidth(10),
    paddingHorizontal: screenWidth(15),
    marginHorizontal: padding_horizontal,
    paddingVertical: screenWidth(10),
    ...style.normalShadow
  },
  profileContainer: {
    width: screenWidth(65),
    height: screenWidth(65),
    borderRadius: screenWidth(65) / 2,
    ...style.center,
    marginRight: screenWidth(15)
  },
  profile: {
    width: screenWidth(60),
    height: screenWidth(60),
    borderRadius: screenWidth(60) / 2,
    borderColor: colors.white,
    borderWidth: screenWidth(3)
  },
  title: {
    color: colors.black,
    fontSize: size.font20,
    marginBottom: screenWidth(5)
  },
  text: {
    color: colors.grayColor,
    fontSize: size.font18
  },
})