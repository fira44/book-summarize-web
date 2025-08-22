import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { Props } from '@/components/modal';
import axios, { AxiosError } from 'axios';


type MutationResponse = {
  summary: string;
  mp3: string;
};
 const textToSpeech = async (text: string, voice = "alloy") => {
  const endpoint = "https://api.openai.com/v1/audio/speech";
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPEN_AI_API_KEY}`,
  };

  const body = {
    model: "gpt-4o-mini-tts",
    voice, // alloy, verse, or other voices
    input: text,
  };

  const response = await axios.post(endpoint, body, {
    headers,
    responseType: "arraybuffer", 
  });

  const base64Audio = Buffer.from(response.data, "binary").toString("base64");
  return `data:audio/mp3;base64,${base64Audio}`;
};

const handleOpenAi = async (language : string, pdf : string) => {
  const endpoint = 'https://api.openai.com/v1/chat/completions'; // Correct endpoint for ChatGPT model
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPEN_AI_API_KEY}`,
  };

  const body = {
    model: 'gpt-5-mini-2025-08-07', // Ensure correct model name, like gpt-4 or gpt-3.5-turbo
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant. Your duty is summarizing users desired pdf. dont  ask any questions just summarize.',
      },
      {
        role: 'user',
        content: `Please read the pdf carefully, summarize and convert it to this language: ${language}. Here is the pdf text: ${pdf}`,
      },
    ],
  };
    try {
      const response = await axios.post(endpoint, body, { headers });
      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError){
        console.error('Error during OPENAI_API request:', error?.message);
        return;
      }
      throw error;
    }
}
const useGenerateContent = (mutationOptions?: UseMutationOptions<MutationResponse, Error, Props>) => {
  const mutationFn = async (props: Props): Promise<MutationResponse> => {
    const response = await handleOpenAi(props.language,props.pdf);
    console.log(response);
    const summary = response.choices[0].message.content;
    const mp3 = await textToSpeech(summary);
    // Simulate API call result
    return { summary: summary, mp3: mp3 };
  };

  return useMutation({
    mutationFn,
    ...mutationOptions,
  });
};

export default useGenerateContent;
