import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { TokenResponse, User } from '../_models/user';


@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: TokenResponse | null;
    images = [
        {
            imageSrc:'https://mdbootstrap.com/img/Photos/Slides/img%20(22).webp',
            imageAlt:'image1',
        },
        {
            imageSrc:'https://images6.alphacoders.com/404/404698.jpg',
            imageAlt: 'mobilePhone',
        },
        {
            imageSrc:'https://www.pixelstalk.net/wp-content/uploads/images1/Free-furniture-wallpapers.jpg',
            imageAlt:'image1',
        },
        {
            imageSrc:'https://www.chimerarevo.com/wp-content/uploads/2017/01/copt.jpg',
            imageAlt:'computer accessories',
        },
        {
            imageSrc:'https://th.bing.com/th/id/R.2b2fab72e42a13ea52b73d6b6e323739?rik=a7pwQDI7oY%2bGrQ&riu=http%3a%2f%2fcontent.abt.com%2fimage.php%2f1_I74597070BLK.jpg%3fimage%3d%2fimages%2fproducts%2fBDP_Images%2f1_I74597070BLK.jpg%26canvas%3d1%26quality%3d100%26min_w%3d450%26min_h%3d320%26ck%3d446&ehk=ZQ8l7cozzDqWVL5YDA2YnLr1aOJeAIQcbg4YGWJtsFg%3d&risl=&pid=ImgRaw&r=0',
            imageAlt:'Computer'
        }
    ]

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }
}