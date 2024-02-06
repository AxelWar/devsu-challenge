import { FinancialProduct } from '../interfaces/financial-product.interface';

//Empty Mock
export const emptyFinancialProduct: FinancialProduct = {
  id: '',
  name: '',
  description: '',
  logo: '',
  date_release: '',
  date_revision: '',
};

export const mockProduct: FinancialProduct = {
  id: '001',
  name: 'Test Product',
  description: 'Test Description',
  logo: 'Test Logo URL',
  date_release: '2021-01-01',
  date_revision: '2022-01-01',
};

export const mockProducts: FinancialProduct[] = [
  {
    id: 'tarj-001',
    name: 'tarj-001',
    description: 'tarj-00001',
    logo: 'Test Logo URL',
    date_release: '2021-01-01',
    date_revision: '2022-01-01',
  },
  {
    id: 'tarj-002',
    name: 'tarj-002',
    description: 'tarj-00002',
    logo: 'Test Logo URL',
    date_release: '2021-01-01',
    date_revision: '2022-01-01',
  },
  {
    id: 'tarj-003',
    name: 'tarj-003',
    description: 'tarj-00003',
    logo: 'Test Logo URL',
    date_release: '2021-01-01',
    date_revision: '2022-01-01',
  },
  {
    id: 'tarj-004',
    name: 'tarj-004',
    description: 'tarj-00004',
    logo: 'Test Logo URL',
    date_release: '2021-01-01',
    date_revision: '2022-01-01',
  },
  {
    id: 'tarj-005',
    name: 'tarj-005',
    description: 'tarj-00005',
    logo: 'Test Logo URL',
    date_release: '2021-01-01',
    date_revision: '2022-01-01',
  },
  {
    id: 'tarj-006',
    name: 'tarj-006',
    description: 'tarj-00006',
    logo: 'Test Logo URL',
    date_release: '2021-01-01',
    date_revision: '2022-01-01',
  },
];
