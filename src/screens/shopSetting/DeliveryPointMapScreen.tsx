import { StyleSheet, Text, Platform, LogBox, Image } from 'react-native'
import React, { MutableRefObject, useState, useEffect } from 'react'
import BaseComponent from '../../component/BaseComponent'
import { Box, HStack } from 'native-base'
import colors from '../../theme/colors'
import { metrics, padding_horizontal, screenWidth } from '../../theme/layouts'
import { Battambang } from '../../services/config/fonts'
import { size } from '../../theme/fonts'
import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { goBack } from '../../services/navigate/navigation'
import SubmitButton from '../../component/custom/SubmitButton'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { style } from '../../styles/style'
import { AppImages } from '../../theme/images'

const DeliveryPointMapScreen = (props: any) => {

    const { mapLocation, setMapLocation } = props.route.params
    const insets = useSafeAreaInsets();
    let latitudeDelta = 0.007964195044303443;
    let longitudeDelta = 0.0079142817690068;
    let geocoder: any = Geocoder;
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);
    // const [mapRegion, setMapRegion] = useState<any>();
    const [mapRegion, setMapRegion] = useState<any>({
        latitude: 11.609755223032911,
        longitude: 104.91628495960627,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta
    });
    const _map = React.useRef<MapView>(null) as MutableRefObject<MapView>;

    const [location, setLocation] = useState('');
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [isAllowPermission, setIsAllowPermission] = useState<any>(null);

    // let latitudeDelta = 0.0009964195044303443;
    // let longitudeDelta = 0.00099142817690068;

    LogBox.ignoreLogs(['Non-serializable values were found in the navigation state'])

    useEffect(() => {
        geocoder.init('AIzaSyAdXryvT6NBjxRVDReNZmRD7JP-92rIlrs');
        checkPermission();
        check(
            Platform.OS === 'ios'
                ? PERMISSIONS.IOS.LOCATION_ALWAYS
                : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ).then(value => {
            setIsAllowPermission(value == 'granted' ? true : false);
        });
        setTimeout(() => {
            setIsInitialLoad(false);
        }, 200);
    }, [])

    const checkPermission = () => {
        request(
            Platform.OS === 'ios'
                ? PERMISSIONS.IOS.LOCATION_ALWAYS
                : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        )
            .then(result => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        console.log(
                            'This feature is not available (on this device / in this context)',
                        );
                        break;
                    case RESULTS.DENIED:
                        console.log(
                            'The permission has not been requested / is denied but requestable',
                        );
                        break;
                    case RESULTS.GRANTED:
                        setIsAllowPermission(true);
                        getCurrentLocation();
                        break;
                    case RESULTS.BLOCKED:
                        console.log('The permission is denied and not requestable anymore');
                        break;
                }
            })
            .catch(error => {
                console.log('error :>> ', error);
            });
    };
    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position: any) => {
                setIsAllowPermission(true);
                const { latitude, longitude } = position.coords;
                setLat(latitude);
                setLong(longitude);
                // getLocationGeocoding(latitude, longitude);
                console.log('Latitude' + latitude)
                console.log('Longitude' + longitude)
                setMapRegion({
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: latitudeDelta,
                    longitudeDelta: longitudeDelta
                })

                if (_map.current !== undefined && _map.current !== null) {
                    _map.current.animateToRegion(
                        {
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: latitudeDelta,
                            longitudeDelta: longitudeDelta,
                        },
                        350,
                    );
                }
            },
            (error: any) => console.log(error, '==>'),
            // { timeout: 300, enableHighAccuracy: true, maximumAge: 100, distanceFilter: 2000, useSignificantChanges: true }
            Platform.OS == 'android'
                ? {}
                : { enableHighAccuracy: true, timeout: 100, maximumAge: 10000 },
        );
    }

    // const getLocationGeocoding = (lati: any, longti: any) => {
    //     geocoder
    //         .from(lati, longti)
    //         .then((json: { results: { address_components: any[] }[] }) => {
    //             var addressComponent: any = json.results[0];
    //             setLocation(addressComponent.formatted_address);
    //         })
    //         .catch((error: any) => console.warn(error));
    // }

    const onSave = () => {
        setMapLocation({
            address: location,
            lat: lat,
            lng: long,
        })
        goBack()
    }

    return (
        <BaseComponent title='delivery_man_pickup_point' style={styles.container} disabledCloseKeyboard>
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
                    setMapRegion({
                        latitude: e.latitude,
                        longitude: e.longitude,
                        latitudeDelta: e.latitudeDelta,
                        longitudeDelta: e.longitudeDelta
                    })
                }}
            />
            <HStack style={styles.locationContainer}>
                <MaterialIcons name='my-location' size={screenWidth(30)} color={colors.mainColor} style={{ marginRight: screenWidth(15) }} />
                <Text style={styles.text}>Your current location</Text>
            </HStack>
            <Box style={{
                position: 'absolute',
                bottom: insets.bottom + screenWidth(10),
                left: 0,
                right: 0,
                paddingHorizontal: padding_horizontal
            }}>
                <TouchableOpacity style={styles.button}>
                    <MaterialIcons name='my-location' size={screenWidth(32)} color={colors.mainColor} />
                </TouchableOpacity>
                <SubmitButton
                    onPress={onSave}
                    title='save'
                    width='100%'
                    borderRadius={screenWidth(100)}
                />
            </Box>
            <Box style={styles.markerContainer}>
                <Image source={AppImages.LocationPin} style={styles.marker} />
            </Box>
        </BaseComponent>
    )
}

export default DeliveryPointMapScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button: {
        borderRadius: screenWidth(55),
        height: screenWidth(55),
        width: screenWidth(55),
        backgroundColor: colors.white,
        ...style.center,
        marginBottom: screenWidth(25),
        alignSelf: 'flex-end',
        ...style.normalShadow
    },
    locationContainer: {
        backgroundColor: colors.white,
        paddingHorizontal: padding_horizontal,
        paddingVertical: screenWidth(12),
        position: 'absolute',
        alignItems: 'center',
        borderRadius: screenWidth(100),
        top: screenWidth(20),
        left: 0,
        right: 0,
        marginHorizontal: padding_horizontal,
        ...style.normalShadow
    },
    title: {
        ...Battambang,
        fontSize: size.font18,
        color: colors.black
    },
    text: {
        ...Battambang,
        fontSize: size.font16,
        color: colors.black
    },
    marker: {
        width: screenWidth(60),
        height: screenWidth(60),
        resizeMode: 'contain',
        marginBottom: screenWidth(55),
    },
    markerContainer: {
        position: 'absolute',
        top: metrics.screenHeight / 2 - screenWidth(160),
        left: metrics.screenWidth / 2 - screenWidth(30),
        alignItems: 'center'
    }
})