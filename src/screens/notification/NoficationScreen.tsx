import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import BaseComponent from '../../component/BaseComponent'
import NotificationCard from '../../component/notification/NotificationCard';
import { padding_horizontal, screenWidth } from '../../theme/layouts';

const Notification = () => {

  const _renderItem = useCallback(() => {
    return <NotificationCard />
  }, []);

  return (
    <BaseComponent title='notifications' style={styles.container}>
      <FlatList
        data={[1, 2]}
        contentContainerStyle={{ paddingTop: screenWidth(15) }}
        renderItem={_renderItem}
      />
    </BaseComponent>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: padding_horizontal
  }
})