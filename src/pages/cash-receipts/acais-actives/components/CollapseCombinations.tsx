import { ICombinationDTO } from 'shared/dtos/ICombinationDTO';

import { Li, Ul } from './styles';

interface PropTypes {
  options: ICombinationDTO[];
}

const CollapseCombinations: React.FC<PropTypes> = ({ options }) => {
  return (
    <Ul>
      {options?.length > 0 ? (
        options?.map(item => (
          <Li hasCombinations key={item.id}>
            {item?.name || '--'}
          </Li>
        ))
      ) : (
        <Li>Não há combinações</Li>
      )}
    </Ul>
  );
};

export default CollapseCombinations;
