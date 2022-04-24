import { isDevMode, NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '@env/environment';
import {
  getAnalytics,
  provideAnalytics,
  ScreenTrackingService,
  UserTrackingService
} from '@angular/fire/analytics';

let firebase = [
  provideFirebaseApp(() => initializeApp(environment.firebase)),
  provideFirestore(() => getFirestore()),
  provideAuth(() => getAuth()),
  provideStorage(() => getStorage())
];

const browser = [
  provideAnalytics(() => getAnalytics())
];

firebase = isDevMode()
  ? firebase
  : { ...firebase, ...browser };


@NgModule({
  declarations: [],
  imports: [
    ...firebase
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService
  ],
})
export class FirebaseModule { }
