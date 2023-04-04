import { EnumTypeProduct } from 'shared/dtos/IProductDTO';
import { EnumTypeSale } from 'shared/dtos/ISaleDTO';

export const listMock = [
  {
    data_product: {
      id: 2,
      name: 'Açaí de 200ml',
      price: 5,
      description: null,
      type: EnumTypeProduct.ACAI,
      status: true,
      created_at: '2023-03-02T23:45:16.629Z',
      updated_at: '2023-03-02T23:45:16.629Z',
      combinations: [
        {
          id: 1,
          name: 'Leite condensado',
          price: 3,
          created_at: '2023-03-02T23:47:53.727Z',
          updated_at: '2023-03-02T23:47:53.727Z',
        },
      ],
    },
    total: 16,
    type_sale: EnumTypeSale.MONEY,
    amount: 2,
    observation: 'as',
    client_id: 1,
  },
  {
    data_product: {
      id: 2,
      name: 'Açaí de 200ml',
      price: 5,
      description: null,
      type: EnumTypeProduct.ACAI,
      status: true,
      created_at: '2023-03-02T23:45:16.629Z',
      updated_at: '2023-03-02T23:45:16.629Z',
      combinations: [],
    },
    total: 16,
    type_sale: EnumTypeSale.MONEY,
    amount: 2,
    observation: 'as',
    client_id: 1,
  },
];
