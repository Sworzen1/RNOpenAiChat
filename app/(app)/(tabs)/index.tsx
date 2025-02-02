import { File, Send } from 'lucide-react-native';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import { Text } from '@/components/Text';
import { useTheme } from '@/hooks/useTheme';
import { ControlledInput } from '@/components/ControlledInput';
import { useChatForm } from '@/hooks/form/useChatForm';

const RemoveButton = ({ onPress }: { onPress: () => void }) => (
  <Pressable hitSlop={10} onPress={onPress} style={styles.removeButton}>
    <Text style={{ color: 'black' }}>X</Text>
  </Pressable>
);

const ChatMessage = ({
  message,
  isUser,
}: {
  message: string;
  isUser: boolean;
}) => {
  const { getColor } = useTheme();
  const color = getColor('primary');

  return (
    <View
      style={[
        styles.messageBubble,
        isUser ? styles.userMessage : styles.chatMessage,
        { backgroundColor: isUser ? color.light : color.contrast },
      ]}
    >
      <Text style={{ color: 'black' }}>{message}</Text>
    </View>
  );
};

export default function Home() {
  const { t } = useTranslation();
  const { getColor } = useTheme();
  const color = getColor('primary');
  const backgroundColor = getColor('background');

  const flatListRef = useRef(null);

  const {
    control,
    isStreaming,
    messages,
    submit,
    pickDocument,
    file,
    removeFile,
  } = useChatForm();

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: backgroundColor.paper }}
      behavior={'padding'}
      keyboardVerticalOffset={100}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text>{t('chat_screen.empty_state')}</Text>
          </View>
        }
        renderItem={({ item }) => (
          <ChatMessage message={item.content} isUser={item.isUser} />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.messageList}
      />
      <View style={styles.bottomContainer}>
        <View style={[styles.inputContainer]}>
          <ControlledInput
            control={control}
            style={{ flex: 1 }}
            name="message"
            placeholder={t('chat_screen.message_placeholder')}
          />
          <Pressable
            style={[
              styles.sendButton,
              ,
              { backgroundColor: isStreaming ? '#A0A0A0' : color.main },
            ]}
            onPress={submit}
            disabled={isStreaming}
          >
            {isStreaming ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Send color="white" />
            )}
          </Pressable>
        </View>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Pressable
            style={[
              styles.sendButton,
              ,
              { backgroundColor: isStreaming ? '#A0A0A0' : color.main },
            ]}
            onPress={pickDocument}
            disabled={isStreaming}
          >
            <File color="white" />
          </Pressable>

          {file && (
            <View style={styles.file}>
              <RemoveButton onPress={removeFile} />
              <Text>{file.name}</Text>
            </View>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  bottomContainer: { gap: 24, paddingHorizontal: 20, paddingVertical: 10 },
  chatMessage: {
    alignSelf: 'flex-start',
  },
  emptyState: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  file: {
    borderColor: 'black',
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
    padding: 4,
  },
  messageList: {
    flexGrow: 1,
    padding: 20,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  removeButton: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 999,
    height: 20,
    justifyContent: 'center',
    position: 'absolute',
    right: -10,
    top: -10,
    width: 20,
    zIndex: 999,
  },
  sendButton: {
    alignItems: 'center',
    borderRadius: 999,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
});
