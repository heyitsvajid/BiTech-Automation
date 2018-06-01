$(function() {

  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour

      // get values from FORM
      var title = $("input#title").val();
      var description = $("textarea#description").val();
      var bgInformation = $("textarea#backgroundInformation").val();
      var payload = {
        title:title,
        description:description,
        bgInformation:bgInformation  
      }

      let sendButton = $("#findKeyword");
      sendButton.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
      $.ajax({
        url: "http://localhost:8081/findKeywords",
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify(payload),
        cache: false,
        success: function(data) {
          console.log('success');
          console.log(JSON.stringify(data));
          // Success message
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-success')
            .append("<strong>"+data.keywords.length +" Keywords Found. </strong>");
          $('#success > .alert-success')
            .append('</div>');
          //clear all fields
          $('#contactForm').trigger("reset");
          let finalString=''
          data.keywords.forEach(keyword => {
            let keywordDiv = "<div class='chip'>"+keyword+"</div>"
            finalString=finalString+keywordDiv
          });
          $('#keywords').html(finalString);
          $("#keywordDiv").css("visibility", "visible");

        },
        error: function() {
          // Fail message
          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-danger').append($("<strong>").text("Sorry, it seems that server is not responding. Please try again later!"));
          $('#success > .alert-danger').append('</div>');
          //clear all fields

        },
        complete: function() {
          setTimeout(function() {
            sendButton.prop("disabled", false); // Re-enable submit button when AJAX call is complete
          }, 1000);
        }
      });
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
  $('#success').html('');
});
