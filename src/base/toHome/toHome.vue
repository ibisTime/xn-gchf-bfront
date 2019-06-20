<template>
  <div id="app">
    <div class="icon-add-50" :style="iconstyle" @click='click' @touchmove='touchmove' @touchstart='touchstart(this,$event)' @touchend='touchend'>
    <p>返回</p><p style="margin-top:0.1rem;">首页</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      /*--------图标样式变量--------------*/
      iconrotate:0,//旋转deg
      icontranslateX:document.body.clientWidth - 80,
      icontranslateY:document.body.clientHeight - 200,
      /*--------拖动计算变量------------*/
      mouseX:0,
      mouseY:0,
      objX:0,
      objY:0,
      isDown:false
    }
  },
  methods:{
    click:function(){//图标点击事件
      this.$router.push(`/home`);
    },
    touchstart:function(obj,e){//finger touch 触发
      this.objX = this.icontranslateX;
      this.objY = this.icontranslateY;
      this.mouseX = e.touches[0].clientX;
      this.mouseY = e.touches[0].clientY;
      this.isDowm = true;
    },
    touchmove:function(e){//finger move 触发
      let x = e.touches[0].clientX;
      let y = e.touches[0].clientY;
      if (this.isDowm) {
          this.icontranslateX = parseInt(x) - parseInt(this.mouseX) + parseInt(this.objX);
          this.icontranslateY = parseInt(y) - parseInt(this.mouseY) + parseInt(this.objY);
      }
    },
    touchend:function(e){//finger from touch to notouch
      if (this.isDowm) {
          let x = e.touches[0].clientX;
          let y = e.touches[0].clientY;
          this.icontranslateX = parseInt(x) - parseInt(this.mouseX)+ parseInt(this.objX);
          this.icontranslateY = parseInt(y) - parseInt(this.mouseY)+ parseInt(this.objY);
          this.isDowm=false;
      }
    }
  },
  computed:{
    iconstyle:function(){//图标动态样式
      let arr = new Array();
      arr.push('transform:');//注意：先移动后旋转，实现原地旋转；先旋转后移动，位置按照旋转后的新坐标系确定
      arr.push('translateX('+this.icontranslateX+'px) ');
      arr.push('translateY('+this.icontranslateY+'px) ');
      arr.push('rotate('+this.iconrotate+'deg) ');
      return arr.join("");
    }
  }
}
</script>

<style>
  /*加号*/
.icon-add-50{
    position: absolute;
    box-sizing: border-box;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background-color: #028EFF;
    z-index:2101;
    text-align:center;
    padding-top:0.18rem;
    font-size:0.18rem;
    color:#fff;
  }
</style>
