import 'hammerjs';
import './polyfills';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '../projects/demo/src/app/app.module';
import { environment } from '../projects/demo/src/environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
  const ngRef = 'ngRef';
  if (window[ngRef]) {
    window[ngRef].destroy();
  }
  window[ngRef] = ref;

  // Otherwise, log the boot error
}).catch(err => console.error(err));
