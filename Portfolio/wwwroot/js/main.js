const body = document.querySelector("body");
let slider = document.querySelector(".slider"),
    sliderList = slider.querySelector(".slider__list"),
    sliderTrack = slider.querySelector(".cards"),
    slides = slider.querySelectorAll(".service__card"),
    paginationActive = document.querySelector(".pagination__active"),
    paginationWidth = document.querySelector(".paggination").offsetWidth,
    slideWidth = slides[0].offsetWidth,
    slideIndex = 0,
    posX1 = 0,
    posX2 = 0,
    poxInit = 0,
    posFinal = 0,
    posThreshold = slideWidth * .35,
    trfRegExp = /[-0-9.]+(?=px)/,
    getEvent = function () {
        return (event.type.search('touch') !== -1) ? event.touches[0] : event;
    },
    slide = function () {
        if (slideIndex <= 0) {
            sliderTrack.style.transition = 'transform .5s';
            sliderTrack.style.transform = 'translate3d(15px, 0px, 0px)';
            paginationActive.style.transform = 'translate3d(0px, 0px, 0px)';
            return;
        }
        console.log(slideWidth);
        sliderTrack.style.transition = paginationActive.style.transition = 'transform .5s';
        sliderTrack.style.transform = `translate3d(-${slideIndex * (slideWidth + 30) - 30}px, 0px, 0px)`;
        paginationActive.style.transform = `translate3d(${(paginationWidth / 6) * slideIndex}px, 0px, 0px)`;
    },
    swipeStart = function () {
        let evt = getEvent();

        posInit = posX1 = evt.clientX;

        sliderTrack.style.transition = '';
        if (document.querySelector(".container").offsetWidth == document.querySelector("body").offsetWidth) {
            document.addEventListener('touchmove', swipeAction);
            document.addEventListener('touchend', swipeEnd);
        }

    },
    swipeAction = function () {

        let evt = getEvent(),
            style = sliderTrack.style.transform,
            transform = +style.match(trfRegExp)[0];

        posX2 = posX1 - evt.clientX;
        posX1 = evt.clientX;

        sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
    },
    swipeEnd = function () {
        posFinal = posInit - posX1;

        if (document.querySelector(".container").offsetWidth == document.querySelector("body").offsetWidth) {
            document.removeEventListener('touchmove', swipeAction);
            document.removeEventListener('touchend', swipeEnd);
        }

        if (Math.abs(posFinal) > posThreshold) {
            if (posInit < posX1) {
                slideIndex--;
                if (slideIndex < 0) {
                    slideIndex = 0;
                }
            } else if (posInit > posX1) {
                slideIndex++; {
                    if (slideIndex >= slides.length) {
                        slideIndex = slides.length - 1;
                    }
                }
            }
        }

        if (posInit !== posX1) {
            slide();
        }
    };

sliderTrack.style.transform = 'translate3d(15px, 0px, 0px)';
paginationActive.style.transform = 'translate3d(0px, 0px, 0px)';

slider.addEventListener('touchstart', swipeStart);





let sliderReviews = document.querySelector(".slider__reviews"),
    sliderListReviews = sliderReviews.querySelector(".slider__list__reviews"),
    sliderTrackReviews = sliderReviews.querySelector(".feedbacks"),
    slidesReviews = sliderReviews.querySelectorAll(".feedback");

if (slidesReviews.length > 0) {
    let paginationActiveReviews = document.querySelector(".pagination__active__reviews"),
        paginationReviewsWidth = document.querySelector(".paggination__reviews").offsetWidth,
        slideReviewsWidth = slidesReviews[0].offsetWidth,
        slideReviewsIndex = 0,
        posX1Reviews = 0,
        posX2Reviews = 0,
        poxInitReviews = 0,
        posFinalReviews = 0,
        posThresholdReviews = slideWidth * .35,
        slideReviews = function () {
            if (slideReviewsIndex <= 0) {
                sliderTrackReviews.style.transition = 'transform .5s';
                sliderTrackReviews.style.transform = 'translate3d(15px, 0px, 0px)';
                paginationActiveReviews.style.transform = 'translate3d(0px, 0px, 0px)';
                return;
            }
            sliderTrackReviews.style.transition = paginationActiveReviews.style.transition = 'transform .5s';
            sliderTrackReviews.style.transform = `translate3d(-${slideReviewsIndex * (slideReviewsWidth + 35) - 20}px, 0px, 0px)`;
            paginationActiveReviews.style.transform = `translate3d(${(paginationReviewsWidth / slidesReviews.length) * slideReviewsIndex}px, 0px, 0px)`;
        },
        swipeStartReviews = function () {
            let evt = getEvent();

            posInitReviews = posX1Reviews = evt.clientX;

            sliderTrackReviews.style.transition = '';

            document.addEventListener('touchmove', swipeActionReviews);
            document.addEventListener('mousemove', swipeActionReviews);
            document.addEventListener('touchend', swipeEndReviews);
            document.addEventListener('mouseup', swipeEndReviews);
        },
        swipeActionReviews = function () {

            let evt = getEvent(),
                style = sliderTrackReviews.style.transform,
                transform = +style.match(trfRegExp)[0];

            posX2Reviews = posX1Reviews - evt.clientX;
            posX1Reviews = evt.clientX;

            sliderTrackReviews.style.transform = `translate3d(${transform - posX2Reviews}px, 0px, 0px)`;
        },
        swipeEndReviews = function () {
            posFinalReviews = posInitReviews - posX1Reviews;

            document.removeEventListener('touchmove', swipeActionReviews);
            document.removeEventListener('mousemove', swipeActionReviews);
            document.removeEventListener('touchend', swipeEndReviews);
            document.removeEventListener('mouseup', swipeEndReviews);

            if (Math.abs(posFinalReviews) > posThresholdReviews) {
                if (posInitReviews < posX1Reviews) {
                    slideReviewsIndex--;
                    if (slideReviewsIndex < 0) {
                        slideReviewsIndex = 0;
                    }
                } else if (posInitReviews > posX1Reviews) {
                    slideReviewsIndex++; {
                        if (slideReviewsIndex >= slidesReviews.length) {
                            slideReviewsIndex = slidesReviews.length - 1;
                        }
                    }
                }
            }

            if (posInitReviews !== posX1Reviews) {
                slideReviews();
            }
        };

    sliderTrackReviews.style.transform = 'translate3d(15px, 0px, 0px)';
    paginationActiveReviews.style.transform = 'translate3d(0px, 0px, 0px)';

    sliderReviews.addEventListener('touchstart', swipeStartReviews);
    sliderReviews.addEventListener('mousedown', swipeStartReviews);

    var maxFeedbackHeight = 0;
    slidesReviews.forEach((item, index, array) => {
        if (maxFeedbackHeight < item.offsetHeight) {
            maxFeedbackHeight = item.offsetHeight;
        }
    });

    slidesReviews.forEach((item, index, array) => {
        item.style.height = maxFeedbackHeight + "px";
    });
}

let jumpTo = function (nameSection) {
    event.preventDefault();
    let top = document.getElementsByClassName(nameSection)[0].offsetTop;
    window.scrollTo({
        top: top - 120,
        behavior: "smooth"
    });
}

const mainMenu = document.querySelector(".main__menu").onclick = function () {
    jumpTo("header")
},
    aboutMeMenu = document.querySelector(".aboutMe__menu").onclick = function () {
        jumpTo("aboutMe")
    },
    serviceMenu = document.querySelector(".service__menu").onclick = function () {
        jumpTo("service")
    },
    portfolioMenu = document.querySelector(".portfolio__menu").onclick = function () {
        jumpTo("portfolio")
    },
    reviewsMenu = document.querySelector(".reviews__menu").onclick = function () {
        jumpTo("reviews")
    },
    contactsMenu = document.querySelector(".contacts__menu").onclick = function () {
        jumpTo("contacts")
    },
    btnRequest = document.querySelector(".btn__request").onclick = function () {
        jumpTo("request")
    };


const menuList = document.querySelectorAll(".menu__item");
const liList = document.querySelectorAll(".menu ul li");
menuList.forEach((item) => {
    item.addEventListener("click", function () {
        menuList.forEach((item2) => {
            item2.classList.remove("active");
        });
        item.classList.add("active");
        document.querySelector(".menu").classList.remove("active");
        document.querySelector(".burger").classList.remove("active");
        document.querySelector("body").classList.remove("fix");
    });
});

let menuHeight = document.querySelector(".navi"),
    offer = document.querySelector(".offer");
offer.style.paddingTop = `${menuHeight.offsetHeight - 50}px`;

const burger = document.querySelector(".burger").onclick = function () {
    document.querySelector(".menu ul").style.Top = `${document.querySelector(".navi").offsetHeight + 100}px`;
    document.querySelector(".menu").classList.toggle("active");
    document.querySelector(".burger").classList.toggle("active");
    document.querySelector("body").classList.toggle("fix");
}

const sectionList = document.querySelectorAll("section");
document.addEventListener("scroll", function () {
    let posY = window.pageYOffset;
    if (posY < sectionList[0].offsetTop) {
        menuList.forEach((item) => {
            item.classList.remove("active");
        });
        menuList[0].classList.add("active");
    } else if (posY > sectionList[sectionList.length - 1].offsetTop - 200) {
        menuList.forEach((item) => {
            item.classList.remove("active");
        });
        menuList[menuList.length - 1].classList.add("active");
    } else {
        for (let i = 0; i < sectionList.length - 1; i++) {
            if (posY > sectionList[i].offsetTop - 200 & posY < sectionList[i + 1].offsetTop - 200) {
                menuList.forEach((item) => {
                    item.classList.remove("active");
                });
                menuList[i + 1].classList.add("active");
            }
        }
    }
});

const filterPortfolioList = document.querySelectorAll(".portfolio__filter a");
filterPortfolioList.forEach((item) => {
    item.onclick = function (event) {
        event.preventDefault();
        filterPortfolioList.forEach((item2) => {
            item2.classList.remove("active");
        });
        item.classList.add("active");
    };
});

let modalContextId = 0;
const modalWind = document.querySelector(".modal__wind");
const modalContextList = document.querySelectorAll(".modal__context");
const closePointer = document.querySelector(".close_pointer");
const modalArea = document.querySelector(".modal_area");
const exampleCardsList = document.querySelectorAll(".example__cards");

let iMax = exampleCardsList[0].children.length - 1;
//for (let i = 0; i <= iMax; i++) {
//    exampleCardsList[0].children[i].addEventListener("click", function () {
//        let posY = window.pageYOffset;
//        modalWind.style.top = `${posY}px`;
//        modalWind.classList.add("active");
//        modalContextList[i].classList.add("active");
//        body.classList.add("fix");
//        modalContextId = i;
//    })
//}

closePointer.onclick = function () {
    modalWind.classList.remove("active");
    body.classList.remove("fix");
    modalContextList[modalContextId].classList.remove("active");
}

modalArea.onclick = function () {
    modalWind.classList.remove("active");
    body.classList.remove("fix");
    modalContextList[modalContextId].classList.remove("active");
}

document.querySelector("#btnMailSend").addEventListener("click", function (event) {
    event.preventDefault();

    if (!$(".form__name").val().trim()) {
        document.querySelector("#form__name__error").innerHTML = "Представьтесь, пожалуйста";
        document.querySelector(".form__name").oninput = function (e) {
            e.preventDefault();
            document.querySelector("#form__name__error").innerHTML = "";
        };
    }

    if (!$(".form__phone").val().trim() & !$(".form__mail").val().trim()) {
        document.querySelector("#form__phone__error").innerHTML = "Заполните поле";
        document.querySelector("#form__mail__error").innerHTML = "или это поле";
        document.querySelector(".form__phone").oninput = function (e) {
            e.preventDefault();
            document.querySelector("#form__phone__error").innerHTML = "";
            document.querySelector("#form__mail__error").innerHTML = "";
        };
        document.querySelector(".form__mail").oninput = function (e) {
            e.preventDefault();
            document.querySelector("#form__mail__error").innerHTML = "";
            document.querySelector("#form__phone__error").innerHTML = "";
        };
    }

    if (!$(".form__request").val().trim()) {
        document.querySelector("#form__request__error").innerHTML = "Не оставляйте текст запроса пустым";
        document.querySelector(".form__request").oninput = function (e) {
            e.preventDefault();
            document.querySelector("#form__request__error").innerHTML = "";
        };
    }

    else {
        let dataForm = {
            Name: $(".form__name").val(),
            Phone: $(".form__phone").val(),
            Email: $(".form__mail").val(),
            RequestText: $(".form__request").val()
        };
        console.log(dataForm);

        $.ajax({
            type: "Get",
            url: "/Home/SendMail",
            data: dataForm,
            success: function (data__text) {
                document.querySelector(".respons__text").innerHTML = data__text;
                if (!document.querySelector(".mailSendModal").classList.contains("active")) {
                    document.querySelector(".mailSendModal").classList.add("active");
                }
                document.querySelector(".mailSendModal").classList.remove("modalOut");
                document.querySelector(".mailSendModal").classList.add("modalIn");
            },
            error: function () {
                alert("Ïðîèçîøëà îøèáêà");
            }
        })
        setTimeout(() => {
            document.querySelector(".mailSendModal").classList.remove("modalIn");
            document.querySelector(".mailSendModal").classList.add("modalOut");
        }, 3000);
    }
})

document.querySelector(".new__reviews").addEventListener("click", function (event) {
    event.preventDefault();
    if (document.querySelector(".area__feedback").classList.contains("modalOut")) {
        document.querySelector(".area__feedback").classList.remove("modalOut");
    }
    document.querySelector(".area__feedback").classList.add("active");
    document.querySelector(".area__feedback").classList.add("modalIn");
});

document.querySelector(".area__close").addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector(".area__feedback").classList.remove("active");
    document.querySelector(".area__feedback").classList.remove("modalIn");
    document.querySelector(".area__feedback").classList.add("modalOut");
})

document.querySelector("#btnReviewsSend").addEventListener("click", function (event) {
    event.preventDefault();

    if (!$("#feedback__name").val().trim()) {
        document.querySelector("#feedback__name__error").innerHTML = "Представьтесь, пожалуйста";
        document.querySelector("#feedback__name").oninput = function (e) {
            e.preventDefault();
            document.querySelector("#feedback__name__error").innerHTML = "";
        };
    }

    if (!$("#feedback__text").val().trim()) {
        document.querySelector("#feedback__text__error").innerHTML = "Не оставляйте это поле пустым";
        document.querySelector("#feedback__text").oninput = function (e) {
            e.preventDefault();
            document.querySelector("#feedback__text__error").innerHTML = "";
        }
    }

    else {
        var files = document.getElementById('upload__file').files;
        if (files.length > 0) {
            if (window.FormData !== undefined) {
                var data = new FormData();
                for (var i = 0; i < files.length; i++) {
                    data.append('file' + i, files[i]);
                }

                $.ajax({
                    type: "POST",
                    url: "/Home/Test",
                    contentType: false,
                    processData: false,
                    data: data,
                    success: function (result) {
                        var imgPath = result;
                        let dataform = {
                            StarsCount: $('input[name="fst"]:checked').val(),
                            Name: $("#feedback__name").val(),
                            OrderType: $("#order__type").val(),
                            PathImg: imgPath,
                            FeedbackText: $("#feedback__text").val()
                        };

                        $.ajax({
                            type: "POST",
                            url: "/Home/NewReview",
                            data: dataform,
                            success: function (data__text) {
                                document.querySelector(".area__feedback").classList.remove("active");
                                document.querySelector(".area__feedback").classList.remove("modalIn");
                                document.querySelector(".area__feedback").classList.add("modalOut");
                                document.querySelector(".respons__text").innerHTML = data__text;
                                if (!document.querySelector(".mailSendModal").classList.contains("active")) {
                                    document.querySelector(".mailSendModal").classList.add("active");
                                }
                                document.querySelector(".mailSendModal").classList.remove("modalOut");
                                document.querySelector(".mailSendModal").classList.add("modalIn");
                                $(".form__feedback")[0].reset();
                            },
                            error: function (data__text) {
                                document.querySelector(".respons__text").innerHTML = data__text;
                                if (!document.querySelector(".mailSendModal").classList.contains("active")) {
                                    document.querySelector(".mailSendModal").classList.add("active");
                                }
                                document.querySelector(".mailSendModal").classList.remove("modalOut");
                                document.querySelector(".mailSendModal").classList.add("modalIn");
                            }
                        });

                    },
                    error: function (xhr, status, p3) {
                        alert(xhr.responseText);
                    }
                });
            }
            else {
                alert("Test");
            }
        }
        else {
            let dataform = {
                StarsCount: $('input[name="fst"]:checked').val(),
                Name: $("#feedback__name").val(),
                OrderType: $("#order__type").val(),
                PathImg: null,
                FeedbackText: $("#feedback__text").val()
            };

            $.ajax({
                type: "POST",
                url: "/Home/NewReview",
                data: dataform,
                success: function (data__text) {
                    document.querySelector(".area__feedback").classList.remove("active");
                    document.querySelector(".area__feedback").classList.remove("modalIn");
                    document.querySelector(".area__feedback").classList.add("modalOut");
                    document.querySelector(".respons__text").innerHTML = data__text;
                    if (!document.querySelector(".mailSendModal").classList.contains("active")) {
                        document.querySelector(".mailSendModal").classList.add("active");
                    }
                    document.querySelector(".mailSendModal").classList.remove("modalOut");
                    document.querySelector(".mailSendModal").classList.add("modalIn");
                    $(".form__feedback")[0].reset();
                },
                error: function (data__text) {
                    document.querySelector(".respons__text").innerHTML = data__text;
                    if (!document.querySelector(".mailSendModal").classList.contains("active")) {
                        document.querySelector(".mailSendModal").classList.add("active");
                    }
                    document.querySelector(".mailSendModal").classList.remove("modalOut");
                    document.querySelector(".mailSendModal").classList.add("modalIn");
                }

            });
        }
                    setTimeout(() => {
                        document.querySelector(".mailSendModal").classList.remove("modalIn");
                        document.querySelector(".mailSendModal").classList.add("modalOut");
                    }, 3000);
    }
})