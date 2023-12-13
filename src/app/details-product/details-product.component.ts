import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-details-product',
    standalone: true,
    templateUrl: './details-product.component.html',
    styleUrl: './details-product.component.scss',
    imports: [FooterComponent, HeaderComponent]
})
export class DetailsProductComponent {

}
