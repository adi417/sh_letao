(function(){
    //初始化表单 设置参数 图标 密码用户名 不能为空 密码字段
    var $form =  $("#form");
    $form.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username:{
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    callback:{
                        message: '用户名错误'
                    }
                }
            },
            password:{
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message: '用户密码必须是6-12位'
                    },
                    callback:{
                        message: '用户密码错误'
                    }
                }


            }
        }
    });
    //表单检验成功  注册事件
    var validator = $form.data("bootstrapValidator");
    $form.on("success.form.bv",function(e){
        e.preventDefault();
        // console.log("ll");
        //发送ajax请求  获取 username和 password的值
            $.ajax({
                type:"post",
                url:"/employee/employeeLogin",
                data:$form.serialize(),
                success:function(data){
                            if(data.success){
                                location.href = "index.html"
                            }else{
                                if(data.error===1000){
                                    validator.updateStatus("username","INVALID","callback");

                                }
                                if(data.error===1001){
                                   validator.updateStatus("password","INVALID","callback")

                                }
                            }
                }

            })

    });

    //表单重置功能
    $("[type='reset']").on("click",function () {
        validator.resetForm();
    })
})();