// 组件
Component({
  data: {
    items: [
      { name: 'USA', value: '美国', checked: false },
      { name: 'CHN', value: '中国', checked: true },
      { name: 'BRA', value: '巴西', checked: false },
      { name: 'JPN', value: '日本', checked: false },
      { name: 'ENG', value: '英国', checked: false },
      { name: 'TUR', value: '法国', checked: false },
    ]
  },
  methods: {
    // 全部的check
    checkboxChange: function (e) {
      console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    },
    // 单个check
    checkbox(e){
      const i = e.target.dataset.id;
      this.data.items[i].checked = !this.data.items[i].checked;
      this.setData({
        items:this.data.items
      })
    }
  },

})
