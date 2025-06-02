$(function() {
	$("#txt").autocomplete({
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
				$('#txt').val(ui.item.label);
				return false;
			}
	})
});