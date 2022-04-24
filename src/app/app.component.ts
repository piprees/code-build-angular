import { DOCUMENT, isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Optional, PLATFORM_ID } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { NavService } from '@nav/nav.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'angular-test';

  data!: string;
  baseURL!: string;
  isServer: Boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    @Optional() @Inject(REQUEST) private request: any,
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient,
    public ns: NavService
  ) {
    this.isServer = isPlatformServer(platformId);

    // get base url
    if (this.isServer) {
      this.baseURL = this.request.headers.referer.slice(0, -1);
    } else {
      this.baseURL = this.document.location.origin;
    }

    // grab data
    this.getData().then((data: any) => {
      console.log(data);
    });
  }

  async getData(): Promise<any> {
    return await firstValueFrom(
      this.http.post(this.baseURL + '/graphql', {
        headers: { 'Content-Type': 'application/json' },
        query: `query { queryUser { id fid } }`,
        responseType: 'json'
      })
    );
  };

}
