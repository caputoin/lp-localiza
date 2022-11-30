var cd;
var IsAllowed = false;

$(document).ready(function() {
    createCaptcha();

    $("#btnOpenModal").click(function(){
      $("#modalMob").removeClass("hidden");
    });

    $("#btnCloseModal").click(function(){
      $("#modalMob").addClass("hidden");
    });
    
    $("#btnCloseModalCaptcha").click(function(){
      $("#modalCaptcha").addClass("hidden");
    });

    const $root = $('html, body');
    $('a[href^="#"]').click(function() {
      $("#modalMob").addClass("hidden");
      const href = $.attr(this, 'href');
      $root.animate({
        scrollTop: $(href).offset().top
      }, 500, function() {
        window.location.hash = href;
      });
      return false;
    });
});
 
// Create Captcha
function createCaptcha() {
  //$('#InvalidCapthcaError').hide();
  var alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
                    
  var i;
  for (i = 0; i < 6; i++) {
    var a = alpha[Math.floor(Math.random() * alpha.length)];
    var b = alpha[Math.floor(Math.random() * alpha.length)];
    var c = alpha[Math.floor(Math.random() * alpha.length)];
    var d = alpha[Math.floor(Math.random() * alpha.length)];
    var e = alpha[Math.floor(Math.random() * alpha.length)];
    var f = alpha[Math.floor(Math.random() * alpha.length)];
  }
  cd = a + ' ' + b + ' ' + c + ' ' + d + ' ' + e + ' ' + f;
  $('#CaptchaImageCode').empty().append('<canvas id="CapCode" class="capcode" width="300" height="80"></canvas>')
  
  var c = document.getElementById("CapCode"),
      ctx=c.getContext("2d"),
      x = c.width / 2,
      img = new Image();
 
  img.src = "assets/images/captchaback.jpg";
  img.onload = function () {
      var pattern = ctx.createPattern(img, "repeat");
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.font="46px Roboto Slab";
      ctx.fillStyle = '#212121';
      ctx.textAlign = 'center';
      ctx.setTransform (1, -0.12, 0, 1, 0, 15);
      ctx.fillText(cd,x,55);
  };
}
 
// Validate Captcha
function validateCaptcha() {
  var string1 = removeSpaces(cd);
  var string2 = removeSpaces($('#UserCaptchaCode').val());
  if (string1 == string2) {
    return true;
  }
  else {
    return false;
  }
}
 
// Remove Spaces
function removeSpaces(string) {
  return string.split(' ').join('');
}
 
// Check Captcha
function checkCaptcha() {
  var result = validateCaptcha();
  if( $("#UserCaptchaCode").val() == "" || $("#UserCaptchaCode").val() == null || $("#UserCaptchaCode").val() == "undefined") {
    $('#WrongCaptchaError').text('Favor digitar o código.').show();
    $('#UserCaptchaCode').focus();
  } else {
    if(result == false) { 
      IsAllowed = false;
      $('#WrongCaptchaError').text('Código inválido! Digite novamente (diferencie letras maiúsculas de minúsculas).').show();
      createCaptcha();
      $('#UserCaptchaCode').focus().select();
    }
    else { 
      IsAllowed = true;
      $('#UserCaptchaCode').val('').attr('place-holder','Digite exatamente o código abaixo...');
      createCaptcha();
      $('#WrongCaptchaError').fadeOut(100);
      $('#SuccessMessage').fadeIn(500).css('display','block').delay(5000).fadeOut(250);
      redirectEmail();
    }
  }  
}

function openModalCaptcha(email){
  $("#emailTo").val(email);
  $("#modalCaptcha").removeClass("hidden");
}

function redirectEmail(){
  $("#modalCaptcha").addClass("hidden");
  window.open('mailto:'+$("#emailTo").val());
}
