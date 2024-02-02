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
