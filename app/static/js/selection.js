$(function () {

    var last_boxs = null;

    $('.page-element-selection').click(function() {

        //folder and file is the page
        var folder = $(this).data('folder');
        var file = $(this).data('file');

        //the image
        var src = $(this).find("img").attr('src');

        //canvas
        var canvas = document.getElementById("canvas-selection"),
        ctx = canvas.getContext("2d");

        //image background convas
        var background = new Image();
        background.src = src;

        //set canvas size
        canvas.width = background.width;
        canvas.height = background.height;

        //set size of
        $('#textarea-text-page').height = background.height;
        $('.scroll-list-image').height = background.height;


        canvas.background= src;

        background.onload = function(){
            ctx.drawImage(background,0,0);
        };

        //get info of scan page box(word) and text
        $.ajax({url: "/scan/page/"+folder+"/"+file, success: function(results){

            //boxs word
            var boxs = results.box;

            last_boxs = boxs;

            //create all box
            for(let index in boxs){

                var box = boxs[index];

                ctx.rect(box.position_left,box.position_top,box.size_width,box.size_height);
                ctx.stroke();
                ctx.lineWidth=1;
                ctx.strokeStyle="#FF0000";


            }

            //text page
            var text = results.text;
            console.log('text',text);

            $('#textarea-text-page').val(text);

        }});

    });


});



$(function () {
    $('.btn-correction').click(function () {
        var url = "/correct";
        $.ajax({
            url: url,
            type:"POST",
            data:"hugo=hugo",
             dataType : "html",
            success: function(results){
                alert(results);
            }});
    });
});