var dict={};
for(var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i); 
    if(key[1]==='_'){
        var myJson = JSON.parse(localStorage.getItem(key));
        var q_id = myJson["question_id"];
        var answer_arr = myJson["answer"]
        var flag=0;
        var this_answer=""
        for (var j = 0; j < answer_arr.length; j++)
            if(answer_arr[j]["is_true"]===1){
                if(flag==1){this_answer+="|";}
                this_answer += answer_arr[j]["answer_id"];
                flag=1;
            }
        dict[q_id]=this_answer;
        //console.log(i, dict);
    }
    else if(key[1]==='u')
        var question_list = localStorage.getItem(key).split(",");
}
//console.log(question_list);
var answer_list=[];
for(var i=0; i < question_list.length; i++){
    answer_list.push(dict[question_list[i]]);
}
//console.log(answer_list);
localStorage.answer_record=answer_list;

//可以只复制以上的部分执行后手动点提交，效果相同。

var url = "https://rdjy.tongji.edu.cn/jjfz/lesson/exam/submit";
var _xsrf = document.getElementsByName("_xsrf")[0].value;
var rawText = document.getElementsByTagName('html')[0].innerHTML;
var patt1 = /(?<=record_id:\ ").*?(?=\")/;
var record_id = rawText.match(patt1)[0];
var params = "record_id="+record_id+"&answer_record="+answer_list+"&mark_record="+localStorage.mark_record+"&question_list="+localStorage.question_list+"&_xsrf="+_xsrf;
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
//Long live the Communist Party of China !
