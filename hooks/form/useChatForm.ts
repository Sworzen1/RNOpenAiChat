import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AsyncStorageKeys } from '@/constants/AsyncStorageKeys';
import { AsyncStorage } from '@/services/AsyncStorage';
import { ChatData, streamResponse } from '@/services/OpenAi';
import { showErrorToast } from '@/utils/showToast';

type Message = {
  content: string;
  id: number;
  isUser: boolean;
};

const SUPPORTED_FILE_TYPE = 'text/plain';

export const useChatForm = () => {
  const { t } = useTranslation();

  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const addMessage = useCallback(
    (content: string, isUser = false, id: number) => {
      setMessages((prev) => [...prev, { id, content, isUser }]);
    },
    []
  );

  const { control, handleSubmit, reset, setValue, watch } = useForm<ChatData>({
    mode: 'onChange',
  });

  const file = watch('file');

  const sendMessage = async (data: ChatData) => {
    try {
      if (data.message === '') return;

      setIsStreaming(true);
      reset();

      const userMessageId = Math.random();
      const chatMessageId = Math.random();

      addMessage(data.message, true, userMessageId);

      let streamedContent = '';

      addMessage('', false, chatMessageId);

      await streamResponse(
        data,
        userMessageId,
        chatMessageId,
        messages,
        (chunk) => {
          streamedContent += chunk;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === chatMessageId
                ? { ...msg, content: streamedContent }
                : msg
            )
          );
        }
      );
      setIsStreaming(false);
    } catch (e) {
      // send to Sentry for example
      showErrorToast({ description: 'Something went wrong' });
    }
  };

  const pickDocument = useCallback(async () => {
    try {
      // we can block invalid file types in getDocumentAsync config
      const result = await DocumentPicker.getDocumentAsync();

      if (!result.canceled) {
        const asset = result.assets[0];

        if (asset.mimeType !== SUPPORTED_FILE_TYPE) {
          throw new Error('Invalid file type');
        }

        const fileContent = await FileSystem.readAsStringAsync(asset.uri, {
          encoding: FileSystem.EncodingType.UTF8,
        });

        const file = {
          uri: asset.uri,
          type: asset.mimeType,
          name: asset.name,
          content: fileContent,
        };

        setValue('file', file);
      }
    } catch (error: any) {
      showErrorToast({
        description: error?.message ?? t('chat_screen.message_error'),
      });
    }
  }, []);

  const removeFile = () => {
    setValue('file', undefined);
  };

  useEffect(() => {
    const loadChat = async () => {
      const messages = (await AsyncStorage.get(
        AsyncStorageKeys.chat
      )) as Message[];

      setMessages(messages ?? []);
    };

    loadChat();
  }, []);

  return {
    control,
    submit: handleSubmit(sendMessage),
    reset,
    isStreaming,
    messages,
    pickDocument,
    file,
    removeFile,
  };
};
