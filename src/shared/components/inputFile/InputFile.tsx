import { Upload } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Control, useController } from 'react-hook-form';
import transformImageUrl from 'shared/utils/transformImageUrl';

import { Close, ContentImage, ContentInputFile, ContentLabel, Img, TextError } from './styles';

interface PropTypes {
  name: string;
  label: string;
  isMobile: boolean;
  control: Control<any>;
  disabled?: boolean;
  pathApi?: string;
}

const InputFile: React.FC<PropTypes> = ({ control, name, isMobile, label, disabled, pathApi }) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  const [imgSrcState, setImgSrcState] = useState(pathApi ? transformImageUrl(pathApi) : '');

  const onChangeInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = (e: any) => {
      setImgSrcState(reader.result as string);
      onChange(file);
    };
  };

  useEffect(() => {
    if (!value && !pathApi) {
      setImgSrcState('');
    }
  }, [value]);

  return (
    <ContentInputFile>
      <ContentLabel disabled={disabled}>
        <label htmlFor={name}>
          {label}
          <Upload color={disabled ? 'disabled' : 'primary'} />
        </label>
        <input
          type="file"
          name={name}
          id={name}
          onChange={e => onChangeInputFile(e)}
          disabled={disabled}
        />
      </ContentLabel>
      {!!imgSrcState && (
        <ContentImage>
          <Img src={imgSrcState} isMobile={isMobile} disabled={disabled} />
          <button
            type="button"
            disabled={disabled}
            onClick={() => {
              setImgSrcState('');
              onChange(null);
            }}
          >
            <Close isMobile={isMobile} color="error" />
          </button>
        </ContentImage>
      )}
      {!!error && <TextError>{error.message ?? null}</TextError>}
    </ContentInputFile>
  );
};

export default InputFile;
