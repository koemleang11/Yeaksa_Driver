import {Alert, HStack, VStack} from 'native-base';
import React from 'react';
import colors from '../../theme/colors'
import { Text } from 'react-native'
import { TextTranslate } from './Label';

export const MessageType = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error',
};

export const VariantType = {
  solid: 'solid',
  subtle: 'subtle',
  left_accent: 'left-accent',
  top_accent: 'top-accent',
  outline: 'outline',
};

const ToastAlert = ({
  toast,
  id,
  status,
  variant,
  title,
  desc,
  isClosable,
  mb,
  ...rest
}: any) => (
  <Alert
    maxWidth="100%"
    marginHorizontal={16 * 3}
    alignSelf="center"
    flexDirection="row"
    status={status ?? 'info'}
    variant={variant}
    {...rest}
    mb={mb}
  >
    <VStack space={1} flexShrink={1} w="auto">
      <HStack alignItems="center" justifyContent="space-between">
        <HStack space={2} alignItems="center">
          <Alert.Icon />
          <TextTranslate
            style={{
              maxWidth: '90%',
              color:
                variant === 'solid'
                  ? 'white'
                  : variant !== 'outline'
                  ? 'black'
                  : colors.black,
            }}
          >
            {title}
          </TextTranslate>
        </HStack>
      </HStack>
        {desc && (
          <Text
            style={{
              color:
                variant === 'solid'
                  ? 'lightText'
                  : variant !== 'outline'
                  ? 'darkText'
                  : colors.black,
                paddingHorizontal: 24,
            }}
          >
            {desc}
          </Text>
        )}
    </VStack>
  </Alert>
);

export function showToast(
  toast: any,
  title: string,
  status: string = MessageType.success,
  desc: string | null = null,
  duration: number = 2000,
  mb: number = 0,
  variant: string = VariantType.left_accent,
) {
  const item = {
    toast,
    title,
    status,
    variant,
    desc,
    mb,
  };
  toast.show({
    render: ({id}: any) => {
      return <ToastAlert id={id} {...item} isClosable />;
    },
    duration,
  });
}
