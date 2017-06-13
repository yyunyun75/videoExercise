import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class YoutubeService {

    private youtubeUrl = 'https://www.googleapis.com/youtube/v3/search';

    constructor(private http: Http) { }

    getVideos(keyword: string): Observable<object[]>{
        let params ={
            'maxResults': '25',
            'part': 'snippet',
            'q': keyword,
            'key': 'AIzaSyBQA8v4JMsK0J-FTypvgYNNWUvjvsx6aik'
        };
        return this.http.get(this.youtubeUrl, {params})
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    private extractData(res: Response){
        let body = res.json();
        let data = body.items.map(item =>{
            item.url = `http://www.youtube.com/embed/${item.id.videoId}`;
            return item
        });
        return data || {};
    }

    private handleError(error: Response | any){
        let errMsg: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
          errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
