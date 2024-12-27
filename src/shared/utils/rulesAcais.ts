import { ICombinationDTO, IProductDTO } from 'shared/dtos';

interface IRuleAcais {
  product: IProductDTO;
  allCombinationsStorage: ICombinationDTO[] | undefined;
  setAllCombinations: React.Dispatch<React.SetStateAction<ICombinationDTO[]>>;
}

export const ruleAcais = ({ product, allCombinationsStorage, setAllCombinations }: IRuleAcais) => {
  if (product.name.includes('200')) {
    setAllCombinations(prev => prev.map(item => ({ ...item, price: 3 })));
  } else if (product.name.includes(' 1L') || product.name.includes(' 1 L')) {
    setAllCombinations(prev => prev.map(item => ({ ...item, price: item.price + 1 })));
  } else {
    setAllCombinations(allCombinationsStorage ?? []);
  }
};
