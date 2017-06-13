import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { YoutubeService } from '../../services/youtube.service';
import { EMOJIS } from '../../data/emoji-data';
import { USERS } from '../../data/user-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    emojis = EMOJIS;
    userData = USERS;
    currentUser = {};
    public totalItems: number = 0;
    public currentPage: number = 0;

    videos = [];
    totalVideos = [];

    errorMsg: string;

    constructor(
        private youtubeService: YoutubeService,
        public sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
    }

    public pageChanged(event: any): void {
        let start = (event.page - 1) * event.itemsPerPage;
        let end = start + event.itemsPerPage;
        this.videos = this.totalVideos.slice(start, end);
    }

    isSelected(emoji, videoId){
        if(this.currentUser[videoId]){
            return this.currentUser[videoId][emoji];
        }else{
            return false;
        }
    }

    toggleEmojiDisplay(indx){
        if(this.videos[indx] && this.videos[indx].showActions){
            this.videos[indx].showActions = false;
        }else{
            this.videos[indx].showActions = true;
        }
    }

    toggleEmoji(emoji, videoId){

        if(this.currentUser[videoId]&&this.currentUser[videoId][emoji]){
            this.currentUser[videoId][emoji] = false;
        }else{
            this.currentUser[videoId] = this.currentUser[videoId] || {};
            this.currentUser[videoId][emoji] = true;
        }

        if(this.currentUser[videoId][emoji]){
            //mimic saving userData
            if(this.userData[videoId]){
                if(this.userData[videoId][emoji]){
                    this.userData[videoId][emoji]++;
                }else{
                    this.userData[videoId][emoji] = 1;
                }
            }else{
                this.userData[videoId] = {};
                this.userData[videoId][emoji] = 1;
            }
            //update video list
            this.videos = this.videos.map(video=>{
                if(video.id.videoId == videoId){
                    video.emojis[emoji] = video.emojis[emoji] ? video.emojis[emoji]++ : 1;
                }
                return video;
            });
        }else{
            this.userData[videoId][emoji]--;
            this.videos = this.videos.map(video=>{
                if(video.id.videoId == videoId){
                    video.emojis[emoji] = this.userData[videoId][emoji];
                }
                return video;
            });
        }
    }

    playVideo(indx){
        this.videos = this.resetVideos(this.videos);
        this.videos[indx].url = this.videos[indx].url+'?autoplay=1';
        this.videos[indx].playing = true;
    }

    closePlayer(indx){
        this.videos[indx].playing = false;
        this.videos[indx].url = this.videos[indx].url.replace('?autoplay=1','');
    }

    search(keyword: HTMLInputElement){
        this.youtubeService.getVideos(keyword.value)
                            .subscribe(
                                data =>{
                                    //filter out data that does not have videoId
                                    this.totalVideos = data.filter(video=>video['id'].videoId);
                                    //bundle with user data
                                    this.totalVideos = this.totalVideos.map(video=>{
                                        let videoId = video['id'].videoId;
                                        video.emojis = this.userData[videoId] ? this.userData[videoId] : {};
                                        return video;
                                    });
                                    //pagination related
                                    this.totalItems = this.totalVideos.length;
                                    this.videos = this.totalVideos.slice(0,10);
                                    //console.log(this.videos);
                                },
                                error => this.errorMsg = <any>error
                            )
    }

    resetVideos(videos){
        return videos.map(video=>{
            video.url = video.url.replace('?autoplay=1','');
            video.playing = false;
            return video;
        })
    }
}
