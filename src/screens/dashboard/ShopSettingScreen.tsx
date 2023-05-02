import { FlatList, Image, StyleSheet } from 'react-native'
import React, { useCallback } from 'react'
import BaseComponent from '../../component/BaseComponent'
import { AppImages } from '../../theme/images'
import { padding_horizontal, screenWidth } from '../../theme/layouts'
import ShopSettingButton from '../../component/custom/ShopSettingButton'
import { Routes } from '../../temp/Routes'
import { navigate } from '../../services/navigate/navigation'

const Item = [
    {
        id: 1,
        title: 'general_setting',
        icon: AppImages.Setting,
        route: Routes.GeneralSetting
    },
    {
        id: 2,
        title: 'delivery_man_pickup_point',
        icon: AppImages.Delivery,
        route: Routes.DeliveryPickupPoint
    },
    {
        id: 3,
        title: 'banner_setting',
        icon: AppImages.BannerSetting,
        route: Routes.BannerSetting,
        size: screenWidth(22)
    }
]

const ShopSettingScreen = () => {

    const _renderItem = useCallback(({ item }: any) => {
        return <ShopSettingButton
            title={item?.title}
            icon={item?.icon}
            size={item?.size}
            onPress={() => navigate(item?.route)}
        />
    }, [])

    return (
        <BaseComponent title='shop_settings' style={styles.container}>
            <Image style={styles.icon} source={AppImages.ShopSticker} />
            <FlatList
                data={Item}
                renderItem={_renderItem}
            />
        </BaseComponent>
    )
}

export default ShopSettingScreen

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: screenWidth(20),
        flex: 1,
        paddingHorizontal: padding_horizontal
    },
    icon: {
        width: screenWidth(200),
        height: screenWidth(200),
        marginBottom: screenWidth(30)
    }
})