;(function(){
    $('button').on('click',function(){
        var url = "https://www.baidu.com/s?wd=" + $('.search input').val();
        window.open(url);
    })
})()