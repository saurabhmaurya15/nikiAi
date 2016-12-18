import {Component, NgZone} from 'angular2/core';
import {Http, HTTP_PROVIDERS, Headers, Jsonp} from 'angular2/http';
import 'rxjs/Rx';


@Component({
    selector: 'my-app',
    templateUrl: 'app/niki.html'
})
export class AppComponent { 
	public apiUrl;
	private zone: NgZone;
	public showFeed = false;
	public infoRequested =  true;
	public feeds = null;
	public showDetailsPopup = false;
	public selectedFeed = null;
	public timerContent = '00:00:00';
	public time;
	public seconds = 0;
	public minutes = 0;
	public hours = 0;
	public currentTime;

	constructor(private http: Http, private _jsonp: Jsonp){
		this.zone = new NgZone({ enableLongStackTrace: false });
		this.timer();
		this.currentTime = new Date();
		this.currentTime.toISOString();
	}


	getRssFeed() {
		var serviceUrl = '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSONP_CALLBACK&q=' + encodeURIComponent(this.apiUrl);
		this.showFeed = true;
		this._jsonp.get(serviceUrl)
			.map(res => {console.log(res._body.responseData.feed); return res._body.responseData.feed})
			.subscribe(res=> {
				this.feeds = res;
				this.infoRequested = false;
			});
	}

	enableBgScroll(){
		document.body.style.overflow = 'auto';
	}

	disableBgScroll(){
		document.body.style.overflow = 'hidden';
	}
	removeStoryFromFeed(index){
		this.feeds.entries.splice(index,1);
	}
	add() {
    	this.seconds++;
	    if (this.seconds >= 60) {
	        this.seconds = 0;
	        this.minutes++;
	        if (this.minutes >= 60) {
	            this.minutes = 0;
	            this.hours++;
	        }
	    }
    	this.timerContent = (this.hours ? (this.hours > 9 ? this.hours : "0" + this.hours) : "00") + ":" + (this.minutes ? (this.minutes > 9 ? this.minutes : "0" + this.minutes) : "00") + ":" + (this.seconds > 9 ? this.seconds : "0" + this.seconds);
    	this.timer();
    }

	timer() {
		var thisObj = this;
    	//this.time = setTimeout(thisObj.add, 1000);
    	this.time =setTimeout(() => {
      			this.add();
    		}, 1000);
	}
}