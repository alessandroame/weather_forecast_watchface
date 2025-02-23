import ui from '@zos/ui'
import {Time} from '@zos/sensor'
import { log as Logger } from "@zos/utils"

import { createConnect,addListener ,disConnect  } from '@zos/ble'

const log = Logger.getLogger("WATCHFACE");
let pollinID=setInterval(() => { Polling() }, 100000);
let txt=null
let dialAngleOffset=180;
let bg=null
let hourPointer=null
let h=0;
let m=0;
let s=0;
const time = new Time();

function Polling(){
  const msg='polling @'+h+':'+m+'.'+s;
  log.info('sending: '+msg); 
  //const buf = Buffer.from(msg)
  //messaging.peerSocket.send(buf.buffer)
  log.info(msg+' sent');
}

hmApp.onMessage = function (msg) {
  console.log("Received message:", msg)
  
  if (msg.type === "update") {
    hmUI.showToast({ text: msg.data })
  }
}

addListener((status)=>{
  log.error('status:'+status)
})

WatchFace({
  onInit() {
    log.debug('index page.js on init invoke')
    log.info(`bg_${dialAngleOffset}.png`) 
    bg=ui.createWidget(ui.widget.IMG,{
      x:0,
      y:0,
      w:480,
      h:480,
      src:`bg_${dialAngleOffset}.png`
    })
    txt=ui.createWidget(ui.widget.TEXT,{
      x:0,
      y:0,
      w:480,
      h:480,
      align_h: ui.align.CENTER_H,
      align_v: ui.align.CENTER_V,
      text_size:160,
      color: 0x550000 
    })
    hourPointer=ui.createWidget(ui.widget.IMG,{
      x:5,
      y:5,
      w:470,
      h:470,
      pos_x:231 ,
      pos_y:0,
      center_x:235,
      center_y:235,
      src:'hour_pointer.png'
    })
  }, 

  build() {
    log.debug('index.js on build invoke')
    time.onPerMinute(updateTime)
    //setInterval(updateTime,10);
  },

  onDestroy() {
    log.debug('index.js on destroy invoke') 
    clearInterval(pollinID);
  },
  onResume(){
    log.debug('index.js on resume invoke')
    updateTime() 

  }
})

function updateTime(){
  // s+=480;
  // if (s>59){
  //   s=0;
  //   m++;
  //   if (m>59){
  //     m=0;
  //     h++
  //     if (h>23){
  //       h=0;
  //     }
  //   }
  // }
  h=time.getHours()
  m=time.getMinutes()
  s=time.getSeconds()
  
  let angle=360/24*h
  angle+=360/24/60*m;
  angle+=360/24/60/60*s;
  angle=angle-dialAngleOffset
  let msg=h+':'+m//+'.'+s+'  '+Math.ceil(angle);
  console.log(msg+" "+angle)
  txt.setProperty(ui.prop.MORE, {
    text: msg
  }) 
  hourPointer.setProperty(ui.prop.MORE, {
    angle: angle
  }); 
}