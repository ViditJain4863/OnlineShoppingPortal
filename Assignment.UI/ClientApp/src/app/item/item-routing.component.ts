import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutItemComponent } from './layout-item.component';
import { ItemClothesComponent } from './item-clothes.component';
import { ItemElectronicsComponent } from './item-electronics.component';
import { ItemMobileComponent } from './item-mobile.component';
import { ItemComputerComponent } from './item-computer.component';
import { ItemFurnitureComponent } from './item-furniture.component';

const routes: Routes = [
    {
        path: '', component: LayoutItemComponent,
        children: [
            { path: '', component: LayoutItemComponent },
            { path: 'clothes', component: ItemClothesComponent },
            {path :'electronic', component:ItemElectronicsComponent},
            { path: 'mobile', component: ItemMobileComponent },
            { path: 'computer', component: ItemComputerComponent },
            { path: 'furniture', component: ItemFurnitureComponent },
            //{ path: ':pId', component:TrackerComponent}
        //     { path: ':pId',loadChildren: trackerModule, canActivate: [AuthGuard] }
         ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ItemRoutingModule { }