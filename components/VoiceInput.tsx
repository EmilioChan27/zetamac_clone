import { useEffect, useState } from 'react';

const useVoiceInput = () => {
  const [transcript, setTranscript] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(true); // Start listening automatically
  const [error, setError] = useState<string>('');
  const [silenceTimer, setSilenceTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true; // Enable continuous recognition
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setError('');
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      // Clear the silence timer when a result is received
      if (silenceTimer) {
        clearTimeout(silenceTimer);
        setSilenceTimer(null);
      }
    };

    recognition.onerror = (event: SpeechRecognitionError) => {
      setError('Error occurred in recognition: ' + event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      if (isListening) {
        recognition.start();
      }
    };

    recognition.start(); // Start listening immediately

    // Set up a timer to process input after a short silence
    const handleSpeechEnd = () => {
      if (isListening) {
        // Process the input after 300 milliseconds of silence
        setSilenceTimer(setTimeout(() => {
          setIsListening(false);
          recognition.stop();
        }, 300)); // TODO: Adjust this value as needed
      }
    };

    recognition.onend = handleSpeechEnd;

    return () => {
      recognition.stop();
      if (silenceTimer) {
        clearTimeout(silenceTimer);
      }
    };
  }, [isListening, silenceTimer]);

  const resetTranscript = () => {
    setTranscript('');
  };

  return {
    transcript,
    isListening,
    error,
    resetTranscript,
  };
};

export default useVoiceInput;
/* 
import { useEffect, useState } from 'react';

const useVoiceInput = () => {
  const [transcript, setTranscript] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(true); // Start listening automatically
  const [error, setError] = useState<string>('');
  const [silenceTimer, setSilenceTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true; // Enable continuous recognition
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setError('');
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      // Clear the silence timer when a result is received
      if (silenceTimer) {
        clearTimeout(silenceTimer);
        setSilenceTimer(null);
      }
    };

    recognition.onerror = (event: SpeechRecognitionError) => {
      setError('Error occurred in recognition: ' + event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      if (isListening) {
        recognition.start();
      }
    };

    recognition.start(); // Start listening immediately

    // Set up a timer to process input after a short silence
    const handleSpeechEnd = () => {
      if (isListening) {
        // Process the input after 300 milliseconds of silence
        setSilenceTimer(setTimeout(() => {
          setIsListening(false);
          recognition.stop();
        }, 300)); // TODO: Adjust this value as needed
      }
    };

    recognition.onend = handleSpeechEnd;

    return () => {
      recognition.stop();
      if (silenceTimer) {
        clearTimeout(silenceTimer);
      }
    };
  }, [isListening, silenceTimer]);

  return {
    transcript,
    isListening,
    error,
  };
};

export default useVoiceInput; */