//-------- GET SAVED RECIPES
$.ajax({
    url: apiUrl,
    method: "GET",
    success: function (response) {
        if (response.length === 0) {
            bootbox.confirm({
                title: 'Welcome',
                message: '<div class="text-center"><h2>Hello!</h2>I see you have no recipes saved.<br/>Would you like to add one now?</center>',
                buttons: {
                    cancel: {
                        label: '<i class="fa fa-times"></i> Not right now, thank you'
                    },
                    confirm: {
                        label: '<i class="fa fa-check"></i> Yes please',
                        className: 'btn-success'
                    }
                },
                callback: function (result) {
                    if (result === true) {
                        window.location = "NewRecipe.html";
                    }                    
                }
            });
        } else {
            var listItems = '';
            $.each(response, function (index, recipe) {
                listItems += '<li><a href="Recipe.html?id=' + recipe.Id + '" class="recipe-link">' + recipe.Name + '</a></li>';
            });
            $('.js--recipe-list').html(listItems);
        }
    }
});