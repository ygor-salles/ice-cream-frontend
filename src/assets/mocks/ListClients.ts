interface IClient {
  id?: number;
  name: string;
  phone?: string;
  debit: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export const LISTCLIENTS: IClient[] = [
  {
    id: 1,
    name: 'Marcio Antonio',
    phone: '35987154698',
    debit: 25.5,
    created_at: '2022-04-26T02:48:23.070Z',
    updated_at: '2022-04-26T02:48:23.070Z',
  },
  {
    id: 2,
    name: 'Cassio Nunes',
    phone: '35987154692',
    debit: 0,
    created_at: '2022-04-26T02:48:23.070Z',
    updated_at: '2022-04-26T02:48:23.070Z',
  },
  {
    id: 3,
    name: 'Fabio Almeida',
    phone: '35987154600',
    debit: 102.05,
    created_at: '2022-04-26T02:48:23.070Z',
    updated_at: '2022-04-26T02:48:23.070Z',
  },
  {
    id: 4,
    name: 'Maria aparecida',
    phone: '35987154601',
    debit: 19.5,
    created_at: '2022-04-26T02:48:23.070Z',
    updated_at: '2022-04-26T02:48:23.070Z',
  },
]