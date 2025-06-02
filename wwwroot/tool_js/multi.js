var $activeText;
$(function() {
	$("#tags").autocomplete({
		source: function(request, response)
			{
				$.getJSON('ac-ajax.cfm', {term: request.term}, response);
			},
		search: function() 
			{
				var term = this.value;
				if (term.length < 2) 
					return false;
			},
		focus: function() 
			{
				return false;
			},
		select:function(event, ui)
			{
				$activeText.val(ui.item.label).css({'visibility':'visible'});
				$(this).val('').css({'visibility':'hidden'});
				return false;
			}
	})
});
$(document).ready(function(){
	$('.txt').click(function(){
		$activeText = $(this);
		$(this).css({'visibility':'hidden'});
		$('#tags').val($(this).val()).css({'visibility':'visible', 'left':$(this).position().left, 'top':$(this).position().top}).select().focus();
	});
	$('#tags').blur(function(){
		if($activeText != null)
		{
			$activeText.css({'visibility':'visible'});
			$activeText.val($(this).val());
		}
		$(this).css({'visibility':'hidden'});
	});
});