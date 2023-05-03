// import { FlatList, StyleSheet } from 'react-native'
// import React, { useCallback } from 'react'
// import BaseComponent from '../../component/BaseComponent'
// import { padding_horizontal, screenWidth } from '../../theme/layouts'
// import { navigate } from '../../services/navigate/navigation'
// import { Routes } from '../../temp/Routes'

// const VoucherScreen = () => {

//     const handleAdd = () => {
//         navigate(Routes.AddVoucher)
//     }

//     const _renderItem = useCallback(() => {
//         return
//     }, [])

//     return (
//         <BaseComponent
//             title='vouchers'
//             style={styles.container}
//             disabledCloseKeyboard
//             enabledAdd
//             onAdd={handleAdd}
//         >
//             <FlatList
//                 data={[1, 2]}
//                 contentContainerStyle={{ paddingTop: screenWidth(20) }}
//                 renderItem={_renderItem}
//             />
//         </BaseComponent>
//     )
// }

// export default VoucherScreen

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingHorizontal: padding_horizontal
//     }
// })
