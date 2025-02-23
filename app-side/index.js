//import { log as Logger } from "@zos/utils"
//const log = Logger.getLogger("APPSIDE")
console.log('Hello Zepp OS!!!!!!!!!!')
aaaaaaAppSideService({
    onInit() {
  //      log.warn("AppSideService onInit invoke");
        console.log('appSide onInit !!!!!!!!!!!!!!!!')
      // ...
    },
    onRun() {
        console.log('appSide onRun !!!!!!!!!!!!!!!!')
    //    log.warn("AppSideService onRun invoke");
    
    // settings.settingsStorage.addListener('change', async ({ key, newValue, oldValue }) => {
    //   //      log.warn(`settingsStorage change: key=${key}, newValue=${newValue}, oldValue=${oldValue}`)
    //         // ...
    //       })
    //   // ...
    },
    onDestroy() {
        //log.warn("AppSideService onDestroy invoke");
      // ...
    },
  }) 