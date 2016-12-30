/**
 * Created by tix on 2015/6/23.
 */

var point = {
	add: function () {
		$.ajax({
			'type': "POST",
			'url': '/map/point/ac/add',
			'data': $('#point-add').serialize(),
			'success': function (data) {
				if ($.isEmptyObject(data)) {
					alert("处理中发生错误");
					$('.ctl-point-group').show();
					return false;
				}

				if (!$.isEmptyObject(data.error)) {
					$('#alert-point-add').html(data.error);
					$('#alert-point-add').attr('class', 'alert alert-danger text-left');
					$('#alert-point-add').show();
					$('.ctl-point-group').show();
					return false;
				}

				if (data.id != false) {
					alert('保存成功');

					$('#window-point-add').modal('hide');

					setTimeout(function () {
						top.location = '../../map/index.htm';
					}, 1000);
				} else {
					$('#alert-point-add').html("添加失败，请重试");
					$('#alert-point-add').attr('class', 'alert alert-danger text-left');
					$('#alert-point-add').show();
					$('.ctl-point-group').show();
				}
			},
			'timeout': 30000,
			'beforeSend': function () {
				$('#progress-point-add').show();
				$('.ctl-point-group').hide();
			},
			'complete': function () {
				$('#progress-point-add').hide();
			},
			'error': function () {
				alert('处理中发生错误，请稍后重试');
				$('.ctl-point-group').show();
			}
		})
	}
}