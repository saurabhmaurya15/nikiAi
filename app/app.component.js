System.register(['angular2/core', 'angular2/http', 'rxjs/Rx'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(http, _jsonp) {
                    this.http = http;
                    this._jsonp = _jsonp;
                    this.showFeed = false;
                    this.infoRequested = true;
                    this.feeds = null;
                    this.showDetailsPopup = false;
                    this.selectedFeed = null;
                    this.timerContent = '00:00:00';
                    this.seconds = 0;
                    this.minutes = 0;
                    this.hours = 0;
                    this.zone = new core_1.NgZone({ enableLongStackTrace: false });
                    this.timer();
                    this.currentTime = new Date();
                    this.currentTime.toISOString();
                }
                AppComponent.prototype.getRssFeed = function () {
                    var _this = this;
                    var serviceUrl = '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSONP_CALLBACK&q=' + encodeURIComponent(this.apiUrl);
                    this.showFeed = true;
                    this._jsonp.get(serviceUrl)
                        .map(function (res) { console.log(res._body.responseData.feed); return res._body.responseData.feed; })
                        .subscribe(function (res) {
                        _this.feeds = res;
                        _this.infoRequested = false;
                    });
                };
                AppComponent.prototype.enableBgScroll = function () {
                    document.body.style.overflow = 'auto';
                };
                AppComponent.prototype.disableBgScroll = function () {
                    document.body.style.overflow = 'hidden';
                };
                AppComponent.prototype.removeStoryFromFeed = function (index) {
                    this.feeds.entries.splice(index, 1);
                };
                AppComponent.prototype.add = function () {
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
                };
                AppComponent.prototype.timer = function () {
                    var _this = this;
                    var thisObj = this;
                    //this.time = setTimeout(thisObj.add, 1000);
                    this.time = setTimeout(function () {
                        _this.add();
                    }, 1000);
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/niki.html'
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, http_1.Jsonp])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map