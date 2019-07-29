/**引入插件 */
var fs = require('fs');
var cheerio = require('cheerio'); //可以简单粗暴的理解为服务器端 jQuery 选择器

/**读取节点 */
var myHtml =  fs.readFileSync("book.html");
var $ = cheerio.load(myHtml, {decodeEntities: false}); 
var dl = $('h1 + dl');

/**返回内容 */
var returnData = {};

/**处理节点 */
function difLab(){
    for(var i=0;i<$('a').length;i++){
        var title = $('a').eq(i).parent().parent().siblings('h3').html();
        title = title ? title : 'other';
        mod($('a').eq(i),title);
    }
}

/**列出想要的格式 */
function mod(tag,key){
    var arr = [],lab_one = {};
    if(returnData[key]){
        arr = returnData[key];
    }else{
        returnData[key] = [];
    }
    lab_one['href'] = tag.attr('href');
    lab_one['val'] = tag.html(); 
    arr.push(lab_one);
}
difLab();

//这里要用JSON.stringify转成string
fs.writeFile("data.json", JSON.stringify(returnData), error => {
    if (error) return console.log("写入文件失败,原因是" + error.message);
    console.log("写入成功");
});