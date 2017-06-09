$('body').addClass('new-recipe-mode');

//------- CHECK FIELDS ARE COMPLETED
$(document).on('keyup', '.js--input', function (e) {
    let allInputsComplete = true;
    $('.js--input').each(function (key, input) {
        if ($.trim(input.value).length == 0) {
            allInputsComplete = false;
        }
    });
    if (allInputsComplete) {
        $('.add-recipe').attr("disabled", false);
    } else {
        $('.add-recipe').attr("disabled", true);
    };

    if ($.trim(e.target.value).length != 0) {
        $(e.target).parents('.js--parent').addClass('complete');
    } else {
        $(e.target).parents('.js--parent').removeClass('complete');
    };
});

//------- ADD NEW RECIPE
$(document).on('click', '.add-recipe', function (e) {
    let recipeName = $('.js--recipe-name input')[0].value;
    let prepTime = $('.js--prep-time')[0].value;
    let cookTime = $('.js--cook-time')[0].value;
    let recipe = {
        Name: $.trim(recipeName),
        PrepTime: $.trim(prepTime),
        CookingTime: $.trim(cookTime)
    };
    $.ajax({
        url: apiUrl,
        data: recipe,
        method: "POST",
        success: function (response) {
            //------- REDIRECT TO RECIPE PAGE
            window.location = "Recipe.html?id=" + response.Id;
        }
    });
});