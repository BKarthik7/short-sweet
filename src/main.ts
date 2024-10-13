import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config'; // Ensure this is correctly set
import { AppComponent } from './app/app.component';
import { ShortenUrlComponent } from './app/shorten-url/shorten-url.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Import provideHttpClient

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: ShortenUrlComponent } // Load ShortenUrlComponent at root path
    ]),
    provideHttpClient()
  ]
})
.catch((err) => console.error(err));
