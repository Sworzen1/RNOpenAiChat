import OpenAI, { ClientOptions } from 'openai';
import { AsyncStorage } from './AsyncStorage';
import { AsyncStorageKeys } from '@/constants/AsyncStorageKeys';
import { ChatCompletionMessageParam } from 'openai/resources';

export type ChatData = {
  message: string;
  file?: { name: string; uri: string; type?: string; content: string };
};

const CONFIG: ClientOptions = {
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY ?? '',
};

const openai = new OpenAI(CONFIG);

export const streamResponse = async (
  data: ChatData,
  userMessageId: number,
  chatMessageId: number,
  messages: any[],
  onChunk: (chunk: any) => void
) => {
  try {
    let fileMessages = [] as Array<ChatCompletionMessageParam>;
    if (data.file) {
      fileMessages = [
        {
          role: 'system',
          content:
            'You are assistant. The first prompt will be a long text on which you are to rely when answering the next prompt',
        },
        { role: 'system', content: data.file.content },
        { role: 'system', content: data.message },
      ];
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: data.file
        ? fileMessages
        : [{ role: 'user', content: data.message }],
      max_tokens: 50,
      temperature: 0.7,
      store: true,
    });

    const content = response.choices[0].message.content;

    AsyncStorage.add(AsyncStorageKeys.chat, [
      ...messages,
      { content: data.message, id: userMessageId, isUser: true },
      { content, id: chatMessageId, isUser: false },
    ]);

    const chunks = content?.split(' ') ?? [];

    for (const word of chunks) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      onChunk(word + ' ');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
