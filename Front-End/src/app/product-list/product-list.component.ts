import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDetails } from '../product-details';
import { ProductDetailsService } from '../product-details.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productdetails!: ProductDetails[];
  productNames: string[] = [];
  public oneProduct!: ProductDetails;
 
  public static  staticProduct :ProductDetails;
  
 
  image=["https://i.imgur.com/3VTaSeb.png","https://m.media-amazon.com/images/I/61AwGDDZd3L._SX522_.jpg",
   "data:image/jpeg;base64,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",
   "https://m.media-amazon.com/images/I/71zny7BTRlL._SL1500_.jpg",
   "https://www.sathya.in/media/48188/catalog/samsung-253litres-rt28t3932cr-convertible-freezer-double-door-refrigerator.jpg",
 "https://ii1.pepperfry.com/media/catalog/product/b/e/1600x800/berry-3-seater-sofa-in-eerie-black-colour-by-durian-berry-3-seater-sofa-in-eerie-black-colour-by-dur-tms88j.jpg",
 "https://image.shutterstock.com/image-photo/this-decorative-lighting-jhumar-260nw-1462600424.jpg",
 "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fHByb2R1Y3R8ZW58MHx8MHx8&w=1000&q=80",
 "https://thumbs.dreamstime.com/b/bath-beauty-products-24145725.jpg"
 
 ]
 
 
   constructor(private productservice : ProductDetailsService, private router:Router) { }
 
   ngOnInit(): void {
     this.getAllproductList();
   }
 
   
    getAllproductList(){
      this.productservice.getAllProducts().subscribe(
       data=>{
         this.productdetails = data;
         this.productNames = this.productdetails.map(product => product.productname);
       }
     );
     console.log(this.productdetails);
   }
 
   
 
   onSelect(product : ProductDetails): void{
     this.oneProduct = product;
     ProductListComponent.staticProduct = this.oneProduct;
     this.router.navigateByUrl('/transactions')
   }

   public logout(){
    sessionStorage.clear();
    this.router.navigateByUrl('/login')
  }

}
