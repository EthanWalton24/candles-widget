function loadStyleSheet() {
    var sheet_link = document.createElement('link')
    sheet_link.rel = 'stylesheet'
    sheet_link.type = 'text/css'
    sheet_link.href = 'https://cdn.jsdelivr.net/gh/EthanWalton24/candles-widget@latest/styles.css'
    document.getElementsByTagName('head')[0].appendChild(sheet_link)
}


function createCandlesBox() {
    //get the symbol and timeframe data from the server
    var symbols = ['BTCUSD','ETHUSD','LTCUSD']
    var timeframes = ['1m','5m','15m','1h','1d']
    var blocked = false



    //create the main container
    var cont = document.getElementById(document.querySelector('script[src="https://cdn.jsdelivr.net/gh/EthanWalton24/candles-widget@latest/candles.js').className)


    //create the form
    var form = document.createElement('form')
    form.action = 'download-candles/'
    form.method = 'post'


    var title = document.createElement('div')
    title.innerHTML = 'Candles Data'
    title.className = 'cont-title'
    form.appendChild(title)



    //create the symbol input container
    var symbol_cont = document.createElement('div')
    symbol_cont.className = 'data-cont'

    var symbol_title = document.createElement('h1')
    symbol_title.innerHTML = 'Symbol'
    symbol_cont.appendChild(symbol_title)

    var symbol_input = document.createElement('input')
    symbol_input.type='text'
    symbol_input.className = 'symbol-search'
    symbol_input.name = 'symbol'
    symbol_input.onkeyup = function(){filter_search(this)}
    symbol_input.placeholder = 'Select Symbol'
    symbol_input.autocomplete = 'off'
    symbol_cont.appendChild(symbol_input)

    var symbol_select = document.createElement('ul')
    symbol_select.className = 'symbol-select'
    for (let i=0; i<symbols.length; i++) {
        let list_ele = document.createElement('li')
        let ele_content = document.createElement('a')
        ele_content.onmousedown = function(){enter_name(this,this.textContent)}
        ele_content.innerHTML = symbols[i]
        list_ele.appendChild(ele_content)
        symbol_select.appendChild(list_ele)
    }
    symbol_cont.appendChild(symbol_select)
    form.appendChild(symbol_cont)



    //create the timeframe input container
    var timeframe_cont = document.createElement('div')
    timeframe_cont.className = 'data-cont'

    var timeframe_title = document.createElement('h1')
    timeframe_title.innerHTML = 'Timeframe'
    timeframe_cont.appendChild(timeframe_title)

    var timeframe_select = document.createElement('select')
    timeframe_select.className = 'timeframe-select'
    timeframe_select.name = 'timeframe'
    var select_default = document.createElement('option')
    select_default.selected = true
    select_default.disabled = true
    select_default.innerHTML = 'Select Timeframe'
    timeframe_select.appendChild(select_default)
    for (let i=0; i<timeframes.length; i++) {
        let option = document.createElement('option')
        option.value = timeframes[i]
        option.innerHTML = timeframes[i]
        timeframe_select.appendChild(option)
    }
    timeframe_cont.appendChild(timeframe_select)
    form.appendChild(timeframe_cont)


    //create the start date input container
    var date_cont = document.createElement('div')
    date_cont.className = 'data-cont'

    var date_title = document.createElement('h1')
    date_title.innerHTML = 'Start Date'
    date_cont.appendChild(date_title)

    var date_input = document.createElement('input')
    date_input.type = 'datetime-local'
    date_input.min = '2000-01-01'
    date_input.name = 'start-date'
    date_cont.appendChild(date_input)
    form.appendChild(date_cont)


    //create the form submit button
    var button_status = ((blocked == true) ? 'disabled' : 'enabled')
    var button_text = ((blocked == true) ? 'Rate Limit reached, come back in 24 hours' : 'Download Candles')
    var submit_button = document.createElement('button')
    submit_button.type = 'submit'
    submit_button.className = `download-button ${button_status}`
    submit_button.innerHTML = button_text
    form.appendChild(submit_button)

    
    cont.appendChild(form)

}

function filter_search(x) {
    console.log(x)
    // Declare variables
    var ul, li, a, i, txtValue;
    input = x;
    filter = input.value.toUpperCase();
    ul = x.parentNode.getElementsByTagName('ul')[0];
    li = ul.getElementsByTagName('li');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

function enter_name(x,name) {
    input = x.parentNode.parentNode.parentNode.getElementsByTagName('input')[0];
    input.value = name
}


//run the functions to create the widget on window load
window.onload = () => {
    loadStyleSheet()
    createCandlesBox()
}
