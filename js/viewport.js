var ViewPortInfo = {
	"init": function(){
		var self=this;
		$(window).on('beforeunload', function(){
  			$(window).scrollTop(0);
		});
		$('body').on('resize,orientationchange', function(){
			ViewPortInfo.updateViewportProperties();
			ViewPortInfo.generateTextBox();
		});

		$('#copyButton').on('click', function(e){
			ViewPortInfo.copyToClipboard();
		});

		this.testBrowser();
	},

	"testBrowser": function(){
		var hasFlash = ((typeof navigator.plugins != "undefined" && typeof navigator.plugins["Shockwave Flash"] == "object") || (window.ActiveXObject && (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) !== false));
		$('#UserAgent').text(navigator.userAgent);
		$.getJSON( "http://api.ipify.org?format=json", function(data){
           $('#IpAddress').text(data.ip);
           $('body').removeClass('initial');
        }).fail(function(){
        	$('#IpAddress').text("UNAVAILABLE");
        	$('body').removeClass('initial');
        });		
		$('#Geolocation').addClass(""+Modernizr.geolocation).text(Modernizr.geolocation);
		$('#LocalStorage').addClass(""+Modernizr.localstorage).text(Modernizr.localstorage);
		$('#SessionStorage').addClass(""+Modernizr.sessionstorage).text(Modernizr.sessionstorage);
		$('#HtmlAudio').addClass(""+Modernizr.audio).text(Modernizr.audio);
		$('#HtmlVideo').addClass(""+Modernizr.video).text(Modernizr.video);
		$('#Flexbox').addClass(""+Modernizr.flexbox).text(Modernizr.flexbox);						

		$('#TouchEvents').addClass(""+Modernizr.touch).text(Modernizr.touch);
		$('#CanvasSupport').addClass(""+Modernizr.canvas).text(Modernizr.canvas);
		$('#WebGL').addClass(""+Modernizr.webgl).text(Modernizr.webgl);
		$('#SVG').addClass(""+Modernizr.svg).text(Modernizr.svg);
		$('#Flash').addClass(""+hasFlash).text(hasFlash);
		$('#HistoryAPI').addClass(""+Modernizr.history).text(Modernizr.history);

		this.updateViewportProperties();
		this.generateTextBox();
	},

	"updateViewportProperties": function(){
		$('#ScreenDimensions').text(screen.width+"px x "+ screen.height+"px");
		$('#DocumentDimensions').text($(document).width()+"px x "+$(document).height()+"px");
		$('#WindowDimensions').text($(window).width()+"px x "+$(window).height()+"px");
		$('#BodyDimensions').text($("body").width()+"px x " +$("body").height()+"px");
		if (Modernizr.deviceorientation){
		$('#WindowOrientation').addClass('true').text(window.orientation);
		} else {
			$('#WindowOrientation').addClass('false').text('false');
		}
		
	},

	"copyToClipboard": function(){
		window.prompt("To copy, press Ctrl+C",this.generateTextBox());
	},

	"generateTextBox": function(){
		var text = "";
		text += "Client report (http://viewport.info) \n";
		text += "============================================\n\n\n";
			
		//loop through tables, and generate text for each row.
		$('table').each(function(){
			var table = $(this);
			
			text += "--------------------------------------------\n\n";
			text += table.find('caption').text() +"\n";
			text += "\n--------------------------------------------\n";
			$(table).find('tr').each(function(){
				var row = $(this), value = "";
				value = row.find('th span').text() + ": " + row.find('td').text().toUpperCase() +"\n";
				text += value;
			});
			text += "\n\n";
		});
		return text;
		
	}
};

ViewPortInfo.init();