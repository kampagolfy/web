//LINK code

          function showTooltip(content, event) {
            const tooltip = document.getElementById('tooltip');
            tooltip.textContent = content;
            tooltip.style.left = `${event.pageX}px`;
            tooltip.style.top = `${event.pageY + 10}px`;
            tooltip.style.display = 'block';
        }

        function hideTooltip() {
            const tooltip = document.getElementById('tooltip');
            tooltip.style.display = 'none';
        }

        document.getElementById('make-link-button').addEventListener('click', function() {
            const url = prompt("Enter URL:");
            if (!url) {
                alert("Please enter a valid URL.");
                return;
            }

            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                if (range.toString().length > 0) {
                    const anchor = document.createElement('a');
                    anchor.href = url;
                    anchor.textContent = range.toString();
					editor.setValue(document.getElementById('Preview_p').innerHTML);

                    // Double-click for editing URL
                    anchor.addEventListener('dblclick', function() {
                        const newUrl = prompt("Enter new URL:", decodeURIComponent(anchor.href));
                        if (newUrl) {
                            anchor.href = newUrl;
							editor.setValue(document.getElementById('Preview_p').innerHTML);
                        }
                    });

                    // Mouseover for showing tooltip
                    anchor.addEventListener('mouseover', function(e) {
                        // Decode the URL for tooltip display
                        showTooltip(decodeURIComponent(anchor.href), e);
                    });

                    // Mouseout for hiding tooltip
                    anchor.addEventListener('mouseout', hideTooltip);

                    range.deleteContents();
                    range.insertNode(anchor);
                } else {
                    alert("Please select some text.");
                }
            }
			editor.setValue(document.getElementById('Preview_p').innerHTML);
        });

        function addEventListenersToContent() {
            // Adding to links
            document.querySelectorAll('#Preview_p a').forEach(anchor => {
                anchor.addEventListener('dblclick', function() {
                    const newUrl = prompt("Enter new URL:", anchor.href);
                    if (newUrl) {
                        anchor.href = newUrl;
						editor.setValue(document.getElementById('Preview_p').innerHTML);
                    }
                });

                anchor.addEventListener('mouseover', function(e) {
                    // Decode the URL for tooltip display
                    showTooltip(decodeURIComponent(anchor.href), e);
                });

                anchor.addEventListener('mouseout', hideTooltip);
            });


            // Adding events to images
            document.querySelectorAll('#Preview_p img').forEach(image => {
                image.addEventListener('mouseover', function(e) {
                    if (image.alt) {
                        showTooltip(image.alt, e);
                    }
                });

                image.addEventListener('mouseout', hideTooltip);

                // Double-click to change alt attribute
                image.addEventListener('dblclick', function() {
                    const newAlt = prompt("Enter new alt text:", image.alt);
                    if (newAlt !== null) {
                        image.alt = newAlt;
						editor.setValue(document.getElementById('Preview_p').innerHTML);
                    }
                });
            });
        }
					

        document.addEventListener('DOMContentLoaded', addEventListenersToContent);







//★★★★★★★★★Editor★★★★★★★★★★★★★★


editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
  lineNumbers: true,
  mode: "text/html",
  htmlMode: true,
  theme: "default",
   //theme: "monokai",
  lineWrapping: true, 
matchBrackets: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
		
	
});

function foldall()
{

var btn=document.getElementById("foldbtn");
  if (btn.innerHTML === "フォルド") {
        btn.innerHTML = "アンフォルド";
		editor.execCommand("foldAll");
  } else {
        btn.innerHTML = "フォルド";
		editor.execCommand("unfoldAll");
		
  }

}


editor.setOption("extraKeys", {
  "Ctrl-Y": cm => CodeMirror.commands.foldAll(cm),
  "Ctrl-I": cm => CodeMirror.commands.unfoldAll(cm),
  
})


//editor.setSize(null, "1000px");
editor.setSize("700px", "1000px");


editor.on("keypress", function() {
  var preview = document.getElementById("Preview_p");
  preview.innerHTML = editor.getValue();
   addEventListenersToContent();
});

editor.on("keyup", function() {
  var preview = document.getElementById("Preview_p");
  preview.innerHTML = editor.getValue();
   addEventListenersToContent();
});

editor.on("keydown", function() {
  var preview = document.getElementById("Preview_p");
  preview.innerHTML = editor.getValue();
   addEventListenersToContent();
});


document.getElementById("Preview_p").addEventListener("keypress", function() {
  editor.setValue(this.innerHTML);
  //addEventListenersToContent();
});

document.getElementById("Preview_p").addEventListener("keyup", function() {
  editor.setValue(this.innerHTML);
  //addEventListenersToContent();
});

document.getElementById("Preview_p").addEventListener("keydown", function() {
  editor.setValue(this.innerHTML);
  //addEventListenersToContent();
});

editor.getWrapperElement().addEventListener("resize", function() {
  editor.setSize(this.style.width, this.style.height);
});
//-------------------change theme------------------------


var themeButton = document.getElementById("themeButton");

// Add an event listener to the button
themeButton.addEventListener('click', function() {
  // Get the current theme
  var currentTheme = editor.getOption("theme");

  // Switch the theme
  if (currentTheme == "default") {
    editor.setOption("theme", "night");
	themeButton.innerHTML="ノーマルテーマ"
  } else {
    editor.setOption("theme", "default");
	themeButton.innerHTML="ダークテーマ"
  }
});



//-----------------------highlight---------------------

var previewWindow = document.getElementById("Preview_p");

// Listen for the selection event in the preview window
previewWindow.addEventListener('mouseup', function() {
  
  //var selectedText = window.getSelection().toString();
  var selectedText = getSelectedHtml().toString();
  

  // Find the location of the selected text in the source code
  var sourceCode = editor.getValue();
  var startIndex = sourceCode.indexOf(selectedText);
  var endIndex = startIndex + selectedText.length;

  // Convert the start and end indices to CodeMirror positions
  var startPos = editor.posFromIndex(startIndex);
  var endPos = editor.posFromIndex(endIndex);

  // Highlight the corresponding source code in the CodeMirror instance
  editor.setSelection(startPos, endPos);
});


//--------------------------input search text highlight-------------------------------------

//------------------------------------------------------------------

//var isDivVisible = false;
//var div = document.getElementById('searchdiv');
//var btn = document.getElementById('toggleButton');

//btn.onclick = function() {
 // if (isDivVisible) {
   // div.style.display = 'none';
  //} else {
    //div.style.display = 'inline-block';
  //}
  //isDivVisible = !isDivVisible;
//};


var isDivVisible2 = false;
var div2 = document.getElementById('searchdiv2');
var btn2 = document.getElementById('toggleButton2');

btn2.onclick = function() {
  if (isDivVisible2) {
    div2.style.display = 'none';
  } else {
    div2.style.display = 'inline-block';
  }
  isDivVisible2 = !isDivVisible2;
};

//--------------------------------------Masking------

function maskSensitiveInfo(text) {
  const maskedTelephones = text.replace(/\b(\d{2,})[- ]?(\d{5})[- ]?(\d+)\b/g, function(match, start, middle, end) {
    return `${start}***${end}`;
  });

  const maskedEmails = maskedTelephones.replace(/(\b[A-Za-z0-9._%+-]{2,})[A-Za-z0-9._%+-]{3}([A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b)/g, function(match, start, end) {
    return `${start}***${end}`;
  });

  return maskedEmails;
}

document.getElementById('maskButton').addEventListener('click', function() {
  const inputText = document.getElementById('Text_textarea').value;
  const maskedText = maskSensitiveInfo(inputText);
  document.getElementById('Text_textarea').value = maskedText;
  
});





//------------------------------------------------------------

 function gyazohozon(){
 
 var gyazo=document.getElementById("Text_textarea").value;
 var gyazo=gyazo.replace(/http/g,"<img src=\"http");
 var gyazo=gyazo.replace(/png/g,"png\"</img><br>");
 //document.getElementById("Text_textarea").value=gyazo;
 editor.setValue(gyazo);
 document.getElementById("Preview_p").innerHTML=editor.getValue();
 
  }




function search_replace()
{
var a=document.getElementById("search").value;
var b=document.getElementById("replace").value;
var c=document.getElementById("HTML_textarea").value=editor.getValue();
var c= c.replace(new RegExp(a,"g"),b);
editor.setValue(c);
}

function search_replace2()
{
var a=document.getElementById("search2").value;
var b=document.getElementById("replace2").value;
var c=document.getElementById("Text_textarea").value;
var c= c.replace(new RegExp(a,"g"),b);
document.getElementById("Text_textarea").value=c;

}


//------------------------------------------------------------




//------------------------Copy to Jira------------------------------------
function copytojira()
{
//hyphen for jira
var a=document.getElementById("Preview_p").innerHTML;
var a=a.replace(/-/g,"&#8208;");

document.getElementById("Preview_p").innerHTML=a;

//-----------------
}



//------------------------------------------------------------

function acoopenclose()
{
	var btn=document.getElementById("acoopen-close");
  if (btn.innerHTML === "アコ全展開") {
        btn.innerHTML = "アコ全縮小";
		var a=editor.getValue();
		var a=a.replace(/<details>/g,"<details open=\"\">")
		 editor.setValue(a);
		 document.getElementById("Preview_p").innerHTML=editor.getValue();
		 addEventListenersToContent();
  } else {
        btn.innerHTML = "アコ全展開";
		var a=editor.getValue();
		var a=a.replace(/<details open=\"\">/g,"<details>")
		 editor.setValue(a);
		 document.getElementById("Preview_p").innerHTML=editor.getValue();
		 addEventListenersToContent();
		
  }
}

function genbunclose()
{
	var btn=document.getElementById("genbundivbutton");
	var a=document.getElementById("genbundiv");
	var b=document.getElementById("mojisuu");
  if (btn.innerHTML === "×") {
        btn.innerHTML = "⇔";
		a.style.display = "none";
		b.innerHTML="";
		//b.style.visibility= "hidden";
		//b.style.display = "none";
		
  } else {
        btn.innerHTML = "×";
		a.style.display = "block";
		//b.style.display = "block";
		mojisuukei();
		//b.style.visibility= "visible";
		
		
  }
}



function brchange()
{


	var btn=document.getElementById("brchangebutton");
  if (btn.innerHTML === "&lt;br /&gt;に変更") {
        btn.innerHTML = "&lt;br&gt;に変更";
		var a=editor.getValue();
		var a=a.replace(/<br>/g,"<br/>")
		 editor.setValue(a);
		 document.getElementById("Preview_p").innerHTML=editor.getValue();
  } else {
        btn.innerHTML = "&lt;br /&gt;に変更";
		var a=editor.getValue();
		var a=a.replace(/<br\/>/g,"<br>")
		 editor.setValue(a);
		 document.getElementById("Preview_p").innerHTML=editor.getValue();
		
  }
}



function torikeshi()
{


var html = getSelectedHtml();
var selObj2 = '<s>'+html+"</s>"; 

//var selObj = window.getSelection(); 
//var selObj2 = selObj;

document.execCommand('insertHTML', false, selObj2);

editor.setValue(document.getElementById("Preview_p").innerHTML);

}


function futoji()
{

var html = getSelectedHtml();
var selObj2 = '<b>'+html+"</b>"; 

//var selObj = window.getSelection(); 
//var selObj2 = selObj;

document.execCommand('insertHTML', false, selObj2);

editor.setValue(document.getElementById("Preview_p").innerHTML);

}

function fontred()
{

var html = getSelectedHtml();
var selObj2 = '<font color=Red>'+html+"</font>"; 

//var selObj = window.getSelection(); 
//var selObj2 = selObj;

document.execCommand('insertHTML', false, selObj2);

editor.setValue(document.getElementById("Preview_p").innerHTML);

}




function futojispanblack()
{
var selObj = getSelectedHtml();

var selObj2 = '<b>ccc'+selObj+"ddd</b>"; 
document.execCommand('styleWithCSS', false, true);
document.execCommand('insertHTML', false, selObj2);

//document.execCommand('styleWithCSS', false, true);
//document.execCommand('foreColor', false, "rgb(0,0,0)")
//document.execCommand("fontSize", false, b);
editor.setValue(document.getElementById("Preview_p").innerHTML);

var a=editor.getValue();
var a=a.replace(/ccc/g,"<span style=\"color:rgb\(0\,0\,0\);\">");
var a=a.replace(/ddd/g,"</span>");
document.getElementById("Preview_p").innerHTML=a;

editor.setValue(a);
//editor.setValue(document.getElementById("Preview_p").innerHTML);

}




function insertselectHTML()
{
b=prompt("挿入したいHTMLを貼り付けてください。","");

document.execCommand('insertHTML', false, b);

editor.setValue(document.getElementById("Preview_p").innerHTML);
}



function getSelectedHtml() {
    let html = "";
    if (typeof window.getSelection != "undefined") {
        let sel = window.getSelection();
        if (sel.rangeCount) {
            let container = document.createElement("div");
            for (let i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;

        }
    }
    return html;
}

function removeHtmlTagsExceptBr(html) {
    return html.replace(/<(?!br\s*\/?)[^>]+>/g, '');
}

function makeinserttext()
{
var a=document.getElementById("inserttextarea").value;
var a=a.replace(/\n</g,"\n<b><");
var a=a.replace(/>\n/g,"></b>\n");
var a=a.replace(/\n/g,"<br>\n");
var a=a.replace(/"/g,"</b>\"");
var a=a.replace(/ <\/b>"/g," \"<b>");
var a=a.replace(/\( \)/g,"\(&nbsp; \)");

document.getElementById("inserttextarea").value=a;

}


function getSelectedText() {
    let text = "";
    if (typeof window.getSelection != "undefined") {
        text = window.getSelection().toString();
    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
        text = document.selection.createRange().text;
    }
    return text;
}


function fontsizechange_underline()
{
var b=prompt("見出し+下線設定の例: 設定部分を選択し、フォントサイズ12や16だけの入力し、Enter押す\n見出し1 : 16\n見出し2 : 14\n見出し3 : 12","");

var selObj = window.getSelection(); 
document.execCommand('styleWithCSS', false, true);
var selObj2 = '<b><span style="font-size:'+b+'pt;'+' colorrgb;"><u>'+selObj+"</u></span></b>"; 
document.execCommand('insertHTML', false, selObj2);

//document.execCommand('styleWithCSS', false, true);
//document.execCommand('foreColor', false, "rgb(0,0,0)")
//document.execCommand("fontSize", false, b);
editor.setValue(document.getElementById("Preview_p").innerHTML);

var a=editor.getValue();
var a=a.replace(/colorrgb/g,"color:rgb\(0\,0\,0\)");
document.getElementById("Preview_p").innerHTML=a;

editor.setValue(a);
//editor.setValue(document.getElementById("Preview_p").innerHTML);



}

function fontsizechange()
{
var b=prompt("見出し設定の例: 設定部分を選択し、フォントサイズ12や16だけの入力し、Enter押す\n見出し1 : 16\n見出し2 : 14\n見出し3 : 12","");

var selObj = window.getSelection(); 
document.execCommand('styleWithCSS', false, true);
var selObj2 = '<b><span style="font-size:'+b+'pt;'+' colorrgb;">'+selObj+"</span></b>"; 
document.execCommand('insertHTML', false, selObj2);

//document.execCommand('styleWithCSS', false, true);
//document.execCommand('foreColor', false, "rgb(0,0,0)")
//document.execCommand("fontSize", false, b);
editor.setValue(document.getElementById("Preview_p").innerHTML);

var a=editor.getValue();
var a=a.replace(/colorrgb/g,"color:rgb\(0\,0\,0\)");
document.getElementById("Preview_p").innerHTML=a;

editor.setValue(a);
//editor.setValue(document.getElementById("Preview_p").innerHTML);



}




function clearformat()
{

var html = getSelectedHtml();
var text = getSelectedText();
var result = removeHtmlTagsExceptBr(html);
var  a=text.replace(/\n/g, '<br>');

//var selObj = window.getSelection(); 
//var selObj2 = selObj;

//document.execCommand('insertHTML', false, selObj2);
//document.execCommand('insertHTML', false, result);
document.execCommand('insertHTML', false, a);

editor.setValue(document.getElementById("Preview_p").innerHTML);
}

function kaigyou_seiri()
{
var a=editor.getValue();
//reset all
var a=a.replace(/\n/g,"")
var a=a.replace(/			/g,"")
var a=a.replace(/    /g,"")
var a=a.replace(/		/g,"")


//table
var a=a.replace(/<tbody>/g,"\n<tbody>")
var a=a.replace(/<tr>/g,"\n		<tr>\n")
var a=a.replace(/<td>/g,"<td>\n")
var a=a.replace(/<\/td>/g,"</td>")
var a=a.replace(/<\/tr>/g,"\n		</tr>")






//
var a=a.replace(/<br>/g,"<br>\n")
var a=a.replace(/<br \/>/g,"<br \/>\n")
var a=a.replace(/<br\/>/g,"<br\/>\n")


//アコーディオン
//var a=a.replace(/<b><span/g,"			<b><span")

var a=a.replace(/<details>/g,"<details>\n")
var a=a.replace(/<\/details>/g,"<\/details>\n")

var a=a.replace(/<summary><b><span style=/g,"		<summary>\n			<b><span style=")

//var a=a.replace(/<summary>/g,"		<summary>\n")

var a=a.replace(/<div style=\"text-align:/g,"			<div style=\"text-align:")

var a=a.replace(/<\/summary>/g,"\n		<\/summary>\n")

var a=a.replace(/<summary><span style=/g,"		<summary>\n			<span style=")


var a=a.replace(/-->/g,"-->\n")




editor.setValue(a);
document.getElementById("Preview_p").innerHTML=editor.getValue();
}


function Preview()
{
var a=document.getElementById("Preview_p").innerHTML;
var myWindow = window.open("", "MsgWindow", "width=800,height=900");
myWindow.document.write("<title>コンテンツプレビュー</title>"+a);
}

function TextCopy_selected()
{
var selectedText = editor.getSelection();
navigator.clipboard.writeText(selectedText)
}

function imagecopy()
{
	document.getElementById("HTML_textarea").value=editor.getValue();
	     
		 const input = document.getElementById('HTML_textarea').value;
            const match = input.match(/<img src="([^"]+)" alt="">/);

            if (match && match[1]) {
                navigator.clipboard.writeText(match[1])
                    .then(() => showAlertgreen("イメージコードをコピーしました"))
                    .catch(err => showAlert('コピーに失敗しました: ' + err));
            } else {
                showAlert("有効なイメージコードが見つかりません");
            }
			
        }
		
		function imagecopy_NONOPASTE()
{
	document.getElementById("HTML_textarea").value=editor.getValue();
	     
		 const input = document.getElementById('HTML_textarea').value;
            const match = input.match(/<img src="([^"]+)" alt="">/);

            if (match && match[1]) {
                var nonopaste="![]("+match[1]+")";
				navigator.clipboard.writeText(nonopaste)
				    .then(() => showAlertgreen("NoNoPasteへのイメージコードをコピーしました"))
                    .catch(err => showAlert('コピーに失敗しました: ' + err));
									
					//var a="https://nopaste.linecorp.com";
					//var myWindow = window.open("https://nopaste.linecorp.com", "MsgWindow", "width=800,height=900");
					window.open("https://nopaste.linecorp.com", "MsgWindow", "width=1000,height=900");
					//myWindow.document.write("<title>NonoPaste</title>"+a);
					
            } else {
                showAlert("有効なイメージコードが見つかりません");
            }
						
        }
			
  function showAlert(message) {
            const alertBox = document.createElement('div');
            alertBox.className = 'alert-box';
            alertBox.innerText = message;

            document.body.appendChild(alertBox);

            setTimeout(() => {
                alertBox.classList.add('hide');
                setTimeout(() => {
                    alertBox.remove();
                }, 500); // Wait for the fade-out transition to complete
            }, 1000); // Display for 5 seconds
        }
		
		function showAlertgreen(message) {
            const alertBox = document.createElement('div');
            alertBox.className = 'alert-box-green';
            alertBox.innerText = message;

            document.body.appendChild(alertBox);

            setTimeout(() => {
                alertBox.classList.add('hide');
                setTimeout(() => {
                    alertBox.remove();
                }, 500); // Wait for the fade-out transition to complete
            }, 1000); // Display for 5 seconds
        }
  			
			
			

function TextCopy()
{
    document.getElementById("HTML_textarea").value=editor.getValue();
	document.getElementById("HTML_textarea").select();
    document.execCommand('copy');
editor.execCommand("selectAll");
showAlertgreen("コードをコピーしました");
	

	
}

function makebold()
{
var selObj = window.getSelection(); 
var text="<b>"+selObj+"</b>";
document.execCommand('insertText', false, text);
}

//function makesection_ko()
//{
//var selObj = window.getSelection(); 
//var text="<div style='padding: 10px; margin-bottom: 10px; border: 1px solid #FF6666; background-color: rgba\(255,0,0,0.1\);'><b><font //color='#ff0000'>※주의 사항※</font><br></b>"+"<font color= '#000000'>"+selObj+"</font></div>";
//document.execCommand('insertHTML', false, text);
//}

//function makesection_ko_text()
//{
//var selObj = window.getSelection(); 
//var a=selObj.split("\n");
//var text="{section start-ko}\n"+selObj+"\n{section end-ko}\n";
//document.execCommand('insertText', false, text);
//}

//function makesection_ja()
//{
//var selObj = window.getSelection(); 
//var text="<div style='padding: 10px; margin-bottom: 10px; border: 1px solid #FF6666; background-color: rgba\(255,0,0,0.1\);'><b><font color='#ff0000'>注意:</font><br></b>"+"<span style='color: #ff0000;'>"+selObj+"</span></div>";
//document.execCommand('insertHTML', false, text);
//}


//■■■■■■■■■■■■SECTIONS■■■■■■■■■■■■■■■■■

function makesection_ja_text_chuui()
{
var selObj = window.getSelection(); 
//var a=selObj.split("\n");
var text="{section start-ja-注意}\n"+selObj+"\n{section chuui end-ja}\n";
document.execCommand('insertText', false, text);
}

function makesection_ja_text_sankou()
{
var selObj = window.getSelection(); 
//var a=selObj.split("\n");
var text="{section start-ja-参考}\n"+selObj+"\n{section sankou end-ja}\n";
document.execCommand('insertText', false, text);
}

//----------------------------------------

function makesection_th_text_chuui()
{
var selObj = window.getSelection(); 
//var a=selObj.split("\n");
var text="{section start-th-ข้อควรทราบ}\n"+selObj+"\n{section chuui end-th}\n";
document.execCommand('insertText', false, text);
}

function makesection_th_text_sankou()
{
var selObj = window.getSelection(); 
//var a=selObj.split("\n");
var text="{section start-th-ข้อมูลเพิ่มเติม}\n"+selObj+"\n{section sankou end-th}\n";
document.execCommand('insertText', false, text);
}




function list()
{
document.execCommand("insertHTML", false, "&nbsp; &nbsp;<img src='https://scdn.line-apps.com/lan/image/line/ios/ja/helpArticle/arrow-right_regular_20230516.png' style='width: 10px; vertical-align: middle'>");
//https://scdn.line-apps.com/lan/image/line/ios/ja/helpArticle/arrow-right_regular_20230516.png" style="width: 10px; vertical-align: middle 
//style='width: 10px; vertical-align: middle'>
}

function midashi12()
{
var selObj = window.getSelection(); 
var text="{{--見出し③12pt : "+selObj+"--}}";
document.execCommand('insertText', false, text);
}

function midashi14()
{
var selObj = window.getSelection(); 
var text="{{--見出し②14pt : "+selObj+"--}}";
document.execCommand('insertText', false, text);
}

function midashi16()
{
var selObj = window.getSelection(); 
var text="{{--見出し①16pt : "+selObj+"--}}";
document.execCommand('insertText', false, text);
}

function acco()
{
var selObj = window.getSelection(); 
var text="{{▼"+selObj+"}}";
document.execCommand('insertText', false, text);

}

function acco2()
{
var selObj = window.getSelection(); 
var text="{{▶"+selObj+"}}";
document.execCommand('insertText', false, text);
}

function acco3()
{
var selObj = window.getSelection(); 
var text="{{●"+selObj+"}}";
document.execCommand('insertText', false, text);
}


function kaigyoukatto()
{
var katto=document.getElementById("Text_textarea").value;
var katto=katto.replace(/\n\n/g,"\n");

document.getElementById("Text_textarea").value=katto;
}

function mouseposition(event)
{
mousex = event.clientX;
mousey = event.clientY;
}

(function(){
  var myContextMenu = document.getElementById('js-contextmenu');
  document.body.addEventListener('contextmenu',function(e){
    var showX = e.pageX;
    var showY = e.pageY;

 if (e.pageY > 100) {
        showY = showY-100;
    } 

    myContextMenu.style.left = mousex+'px';
    myContextMenu.style.top = mousey-150+'px';
    myContextMenu.classList.add('show');
  });
  document.body.addEventListener('click',function(){
    if(myContextMenu.classList.contains('show')) {
      myContextMenu.classList.remove('show');
    }
  })
}());


function link()
{
a=prompt("URLを入力してください","https://");
document.execCommand("createLink",false,a);
editor.setValue(document.getElementById('Preview_p').innerHTML);
addEventListenersToContent();
}

function link2()
{
b=prompt('URLを入力してください target="_blank" 記載あり',"https://");

var html = getSelectedHtml();

var selObj2 = '<a href="'+b+'" target="_blank">'+html+'</a>'; 

//var selObj = window.getSelection(); 
//var selObj2 = selObj;

document.execCommand('insertHTML', false, selObj2);
editor.setValue(document.getElementById("Preview_p").innerHTML);
addEventListenersToContent();

}



function texttoHTML()
{
//document.getElementById("HTML_textarea").value=document.getElementById("Preview_p").innerHTML;

editor.setValue(document.getElementById('Preview_p').innerHTML);

}

function jidouka()
{



//text_to_html();

mongonTH();



var a=editor.getValue();

var a=a.replace(/{{●/g,"<details><summary><span style=\"color: rgb\(39, 85, 172\);\">");
var a=a.replace(/{{▶/g,"<details><summary><span style=\"color: rgb\(39, 85, 172\);\">");
var a=a.replace(/{{▼/g,"<details><summary><b><span style=\"color: rgb\(39, 85, 172\);\">");
var a=a.replace(/}}/g,"</span></b></summary>");
var a=a.replace(/{end1}/g,"</details>");
var a=a.replace(/{end2}/g,"</details>");
var a=a.replace(/{end3}/g,"</details>");

var a=a.replace(/{┌----------------------2start----------------------┐}/g,"<div style=\"text-align: left; margin-left: 20px;\" align=\"left\">");
var a=a.replace(/{└----------------------2end----------------------┘}/g,"</div>");
var a=a.replace(/{┌----------------------3start----------------------┐}/g,"<div style=\"text-align: left; margin-left: 30px;\" align=\"left\">");
var a=a.replace(/{└----------------------3end----------------------┘}/g,"</div>");

var a=a.replace(/<\/summary><br>/g,"</summary>");
var a=a.replace(/<\/details><br>/g,"</details>");
var a=a.replace(/<\/details><\/div><br>/g,"</details></div>");
var a=a.replace(/<\/details><\/div><\/div><br>/g,"</details></div></div>");

var a=a.replace(/<b><b>/g,"<b>");
var a=a.replace(/<\/b><\/b>/g,"<\/b>");


//---------------section ja - 注意
var a=a.replace(/{section start-ja-注意}/g,"<div style=\"padding: 10px; margin: 10px 0; border: 1px solid #FF6666; background-color: rgba(255, 0, 0, 0.1);\"> <div style=\"display: flex; align-items: center; justify-content: flex-start;\"><img src=\"https://scdn.line-apps.com/lan/image/line/android/ja/helpArticle/exclamation-triangle_regular_android_jp.png\" style=\"width: 25px;\"><span style=\" font-size: 14pt; color: rgb(0, 0, 0);\">&nbsp;注意</span><br></div><font color=\"#000000\">");
var a=a.replace(/注意<\/span><br><\/div><font color=\"\#000000\"><br>/g,"注意</span><br></div><font color=\"#000000\">");

var a=a.replace(/{section chuui end-ja}/g,"</font></div>");

//---------------section ja - 注意 end


//---------------section ja - 参考
var a=a.replace(/{section start-ja-参考}/g,"<div style=\"padding: 10px; margin: 10px 0; border: 1px solid #06C755; background-color: rgba(6, 199, 85, 0.1);\"><div style=\"display: flex; align-items: center; justify-content: flex-start;\"><img src=\"https://scdn.line-apps.com/lan/image/line/android/ja/helpArticle/info-circle_regular_android_jp.png\" style=\"width: 25px;\"><span style=\" font-size: 14pt; color: rgb(0, 0, 0);\">&nbsp;参考</span><br></div><font color=\"#000000\">");
var a=a.replace(/参考<\/span><br><\/div><font color=\"\#000000\"><br>/g,"参考</span><br></div><font color=\"#000000\">");


//---------------section ja - 参考 end

var a=a.replace(/{section sankou end-ja}/g,"</font></div>");


//■■■■■■■■■■■■■■TH■■■■■■■■■■■■

//---------------section th - 注意

var a=a.replace(/{section start-th-ข้อควรทราบ}/g,"<!-- 注意セクション ここから--><div style='padding: 10px; margin: 10px 0; border: 1px solid #e7d38d; background-color: #fffef7;'><div style='display: flex; align-items: center; justify-content: flex-start;'><img src='https://scdn.line-apps.com/lan/image/line/smartphone/en/helpArticle/lds_exclamation-triangle_solid.png' style='width:25px;'><span style=' font-size: 14pt; color: rgb(0, 0, 0);'>&nbsp;ข้อควรทราบ :</span><br></div><font color='#000000'>");

//var a=a.replace(/{section start-th-ข้อควรทราบ}/g,"<div style=\"padding: 10px; margin: 10px 0; border: 1px solid #FF6666; background-color: rgba(255, 0, 0, 0.1);\"> <div style=\"display: flex; align-items: center; justify-content: flex-start;\"><img src=\"https://scdn.line-apps.com/lan/image/line/android/ja/helpArticle/exclamation-triangle_regular_android_jp.png\" style=\"width: 25px;\"><span style=\"font-size: 14pt;color: rgb(0, 0, 0);\">&nbsp;ข้อควรทราบ :</span><br></div><font color=\"#000000\">");

var a=a.replace(/<\/div><font color=\'\#000000\'><br>/g,"</div><font color=\"#000000\">");

var a=a.replace(/{section chuui end-th}/g,"</font></div>");

//---------------section th - 注意 end


//---------------section th - 参考

var a=a.replace(/{section start-th-ข้อมูลเพิ่มเติม}/g,"<!-- 参考セクション ここから--><div style='padding: 10px; margin: 10px 0; border: 1px solid #06C755; background-color: rgba(6, 199, 85, 0.1);'><div style='display: flex; align-items: center; justify-content: flex-start;'><img src='https://scdn.line-apps.com/lan/image/line/smartphone/en/helpArticle/lds_info-circle_solid.png' style='width: 25px;'><b><span style='color: rgb(0, 0, 0);'>&nbsp;ข้อมูลเพิ่มเติม :</span></b><br></div><font color='#000000'>");


//var a=a.replace(/{section start-th-ข้อมูลเพิ่มเติม}/g,"<div style=\"padding: 10px; margin: 10px 0; border: 1px solid #06C755; background-color: rgba(6, 199, 85, 0.1);\"><div style=\"display: flex; align-items: center; justify-content: flex-start;\"><img src=\"https://scdn.line-apps.com/lan/image/line/android/ja/helpArticle/info-circle_regular_android_jp.png\" style=\"width: 25px;\"><b><span style=\"color: rgb(0, 0, 0);\">&nbsp;ข้อมูลเพิ่มเติม :</span></b><br></div><font color=\"#000000\">");

var a=a.replace(/<font color=\'\#000000\'><br>/g,"<font color=\'#000000\'>");

//---------------section th - 参考 end

var a=a.replace(/{section sankou end-th}/g,"</font></div>");


document.getElementById('Preview_p').innerHTML=a;

//document.getElementById('HTML_textarea').value=document.getElementById('Preview_p').innerHTML;
editor.setValue(document.getElementById('Preview_p').innerHTML);

//var d=document.getElementById('HTML_textarea').value;
//var d=d.replace(/<details>/g,"<details>\n");
//var d=d.replace(/<\/details>/g,"<\/details>\n");

}

function mongonTH()
{

var c=document.getElementById('Text_textarea').value;

var c=c.replace(/&/g,"&amp;");
var c=c.replace(/</g,"&lt;");
var c=c.replace(/>/g,"&gt;");



var c=c.replace(/\nรายการคำถาม :\n\(q-start\)/g,"\(q-start\)\nรายการคำถาม :");
//var c=c.replace(/\(\/q-end\)\n/g,"\(\/q-end\)");

var c=c.replace(/\n</g,"\n<b><");
var c=c.replace(/>\n/g,"></b>\n");
var c=c.replace(/\n/g,"<br>");

var c=c.replace(/"/g,"</b>\"");
var c=c.replace(/ <\/b>"/g," \"<b>");
var c=c.replace(/\( \)/g,"\(&nbsp; \)");
var c=c.replace(/รายการคำถาม :/g,"<b>รายการคำถาม :</b>");
var c=c.replace(/\"<b>URL สำหรับตอบกลับ<\/b>\"/g,"\"URL สำหรับตอบกลับ\"");
var c=c.replace(/ <br>/g,"<br>");
var c=c.replace(/"<b> ≡ "<b>/g,"\"<b> ≡ <\/b>\"");
var c=c.replace(/"<b> V "<b>/g,"\"<b> V <\/b>\"");
var c=c.replace(/<br><br><br>/g,"<br><br>");
var c=c.replace(/LINE ให้เป็นเวอร์ชันล่าสุด ที่นี่/g,"LINE ให้เป็นเวอร์ชันล่าสุด <a href=\"https://line.me/update\">ที่นี่</a>");
var c=c.replace(/ไปที่หน้าการตั้งค่า/g," <a href=\"https://line.me/R/nv/settings/\">ไปที่หน้าการตั้งค่า</a>");
var c=c.replace(/- วิธีการแก้ไขเบื้องต้น/g,"- <a href=\"https://help.line.me/line/?contentId=20000199\">วิธีการแก้ไขเบื้องต้น</a>");
var c=c.replace(/"<b> T "<b>/g,"\"<b> T <\/b>\"");
var c=c.replace(/วิธีการแก้ไขปัญหาเบื้องต้น :/g,"<b><font color=\"#00b050\">วิธีการแก้ไขปัญหาเบื้องต้น :<\/font><\/b>");
var c=c.replace(/"<b> ↓ "<b>/g,"\"<b>  ↓ <\/b>\"");
var c=c.replace(/หมายเหตุ:/g,"<b>หมายเหตุ:<\/b>");
var c=c.replace(/"<b> X "<b>/g,"\"<b>  X <\/b>\"");

var c=c.replace(/<br>&lt;/g,"<br><b>&lt;");
var c=c.replace(/&gt;<br>/g,"&gt;</b><br>");

var c=c.replace(/<br>/g,"<br>\n");

//JP------------------------------------
var c=c.replace(/\[/g,"<b>[");
var c=c.replace(/\]/g,"]</b>");

//TW------------------------------------
var c=c.replace(/「/g,"<b>「");
var c=c.replace(/」/g,"」</b>");


//CN------------------------------------
var c=c.replace(/［/g,"<b>［");
var c=c.replace(/］/g,"］</b>");

//--------------------見出しセット
var c=c.replace(/{{--見出し③12pt : /g,"<b><span style=\"font-size: 12pt; color: rgb(0, 0, 0);\">");
var c=c.replace(/{{--見出し②14pt : /g,"<b><span style=\"font-size: 14pt; color: rgb(0, 0, 0);\">");
var c=c.replace(/{{--見出し①16pt : /g,"<b><span style=\"font-size: 16pt; color: rgb(0, 0, 0);\">");
var c=c.replace(/--}}/g,"</span></b>");


//escape charecters
//ทำไม่ได้พังหมดเลย
//var c=c.replace(/</g,"&lt;");
//var c=c.replace(/>/g,"&gt;");
//var c=c.replace(/&/g,"&amp;");




//document.getElementById('HTML_textarea').value=c;
editor.setValue(c);
document.getElementById('Preview_p').innerHTML=editor.getValue();


}

function text_to_html()
{
var c=document.getElementById("Text_textarea").value;
var c=c.replace(/\n</g,"\n<b><");
var c=c.replace(/>\n/g,"></b>\n");
var c=c.replace(/\n/g,"<br>");
var c=c.replace(/　/g,"&nbsp; ");


document.getElementById("Preview_p").innerHTML=c;
//document.getElementById("HTML_textarea").value=document.getElementById("Preview_p").innerHTML;
editor.setValue(document.getElementById('Preview_p').innerHTML);


//var d=document.getElementById("HTML_textarea").value;
var  d=editor.getValue()

var d=d.replace(/<br>/g,"<br>\n");
//document.getElementById("HTML_textarea").value=d;
editor.setValue(d);
}

function htmlhanei()
{
document.getElementById("Preview_p").innerHTML=editor.getValue();
 addEventListenersToContent();
 
}


function closepostit()
{
document.getElementById("mydiv").style.display="none";
//document.getElementById("risuto").style.display="none";

}

function openpostit()
{
document.getElementById("mydiv").style.display="block";
}


//-----------------------------------



//Make the DIV element draggagle:
dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

//memo:
//2023/05/25 15:27 KOの


function copyRichText() {
  // Get the editable div
  var editableDiv = document.getElementById('Preview_p');
  
  // Clone the editable div
  var cloneDiv = editableDiv.cloneNode(true);
  
  // Remove font-size and font-family styles from the clone
  Array.from(cloneDiv.querySelectorAll('*')).forEach(function(element) {
    element.style.fontSize = ''; // Remove font size
    element.style.fontFamily = ''; // Remove font family
  });

  // Append the clone to the body temporarily and make it off-screen
  cloneDiv.style.position = 'absolute';
  cloneDiv.style.left = '-9999px';
  document.body.appendChild(cloneDiv);

  // Select the content inside the clone
  var range = document.createRange();
  range.selectNodeContents(cloneDiv);
  var selection = window.getSelection();
  selection.removeAllRanges(); // Clear any existing selections
  selection.addRange(range); // Select the text in the range

  // Execute the copy command
  var successful = document.execCommand('copy');
  var msg = successful ? 'successful' : 'unsuccessful';
  console.log('Copy command was ' + msg);

  // Deselect the text and remove the clone from the body
  selection.removeAllRanges();
  document.body.removeChild(cloneDiv);
}

//__________________________________________________________________________________

  document.getElementById("replaceButton").addEventListener("click", function() {
    	
	var aa=document.getElementById("Text_textarea").value;
	
	var aa=aa.replace(/▼/g,"");
	var aa=aa.replace(/▽/g,"");
	var aa=aa.replace(/⇒/g,"");
	
	var aa=aa.replace(/\/\//g,"");
	
	//var aa=aa.replace(/-/g,"");
	
	var aa=aa.replace(/<\/b>><b>/g,"</b>&gt;<b>");
	
	
	var aa=aa.replace(/<b>/g,"");
	var aa=aa.replace(/<\/b>/g,"");
	var aa=aa.replace(/\[/g,"<b>[");
	
	var aa=aa.replace(/\[/g,"<b>[");
	var aa=aa.replace(/\]/g,"]</b>");
	
	//tw用
	var aa=aa.replace(/\「/g,"<b>「");
	var aa=aa.replace(/\」/g,"」</b>");
	
	
	//CN用
	var aa=aa.replace(/\［/g,"<b>［");
	var aa=aa.replace(/\］/g,"］</b>");
	
	//tobedone-done
	var aa=aa.replace(/To be checked/g,"Done");
	var aa=aa.replace(/To be done/g,"Done");
	
	
	
	var aa=aa.replace(/"/g,"</b>\"");
    var aa=aa.replace(/ <\/b>"/g," \"<b>");
	
	var aa=aa.replace(/<b><b>/g,"<b>");
	
	document.getElementById("Text_textarea").value=aa;
	
	const leftText = document.getElementById("Text_textarea").value;
    const rightText = editor.getValue();
	//const rightText = document.getElementById("outputText").value;
	
    // Extracting Japanese and Thai sentences based on the pattern from the left textarea
    const pattern = /(\d+\n[\s\S]+?)Done/g;
    let match;
    let replacements = {};

    while ((match = pattern.exec(leftText)) !== null) {
      const [fullMatch, content] = match;
      const [japanese, thai] = content.split('\n').map(line => line.trim()).filter(line => line && !line.match(/^\d+$/) && line !== 'Done');
      replacements[japanese] = thai;
    }

    // Replacing Japanese text with Thai in the right textarea
    let replacedText = rightText;
    for (const [japanese, thai] of Object.entries(replacements)) {
      replacedText = replacedText.replace(japanese, thai);
    }

editor.setValue(replacedText);
htmlhanei();
addEventListenersToContent();
    //document.getElementById("outputText").value = replacedText;
  });
  
  
  //__________________________________________________________________________________
  document.getElementById("replaceButtonshudou").addEventListener("click", function() {
    	
	var aa=document.getElementById("Text_textarea").value;
	
	var aa=aa.replace(/▼/g,"");
	var aa=aa.replace(/\/\//g,"");
	
		//tobedone-done
	var aa=aa.replace(/To be checked/g,"Done");
	var aa=aa.replace(/To be done/g,"Done");
		
	document.getElementById("Text_textarea").value=aa;
	
	const leftText = document.getElementById("Text_textarea").value;
    const rightText = editor.getValue();
	//const rightText = document.getElementById("outputText").value;
	
    // Extracting Japanese and Thai sentences based on the pattern from the left textarea
    const pattern = /(\d+\n[\s\S]+?)Done/g;
    let match;
    let replacements = {};

    while ((match = pattern.exec(leftText)) !== null) {
      const [fullMatch, content] = match;
      const [japanese, thai] = content.split('\n').map(line => line.trim()).filter(line => line && !line.match(/^\d+$/) && line !== 'Done');
      replacements[japanese] = thai;
    }

    // Replacing Japanese text with Thai in the right textarea
    let replacedText = rightText;
    for (const [japanese, thai] of Object.entries(replacements)) {
      replacedText = replacedText.replace(japanese, thai);
    }

editor.setValue(replacedText);
htmlhanei();
    //document.getElementById("outputText").value = replacedText;
  });

  //__________________________________________________________________________________  
  
  

 function removeAllStylesAndCleanUp() {
            const htmlInput = editor.getValue();
			
            // Remove all inline style attributes
            let processedHtml = htmlInput.replace(/style="[^"]*"/gi, '');

            // Remove all span tags entirely
            processedHtml = processedHtml.replace(/<\/?span[^>]*>/gi, '');

            // Change <br style=""> to <br>
            processedHtml = processedHtml.replace(/<br\s*\/?>/gi, '<br>');

            // Update the output textarea
			var a= processedHtml.trim();
            editor.setValue(a);
        }


function mojisuukei(){

var moji=document.getElementById("Text_textarea").value;
var moji4=moji.replace(/ /g,"");
var moji4=moji4.replace(/	/g,"");

var moji2=moji.split("\n");
var moji5=moji.split(" ");

var moji3=moji2.length;
var moji6=moji5.length;
var len = moji4.length-moji3+1;


var spaces = moji.match(/\S+/g);

  let words;
  if (spaces) {
    words = spaces.length;
  } else {
    words = 0;
  }

document.getElementById("mojisuu").innerHTML="文字数："+"<b>"+len+"字"+"</b>"+" / "+"語数："+"<b>"+words+"語"+"</b>";

}

function shousaisakujo()
{
var a = editor.getValue();
var a=a.replace(/<\/details><details>/g,"");
var a=a.replace(/<\/details><details open=\"\">/g,"");

var a=a.replace(/<b><span style=\"font-size\: 12pt; color\: rgb\(0, 0, 0\);\">-<\/span><\/b>/g,"");

editor.setValue(a);

document.getElementById("Preview_p").innerHTML=editor.getValue();

}

function add_html_item()
{
var a=document.getElementById("genbunspan").innerHTML;
var b=a+"<button onclick=\"alerttext()\">test</button>";
document.getElementById("genbunspan").innerHTML=b;
}

document.getElementById("htmlspan").addEventListener("load", add_html_item);
  

