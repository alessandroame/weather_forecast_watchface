import ui from '@zos/ui'
import {Time} from '@zos/sensor'

let txt;
const time = new Time();
WatchFace({
  onInit() {
    console.log('index page.js on init invoke')
    txt=ui.createWidget(ui.widget.TEXT,{
      x:100,
      y:100,
      w:200,
      h:200,
      align_h: ui.align.CENTER_H,
  })
  }, 

  build() {
    console.log('index page.js on build invoke')
    time.onPerMinute(updateTime)
    updateTime()
  },

  onDestroy() {
    console.log('index page.js on destroy invoke')
  },
})

function updateTime(){
  txt.setProperty(ui.prop.MORE, {
    text: time.getHours()+":"+time.getMinutes()+"."+time.getSeconds()
  }); 
}