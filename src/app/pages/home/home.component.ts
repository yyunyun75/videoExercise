import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    emojis = [
        'em-angry',
        'em-blush',
        'em-confused',
        'em-cry',
        'em-disappointed',
        'em-dizzy_face',
        'em-expressionless',
        'em-flushed',
        'em-grinning',
        'em-kissing',
        'em-relaxed',
        'em-smile'
    ];

    videos = [
        {'showActions': false, 'playing': false},
        {'showActions': false, 'playing': false},
        {'showActions': false, 'playing': false},
        {'showActions': false, 'playing': false},
        {'showActions': false, 'playing': false},
        {'showActions': false, 'playing': false},
        {'showActions': false, 'playing': false},
        {'showActions': false, 'playing': false},
        {'showActions': false, 'playing': false},
        {'showActions': false, 'playing': false}
    ];

    constructor() { }

    ngOnInit() {
    }

    toggleEmoji(indx){
        if(this.videos[indx] && this.videos[indx].showActions){
            this.videos[indx].showActions = false;
        }else{
            this.videos[indx].showActions = true;
        }
    }

    playVideo(indx){
        this.videos[indx].playing = true;
    }

}
