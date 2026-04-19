/**
 * FUNGEP — OneSignal Service Worker
 * Place this file at the ROOT of your domain:
 *   https://fungep.app/OneSignalSDKWorker.js
 *
 * This single file fixes mobile push notification delivery.
 * OneSignal v16 uses ONE worker file (not two).
 */

importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");
