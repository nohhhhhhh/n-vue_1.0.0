<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options', 'height'],
  mounted () {
    this.renderChart(this.chartData, this.options, this.height)
  }
}
</script>
