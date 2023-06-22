$(document).ready(function () {
    $('#burger').click(function () {
        $('#menu').addClass('open');
    })
    $('#menu *').each(function (item) {
        $(this).click(function () {
            $('#menu').removeClass('open');
        })
    })

    let form = $('#form')
    let message = $('#msg-success')
    let loader = $('.loader')
    $('#button').click(function () {
        let product = $('#product')
        let name = $('#name')
        let tel = $('#tel')

        let hasError = false;
        $('.error-input').hide()
        $('input').css('border-color', 'rgb(130, 19, 40)')


        if (!name.val()) {
            name.css('border-color', '#df0e36')
            name.next().show();
            hasError = true;
        }
        if (!product.val()) {
            product.css('border-color', '#df0e36')
            product.next().show();
            hasError = true;
        }
        if (!tel.val()) {
            tel.css('border-color', '#df0e36')
            tel.next().show();
            hasError = true;
        }


        if (!hasError) {
            loader.css('display', 'flex')
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: {name: name.val(), product: product.val(), tel: tel.val()}
            })
                .done(function (msg) {
                    loader.hide()
                    if (msg.success) {
                        form[0].reset();
                        form.hide();
                        message.css({
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        });
                        setTimeout(() => {
                            form.show();
                            message.hide();
                        }, 2000);

                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ')
                        form[0].reset()
                    }
                });
        }
    })

    $('.btn__product').click(() => {
        $('.products')[0].scrollIntoView({behavior: "smooth"});
    })
    $('.btn-order').click((event) => {
        $('.order')[0].scrollIntoView({behavior: "smooth"});
        $('#product').val($(event.target).parents('.product').find('.product-title').text())

    })

    $('#tel').mask("+375 (99) 999-99-99");

})