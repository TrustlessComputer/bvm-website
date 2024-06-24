import { prettyPrintBytes } from '@/utils/file';
import { Image } from '@chakra-ui/react';
import cs from 'classnames';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import s from './styles.module.scss';

export interface IProps {
  className: string;
  acceptedFileType?: Array<string>;
  fileOrFiles?: File[] | undefined;
  labelText: string;
  maxSize: number; // unit MB
  onChange: (files: File | undefined) => void;
  onErrorCB?: (message?: string) => void;
}

const DropFile: React.FC<IProps> = ({
  acceptedFileType,
  fileOrFiles,
  className,
  labelText,
  maxSize,
  onChange,
  onErrorCB,
}: IProps) => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const onChangeFile = (file: File): void => {
    setFile(file);
    setError('');
    onChange(file);
  };

  const onSizeError = (): void => {
    setError(`File size error, maximum file size is ${maxSize}MB.`);
    onErrorCB &&
      onErrorCB(`File size error, maximum file size is ${maxSize}MB.`);
    setFile(undefined);
  };

  const onTypeError = (): void => {
    setError('Invalid file extension.');
    onErrorCB && onErrorCB('Invalid file extension.');
    setFile(undefined);
  };

  return (
    <div
      className={cs(s.dropFile, className, {
        [s.dropFile__drag]: false,
        [s.dropFile__error]: !!error,
        [s.dropFile__success]: !error && !!file,
      })}
    >
      <FileUploader
        handleChange={onChangeFile}
        name={'zipFileUploader'}
        maxSize={maxSize}
        minSize={0}
        types={acceptedFileType}
        onTypeError={onTypeError}
        onSizeError={onSizeError}
        fileOrFiles={fileOrFiles}
        classes={s.dropZone}
      >
        <Image
          src={`/icons/file_upload_ic.svg`}
          fit={'contain'}
          w={'25px'}
          h={'25px'}
        />
        {file ? (
          <p className={cs(s.dropZoneDescription, s.successText)}>
            {`${file.name} (${prettyPrintBytes(file.size)})`}
          </p>
        ) : (
          !error && <p className={s.dropZoneDescription}>{labelText}</p>
        )}
        {error && (
          <p className={cs(s.dropZoneDescription, s.errorText)}>{error}</p>
        )}
      </FileUploader>
    </div>
  );
};

export default DropFile;
