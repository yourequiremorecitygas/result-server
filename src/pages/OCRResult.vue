<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Result Image</h4>
            <p class="category">Image with OCR Result ({{ocrResult.region}})</p>
          </md-card-header>
          <md-card-content>
            <div style="text-align:center;">
              <canvas width="640" height="480" ref="canvas" />
            </div>
          </md-card-content>
        </md-card>
      </div>

    </div>
  </div>
</template>

<script>
import { SimpleTable, OrderedTable } from "@/components";

export default {
  components: {
    OrderedTable,
    SimpleTable
  },

  computed:{
    ocrResult: function(){
      return this.$store.state.dashboard.ocrResult
    },
    imagePath: function(){
      const filename = (this.ocrResult['file_name'] || "").replace('./', '')
      const region = this.ocrResult['region'] || "/"
      return `https://capstone12.s3.ap-northeast-2.amazonaws.com${region}/${filename}`
    }
  },

  mounted: function(){
    debugger;
    const image = new Image();
    const that = this;
    image.addEventListener('load', function() {
      const ctx = that.$refs.canvas.getContext("2d");
      const data = that.ocrResult

      ctx.drawImage(image, 0, 0, 640, 480);

      ctx.strokeStyle = "#ff0000"
      ctx.lineWidth = 4;
      ctx.font = '30px Arial';
      ctx.fillStyle = "red";
      ctx.fillText(data['result'].join(''), parseInt(data['col_min'],10) + 20, parseInt(data['row_min'],10) - 5);
      ctx.strokeRect(data['col_min'], data['row_min'], data['height'], data['width']);

    }, false);

    image.src = this.imagePath
  }

};
</script>
