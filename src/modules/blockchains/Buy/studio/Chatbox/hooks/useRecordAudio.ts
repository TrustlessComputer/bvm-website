'use client';

import React from 'react';

type Props = {
  extension?: 'webm';
  onStart: () => void;
  onDataAvailable: (data: BlobEvent) => void;
  onError: (error: ErrorEvent) => void;
  onStop: () => void;
};

const useRecordAudio = ({
  extension = 'webm',
  onDataAvailable,
  onError,
  onStop,
  onStart,
}: Props) => {
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const audioChunksRef = React.useRef<Blob[]>([]);

  const [isRecording, setIsRecording] = React.useState<boolean>(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.onstart = () => {
        setIsRecording(true);
        onStart();
      };

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);

        onDataAvailable(event);
      };

      mediaRecorderRef.current.onstop = () => {
        setIsRecording(false);
        onStop();
      };

      mediaRecorderRef.current.onerror = (error) => {
        setIsRecording(false);
        onError(error);
      };

      mediaRecorderRef.current.start();
    } catch (error) {}
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const getAudioBlob = () => {
    if (audioChunksRef.current.length > 0) {
      return new Blob(audioChunksRef.current, { type: `audio/${extension}` });
    }

    return null;
  };

  const getAudioFile = () => {
    const audioBlob = getAudioBlob();

    if (audioBlob) {
      return new File([audioBlob], `audio.${extension}`, {
        type: `audio/${extension}`,
      });
    }

    return null;
  };

  const getAudioUrl = () => {
    const audioBlob = getAudioBlob();

    if (audioBlob) {
      return URL.createObjectURL(audioBlob);
    }

    return null;
  };

  return {
    isRecording,
    startRecording,
    stopRecording,
    getAudioBlob,
    getAudioFile,
    getAudioUrl,
  };
};

export default useRecordAudio;
