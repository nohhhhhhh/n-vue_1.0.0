<script>
import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ['options', 'height'],
  mounted () {
    this.renderChart(this.chartData, this.options, this.height)
  }
}
</script>
