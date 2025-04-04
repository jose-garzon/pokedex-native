import { Text } from '@/components/ui/text';
import { Alert, AlertText, AlertIcon } from '@/components/ui/alert';
import { VStack } from '@/components/ui/vstack';
import { AlertCircleIcon } from '@/components/ui/icon';

interface ErrorMessageProps {
  title: string;
  message: string;
}

export function ErrorMessage({ title, message }: ErrorMessageProps) {
  return (
    <Alert action="error" className="gap-3">
      <AlertIcon as={AlertCircleIcon} size="xl" />
      <AlertText className="text-typography-900" size="sm">
        <VStack className="flex-1">
          <Text className="font-semibold text-typography-900">{title}: </Text>
          <AlertText className="text-typography-900" size="sm">
            {message}
          </AlertText>
        </VStack>
      </AlertText>
    </Alert>
  );
}
