import ui from '@zos/ui'
import {Time} from '@zos/sensor'

let txt=null
let bg=null
let hourPointer=null
let h=0;
let m=0;
let s=0;
const time = new Time();
WatchFace({
  onInit() {
    console.log('index page.js on init invoke')
    bg=ui.createWidget(ui.widget.IMG,{
      x:0,
      y:0,
      w:480,
      h:480,
      src:'bg.png'
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
    console.log('index.js on build invoke')
    time.onPerMinute(updateTime)
    //setInterval(updateTime,10);
  },

  onDestroy() {
    console.log('index.js on destroy invoke')
  },
  onResume(){
    console.log('index.js on resume invoke')
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
  angle=angle-90
  let msg=h+':'+m//+'.'+s+'  '+Math.ceil(angle);
  console.log(msg+" "+angle)
  txt.setProperty(ui.prop.MORE, {
    text: msg
  }) 
  hourPointer.setProperty(ui.prop.MORE, {
    angle: angle
  }); 
}