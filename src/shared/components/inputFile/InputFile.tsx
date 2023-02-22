import { Upload } from '@mui/icons-material';
import { useState } from 'react';
import { UseFormSetValue, Control, Controller } from 'react-hook-form';
import transformImageUrl from 'shared/utils/transformImageUrl';

import { ContentInputFile, Img, TextError, Close, ContentImage, ContentLabel } from './styles';

interface PropTypes {
  name: string;
  label: string;
  isMobile: boolean;
  control: Control<any>;
  pathApi?: string;
  setValue: UseFormSetValue<any>;
}

const InputFile: React.FC<PropTypes> = ({ control, name, isMobile, label, pathApi, setValue }) => {
  const [imgSrcState, setImgSrcState] = useState(pathApi ? transformImageUrl(pathApi) : '');

  const onChangeInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = (e: any) => {
      setImgSrcState(reader.result as string);
      setValue(name, file);
    };
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error } }) => (
        <ContentInputFile>
          <ContentLabel>
            <label htmlFor={name}>{label}</label>
            <input type="file" name={name} id={name} onChange={e => onChangeInputFile(e)} />
            <Upload color="primary" />
          </ContentLabel>
          {!!imgSrcState && (
            <ContentImage>
              <Img src={imgSrcState} isMobile={isMobile} />
              <Close
                isMobile={isMobile}
                color="error"
                onClick={() => {
                  setImgSrcState('');
                  setValue(name, null);
                }}
              />
            </ContentImage>
          )}
          {!!error && <TextError>{error.message ?? null}</TextError>}
        </ContentInputFile>
      )}
    />
  );
};

export default InputFile;
