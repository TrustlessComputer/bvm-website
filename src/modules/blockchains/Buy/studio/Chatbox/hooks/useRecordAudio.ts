'use client';

import React from 'react';

type Props = {
  extension?: 'webm';
  onStart: () => void;
  onDataAvailable: (data: BlobEvent) => void;
  onError: (error: ErrorEvent) => void;
  onStop: () => void;
  onSilent: (blob: Blob | null) => void;
  timeslice?: number;
};

const useRecordAudio = ({
  extension = 'webm',
  onDataAvailable,
  onError,
  onStop,
  onStart,
  timeslice,
  onSilent,
}: Props) => {
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const audioChunksRef = React.useRef<Blob[]>([]);
  const streamRef = React.useRef<MediaStream | null>(null);
  const analyserRef = React.useRef<AnalyserNode | null>(null);
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const silenceThreshold = React.useRef<number>(0.005);
  const silenceStartTime = React.useRef<number | null>(null);
  const silenceDuration = React.useRef<number>(2000);
  const checkSilenceTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const [isRecording, setIsRecording] = React.useState<boolean>(false);

  const startRecording = React.useCallback(async () => {
    resetChunks();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);

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
        onError(error as ErrorEvent);
      };

      const checkSilence = () => {
        if (!analyserRef.current) return;

        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);

        const average =
          dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
        const normalizedAverage = average / 255;

        console.log('[ButtonRecord] checkSilence', normalizedAverage);

        if (normalizedAverage < silenceThreshold.current) {
          if (silenceStartTime.current === null) {
            silenceStartTime.current = Date.now();
          } else if (
            Date.now() - silenceStartTime.current >=
            silenceDuration.current
          ) {
            onSilent(getAudioBlob());
            silenceStartTime.current = null;
            return;
          }
        } else {
          silenceStartTime.current = null;
        }
      };

      checkSilenceTimeoutRef.current = setInterval(checkSilence, 100);

      mediaRecorderRef.current.start(timeslice);
    } catch (error) {}
  }, [onDataAvailable, onError, onStart, onStop, timeslice, onSilent]);

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      clearInterval(checkSilenceTimeoutRef.current as NodeJS.Timeout);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
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

  const getChunks = () => {
    return audioChunksRef.current;
  };

  const resetChunks = () => {
    audioChunksRef.current = [];
  };

  return {
    isRecording,
    startRecording,
    stopRecording,
    getAudioBlob,
    getAudioFile,
    getAudioUrl,
    getChunks,
    resetChunks,
    setSilenceThreshold: (threshold: number) => {
      silenceThreshold.current = threshold;
    },
  };
};

export default useRecordAudio;
