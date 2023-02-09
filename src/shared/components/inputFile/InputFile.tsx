import { useState } from 'react';
import { UseFormSetValue, Control, Controller } from 'react-hook-form';

import { ContentInputFile, Img } from './styles';

interface PropTypes {
  name: string;
  label: string;
  isMobile: boolean;
  control: Control<any>;
  setValue: UseFormSetValue<any>;
}

const InputFile: React.FC<PropTypes> = ({ control, name, isMobile, label, setValue }) => {
  const [imgSrcState, setImgSrcState] = useState<string>();

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
          <div>
            <label htmlFor={name}>{label}</label>
            <input type="file" name={name} id={name} onChange={e => onChangeInputFile(e)} />
          </div>
          {!!imgSrcState && <Img src={imgSrcState} isMobile={isMobile} />}
        </ContentInputFile>
      )}
    />
  );
};

export default InputFile;
