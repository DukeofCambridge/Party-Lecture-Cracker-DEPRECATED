var url = "https://rdjy.tongji.edu.cn/jjfz/lesson/resource_record";
var _xsrf = document.getElementsByName("_xsrf")[0].value;
var rawText = document.getElementsByTagName('html')[0].innerHTML;
var patt1 = /(?<=resource_id:\ ").*?(?=\")/;
var resource_id = rawText.match(patt1)[0];
var patt2 = /resource_record([\s\S]+?)success/;
var segment = rawText.match(patt2);
var patt3 = /(?<=rid: \").*?(?=\")/;
var rid = segment[0].match(patt3);
// var patt4 = /(?<=resource_id: \").*?(?=\")/;
// var resource_id = segment[0].match(patt4);
var patt5 = /(?<=video_id: \").*?(?=\")/;
var video_id = segment[0].match(patt5);
var patt6 = /(?<=lesson_id: \").*?(?=\")/;
var lesson_id = segment[0].match(patt6);
var patt7 = /class=\"video_lists\"([\s\S]+?)class=\"video_lists hidden\"/;
var segment2 = rawText.match(patt7)[0];
var patt8 = /(?<=r_id=).*?(?=&)/g;
var arr = segment2.match(patt8);
for(var i=0;i<arr.length;i++){
    var params = "rid="+rid+"&resource_id="+arr[i]+"&video_id="+video_id+"&lesson_id="+lesson_id+"&_xsrf="+_xsrf;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };
    xhr.send(params);
}
//Long live the Communist Party of China !
