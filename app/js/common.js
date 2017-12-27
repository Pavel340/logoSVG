var _gsScope = (typeof(module) !== 'undefined' && module.exports && typeof(global) !== 'undefined') ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {
	
  'use strict';

  _gsScope._gsDefine.plugin({
    propName: 'endArray',
    API: 2,
    version: '0.1.3',

    //called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
    init: function(target, value, tween) {
      var i = value.length,
        a = this.a = [],
        start, end;
      this.target = target;
      this._mod = 0;
      if (!i) {
        return false;
      }
      while (--i > -1) {
        start = target[i];
        end = value[i];
        if (start !== end) {
          a.push({i:i, s:start, c:end - start});
        }
      }
      return true;
    },

    mod: function(lookup) {
      if (typeof(lookup.endArray) === 'function') {
        this._mod = lookup.endArray;
      }
    },

    //called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
    set: function(ratio) {
      var target = this.target,
        a = this.a,
        i = a.length,
        mod = this._mod,
        e, val;
      if (mod) {
        while (--i > -1) {
          e = a[i];
          target[e.i] = mod(e.s + e.c * ratio, target);
        }
      } else {
        while (--i > -1) {
          e = a[i];
          val = e.s + e.c * ratio;
          target[e.i] = (val < 0.000001 && val > -0.000001) ? 0 : val;
        }
      }
    }

  });

}); if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()(); }

var animationSpeed = 1000;

function animateCSSLive() {
	var pathC = Snap.select('#C');
	var pathCto = Snap.select('#CTO').attr('d');
	pathC.animate({ d: pathCto}, animationSpeed, mina.linear, function(){});

	var pathS1 = Snap.select('#S1');
	var pathS1to = Snap.select('#S1TO').attr('d');
	pathS1.animate({ d: pathS1to}, animationSpeed, mina.linear, function(){});

	var pathS2 = Snap.select('#S2');
	var pathS2to = Snap.select('#S2TO').attr('d');
	pathS2.animate({ d: pathS2to}, animationSpeed, mina.linear, function(){});

	var pathDash = Snap.select('#dash');
	var pathDashto = Snap.select('#dashTo').attr('d');
	pathDash.animate({ d: pathDashto}, animationSpeed, mina.linear, function(){});

	var pathL = Snap.select('#l');
	var pathLto = Snap.select('#lto').attr('d');
	pathL.animate({ d: pathLto}, animationSpeed, mina.linear, function(){});

	var pathI = Snap.select('#i');
	var pathIto = Snap.select('#ito').attr('d');
	pathI.animate({ d: pathIto}, animationSpeed, mina.linear, function(){});

	var pathV = Snap.select('#v');
	var pathVto = Snap.select('#vto').attr('d');
	pathV.animate({ d: pathVto}, animationSpeed, mina.linear, function(){});

	var pathE = Snap.select('#e');
	var pathEto = Snap.select('#eto').attr('d');
	pathE.animate({ d: pathEto}, animationSpeed, mina.linear, function(){});
}

document.body.addEventListener('click', ()=>{
	animateCSSLive();
});

var numPoints = 14;
var points = [];
var points1 = [];
var startPoints = [];

for (let i = 0; i < numPoints; i++) {
	points.push(20 + Math.random() * 10);
	startPoints.push(0);
}

let startPoints1 = startPoints.slice(0);

points.forEach((element, index) => {
	points1.push(points[index] - 4);
});


function draw(path, points, closed) {

	let str = '';
	if(closed) {
		str += `M 0 0 V ${points[0]}`;
	} else {
		str += `M 0 ${points[0]}`;
	}

	for (let i = 0; i < numPoints - 1; i++) {
		var p = (i + 1)/(numPoints - 1) * 100;
		var cp = p - (1/(numPoints - 1) * 100) / 2;
		str += `C ${cp} ${points[i]} ${cp} ${points[i + 1]} ${p} ${points[i + 1]}`;
	}

	if (closed) str += 'V 0 H 0';
	
	path.setAttribute('d', str);
}

var path1 = document.querySelectorAll(".waves__1")[0];
var path2 = document.querySelectorAll(".waves__2")[0];
var path3 = document.querySelectorAll(".waves__3")[0];

let tl = new TimelineMax();
tl
	.to(startPoints, 1, {endArray: points, onUpdate: function(){
		draw(path1, startPoints, 1);
		draw(path2, startPoints, 0);
	}})
	.to(startPoints1, 1, {endArray: points1, onUpdate: function(){
		draw(path3, startPoints1, 0);
	}}, 0)
	.to('#logo',1,{y:0},'-=0.8')
  	.call(animateCSSLive);

$(function() {

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

});
