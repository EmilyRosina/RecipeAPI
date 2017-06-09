
if (id == null) {
    bootbox.alert("Oh dear! No recipe ID was specified! Let's go back a step...", function () { window.location = "Index.html"; });
    // TODO: swap alert with modal that has countdown for redirect
} else {
    //------- GET RECIPE
    $.ajax({
        url: apiUrl + id,
        method: "GET",
        error: function () {
            bootbox.alert("Oh dear! No recipe found with that ID! Let's go back a step...", function () { window.location = "Index.html"; });
        },
        success: function (response) {
            $('.js--recipe-name input').attr("value", response.Name);
            $('.js--prep-time').attr("value", response.PrepTime);
            $('.js--cook-time').attr("value", response.CookingTime);
            //------- GET RECIPE INGREDIENTS
            $.ajax({
                url: apiUrl + id + '/ingredient',
                method: "GET",
                success: function (response) {
                    response.forEach(function (i) {
                        let template = $('#template-new-ingredient').html();
                        let $template = $(template);
                        $template.removeClass("edit-mode");
                        $template.attr("id", i.Id);
                        $template.find('.js--ingredient-amount span').text(i.Quantity);
                        $template.find('.js--ingredient-amount input').attr("value", i.Quantity);
                        $template.find('.js--ingredient-name span').text(i.Name);
                        $template.find('.js--ingredient-name input').attr("value", i.Name);
                        $('.js--ingredients-tbody').append($template);
                    });
                }
            });
        }
    });
    
      //------- EDIT RECIPE
    $(document).on('blur', '.js--input', function (e) { updateRecipe(e) });
    function updateRecipe(e) {
        let recipeName = $('.js--recipe-name input')[0].value;
        let prepTime = $('.js--prep-time')[0].value;
        let cookTime = $('.js--cook-time')[0].value;
        let recipe = {
            Name: $.trim(recipeName),
            PrepTime: $.trim(prepTime),
            CookingTime: $.trim(cookTime)
        };
        $.ajax({
            url: apiUrl + id,
            data: recipe,
            method: "PUT"
        });
    };


    //------- DELETE RECIPE
    $(document).on('click', '.delete-recipe', function () {
        bootbox.confirm({
            title: "Delete recipe?",
            message: "<center>Are you sure you want to remove this recipe?<br/><b>You cannot undo these changes.</b></center>",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Oops! Cancel'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Yes please'
                }
            },
            callback: function (result) {
                if (result === true) {
                    $.ajax({
                        url: apiUrl + id,
                        method: "DELETE",
                        success: function (response) {
                            window.location = "Index.html";
                        }
                    });
                };
            }
        });
    });
        

    //------- ADD INGREDIENT TEMPLATE
    $('.js--add-ingredient').click(function () {
        let template = $('#template-new-ingredient').html();
        $('.js--ingredients-tbody').append($(template));
    });

    //------- ENTER EDIT-MODE FOR INGREDIENT
    $(document).on('click', '.js--edit-ingredient', function (e) {
        let row = $(e.target).parents('tr');
        let ingAmount = $(row).find('.js--ingredient-amount span')[0].innerHTML;
        let ingAmountInput = $(row).find('.js--ingredient-amount input')[0];
        let ingName = $(row).find('.js--ingredient-name span')[0].innerHTML;
        let ingNameInput = $(row).find('.js--ingredient-name input')[0];
        $(ingAmountInput).val(ingAmount);
        $(ingNameInput).val(ingName);
        $(row).addClass("edit-mode");
    });

    //------- SAVE NEWLY ADDED/AMENDED INGREDIENT
    $(document).on('click', '.js--save-ingredient-changes', function (e) {
        let row = $(e.target).parents('tr');
        let amountInputValue = $(row).find('.js--ingredient-amount input')[0].value;
        let amountInputNotEmpty = $.trim(amountInputValue).length != 0;
        let nameInputValue = $(row).find('.js--ingredient-name input')[0].value;
        let nameInputNotEmpty = $.trim(nameInputValue).length != 0;
        let amountSpan = $(row).find('.js--ingredient-amount span')[0];
        let nameSpan = $(row).find('.js--ingredient-name span')[0];
        let spansArePrepopulated = amountSpan.innerText.length != 0 && nameSpan.innerText.length != 0;
        if (amountInputNotEmpty && nameInputNotEmpty) {
            let ingredient = {
                Name: $.trim(nameInputValue),
                Quantity: $.trim(amountInputValue)
            };
            if (spansArePrepopulated) {
                let ingredientId = $(row).attr("id");
                $.ajax({
                    url: apiUrl + id + "/ingredient/" + ingredientId,
                    data: ingredient,
                    method: "PUT"
                });
            } else {
                $.ajax({
                    url: apiUrl + id + "/ingredient",
                    data: ingredient,
                    method: "POST",
                    success: function (response) {
                        $(row).attr("id", response.Id);
                    }
                });
            }

            $(row).removeClass("edit-mode");
            amountSpan.innerHTML = amountInputValue;
            nameSpan.innerHTML = nameInputValue;
        } else {
            // TODO: show error ; need both input to have text
        }
    });

    //------- CANCEL NEWLY ADDED/AMENDED INGREDIENT CHANGES
    $(document).on('click', '.js--cancel-ingredient-changes', function (e) {
        let row = $(e.target).parents('tr');
        let amountNotEmpty = $(row).find('.js--ingredient-amount span')[0].innerText.length != 0;
        let nameNotEmpty = $(row).find('.js--ingredient-name span')[0].innerText.length != 0;
        if (amountNotEmpty && nameNotEmpty) {
            $(row).removeClass("edit-mode");
        } else {
            /* if ingredient is not yet part of recipe, just remove from DOM */
            row.remove();
        }
    });





    //------- DELETE INGREDIENT
    $(document).on('click', '.js--delete-ingredient', function (e) {
        let row = $(e.target).parents('tr');
        let ingredientId = $(row).attr("id");
        bootbox.confirm({
            title: "Delete ingredient?",
            message: "<center>Are you sure you want to remove this ingredient?<br/><b>You cannot undo these changes.</b></center>",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Oops! Cancel'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Yes please'
                }
            },
            callback: function (result) {
                if (result === true) {
                    $.ajax({
                        url: apiUrl + id + "/ingredient/" + ingredientId,
                        method: "DELETE",
                        success: function (response) {
                            row.remove();
                        }
                    });
                };
            }
        });
    });


};/* end of ID check block*/