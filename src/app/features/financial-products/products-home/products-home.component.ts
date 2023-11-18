import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FinancialProduct } from 'src/app/shared/interfaces/financial-product.interface';
import { FinancialProductsService } from 'src/app/shared/services/financial-products.service';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsHomeComponent implements OnInit {
  constructor(private financialProductsService: FinancialProductsService) {}
  ngOnInit() {
    this.loadFinancialProducts();
    this.updateProduct();
  }

  loadFinancialProducts() {
    const authorId = '1';
    this.financialProductsService.getFinancialProducts(authorId).subscribe(
      data => {
        console.log(data);
        // Handle the financial products data
      },
      error => {
        console.error('There was an error!', error);
        // Handle the error
      }
    );
  }

  createProduct() {
    const authorId = '1';
    const newProduct: FinancialProduct = {
      id: 'trj-crd',
      name: 'Tarjetas de Credito',
      description: 'Tarjeta de consumo bajo la modalidad de credito',
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      date_release: '2023-02-01',
      date_revision: '2024-02-01',
    };

    this.financialProductsService
      .createFinancialProduct(newProduct, authorId)
      .subscribe(
        data => {
          console.log('Product created:', data);
          // Handle the successful creation
        },
        error => {
          console.error('Error creating product:', error);
          // Handle the error
        }
      );
  }

  updateProduct() {
    const authorId = '1';
    const updatedProduct: FinancialProduct = {
      id: 'trj-crd',
      name: 'Updated Tarjetas de Credito',
      description: 'Updated description',
      logo: 'https://www.updated-url.com/logo.jpg',
      date_release: '2023-02-01',
      date_revision: '2024-02-01',
    };

    this.financialProductsService
      .updateFinancialProduct(updatedProduct, authorId)
      .subscribe(
        data => {
          console.log('Product updated:', data);
          // Handle the successful update
        },
        error => {
          console.error('Error updating product:', error);
          // Handle the error
        }
      );
  }

  deleteProduct() {
    const authorId = 'your-auth-id';
    const productId = 'trj-crd'; // The ID of the product to delete

    this.financialProductsService
      .deleteFinancialProduct(productId, authorId)
      .subscribe(
        () => {
          console.log(`Product with ID ${productId} has been deleted.`);
          // Handle the successful deletion
        },
        error => {
          console.error('Error deleting product:', error);
          // Handle the error
        }
      );
  }

  verifyProduct() {
    const authorId = 'your-auth-id';
    const productId = 'trj-crd'; // The ID of the product to verify

    this.financialProductsService
      .verifyFinancialProduct(productId, authorId)
      .subscribe(
        isVerified => {
          console.log(`Product verification status: ${isVerified}`);
          // Handle the response, where isVerified is a boolean
        },
        error => {
          console.error('Error verifying product:', error);
          // Handle the error
        }
      );
  }
}
