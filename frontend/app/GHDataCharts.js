import MG from 'metrics-graphics'
import * as d3 from 'd3'


export default class GHDataCharts {

  static convertDates (data) {
    data = data.map((d) => {
      d.date = new Date(d.date)
      return d
    })
    return data
  }

  static ComparisonLineChart (selector, data, title, baseline) {
    GHDataCharts.convertDates(data)
    let keys = Object.keys(data[0]).filter((d) => { return /ratio/.test(d) })
    console.log(keys)
    return MG.data_graphic({
      title: title || 'Comparison',
      data: data,
      full_width: true,
      height: 200,
      baselines: [{value: 1, label: baseline || 'Other Repo'}],
      format: 'percentage',
      x_accessor: 'date',
      y_accessor: keys,
      target: selector
    })
  }

  static LineChart (selector, data, title) {
    let data_graphic_config = {
      title: title || 'Activity',
      data: data,
      full_width: true,
      height: 200,
      x_accessor: 'date',
      y_accessor: Object.keys(data[0]).slice(1),
      target: selector
    }

    if (Object.keys(data[0]).slice(1).length > 1) {
    var legend = document.createElement('div')
      legend.style.position = 'relative'
      legend.style.margin = '0'
      legend.style.padding = '0'
      legend.style.height = '0'
      legend.style.top = '32px'
      legend.style.left = '50%'
      legend.style.fontSize = '14px'
      legend.style.fontWeight = 'bold'
      legend.style.opacity = '0.4'
      $(selector).append(legend)
      data_graphic_config.legend = Object.keys(data[0]).slice(1),
      data_graphic_config.legend_target = legend
      $(selector).hover(() => {
        legend.style.display = 'none'
      }, () => {
        legend.style.display = 'block'
      })

    }

    GHDataCharts.convertDates(data)
    return MG.data_graphic(data_graphic_config)
  }

  static Timeline (selector, data, title) {
    var dataCleaned = []
    var legend = []
    for (var event in data) {
      if (data.hasOwnProperty(event)) {
        dataCleaned.push([{
          date: new Date(data[event]),
          value: 10
        }])
        legend.push(event)
      }
    }
    console.log(dataCleaned)
    return MG.data_graphic({
      title: title || 'Timeline',
      data: dataCleaned,
      full_width: true,
      height: 200,
      x_accessor: 'date',
      legend: legend,
      target: selector
    })
  }

  static NoChart (selector, title) {
    return MG.data_graphic({
      title: "Missing Data",
      error: 'Data unavaliable for ' + title,
      chart_type: 'missing-data',
      missing_text: title + ' could not be loaded',
      target: '#missing-data',
      full_width: true,
      height: 200
    })
  }

}
