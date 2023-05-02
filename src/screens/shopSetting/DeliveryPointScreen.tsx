import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import BaseComponent from '../../component/BaseComponent'
import { TextTranslate } from '../../component/custom/Label'
import { useAppSelector } from '../../hooks/dispatch'
import { style } from '../../styles/style'
import colors from '../../theme/colors'
import { HStack } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { padding_horizontal, screenWidth } from '../../theme/layouts'
import { size } from '../../theme/fonts'
import SubmitButton from '../../component/custom/SubmitButton'
import { navigate } from '../../services/navigate/navigation'
import { Routes } from '../../temp/Routes'
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps'
import { Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

let latitudeDelta = 0.007964195044303443;
let longitudeDelta = 0.0079142817690068;

const DeliveryPointScreen = () => {
  const lang: any = useAppSelector(state => state.lang);
  const insets = useSafeAreaInsets();
  const onChangeText = () => { }
  const [mapRegion, setMapRegion] = useState<any>({
    latitude: 11.609755223032911,
    longitude: 104.91628495960627,
    latitudeDelta: latitudeDelta,
    longitudeDelta: longitudeDelta
  });
  return (
    <>
      <BaseComponent title='delivery_man_pickup_point' keyboardBackgroundColor={colors.white} style={{ flex: 1 }}>
        <View style={styles.mapContainer}>
          <MapView
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            showsUserLocation={true}
            followsUserLocation={true}
            showsMyLocationButton={false}
            provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
            initialRegion={mapRegion}
            onRegionChangeComplete={(e) => {
              // getLocationGeocoding(e.latitude, e.longitude);
              // setMapRegion({
              //   latitude: e.latitude,
              //   longitude: e.longitude,
              //   latitudeDelta: e.latitudeDelta,
              //   longitudeDelta: e.longitudeDelta
              // })
            }}
          />
        </View>
        <View style={styles.whiteBox}>
          <View>
            <TextTranslate style={style.labelTextInput}>{'shop_address'}</TextTranslate>
            <TouchableOpacity onPress={() => navigate(Routes.DeliveryPickupMap)} style={styles.button}>
              <HStack alignItems={'center'}>
                <MaterialIcons name='my-location' size={screenWidth(30)} color={colors.mainColor} style={{ marginRight: screenWidth(15) }} />
                <Text style={styles.text}>Shop Address</Text>
              </HStack>
              <Ionicons name='chevron-forward' size={screenWidth(30)} color={colors.grayColor} />
            </TouchableOpacity>
            <TextInput
              placeholder={lang['enter_shop_address']}
              placeholderTextColor={colors.placeholderColor}
              style={{ ...style.textInput, backgroundColor: colors.lowOpacityMain }}
              onChangeText={onChangeText}
            />
          </View>
        </View>
      </BaseComponent>
      <View style={{ backgroundColor: colors.white }}>
        <SubmitButton
          title='save'
          borderRadius={screenWidth(100)}
          marginBottom={screenWidth(10) + insets.bottom}
          marginHorizontal={padding_horizontal}
        />
      </View>

    </>
  )
}

export default DeliveryPointScreen

const styles = StyleSheet.create({
  mapContainer: {
    height: screenWidth(250)
  },
  text: {
    fontSize: size.font18,
    color: colors.grayColor
  },
  button: {
    ...style.textInput,
    ...style.row,
    backgroundColor: colors.lowOpacityMain,
    marginBottom: screenWidth(20)
  },
  whiteBox: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: padding_horizontal,
    justifyContent: 'space-between',
    paddingTop: screenWidth(20),
    paddingBottom: screenWidth(50),
    borderTopRightRadius: screenWidth(20),
    borderTopLeftRadius: screenWidth(20),
  }
})