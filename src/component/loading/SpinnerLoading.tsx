import React from 'react'
import { Center } from 'native-base'
import { ActivityIndicator } from 'react-native'

const SpinnerLoading = () => {
    return (
        <Center style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: 'rgba(0, 0, 0, 0.15)' }}>
            <ActivityIndicator size={'large'} />
        </Center>
    )
}

export default SpinnerLoading