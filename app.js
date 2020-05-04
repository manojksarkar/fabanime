function init() {
    const animes = document.querySelectorAll(".anime");
    const pages = document.querySelectorAll(".page");
    const dots = document.querySelectorAll(".dot");
    const backgroundColors = [
        "radial-gradient(#4E6BA5,black 80%)",
        "radial-gradient(#A55D4E,black 80%)",
        "radial-gradient(#AA9090,black 80%)"
    ];

    let currentPageNumber = 0;


    dots.forEach((dot, index) => {
        dot.addEventListener("click", function () {
            changeDots(this);
            changePage(index);
            changeAnime(index);
        });
    });

    animes.forEach((anime, index) => {
        anime.addEventListener("click", function () {
            const dot = dots[index];
            changeDots(dot);
            changePage(index);
            changeAnime(index);
        });
    });

    function changeDots(dot) {
        dots.forEach(dot => {
            dot.classList.remove("active");
        });
        dot.classList.add("active");
    }

    function changePage(pageNumber) {
        const nextPage = pages[pageNumber];
        const currentPage = pages[currentPageNumber];
        const currentLeft = currentPage.querySelector(".hero-left");
        const currentRight = currentPage.querySelector(".hero-right");
        const currentText = currentPage.querySelector(".details");
        const nextLeft = nextPage.querySelector(".hero-left");
        const nextRight = nextPage.querySelector(".hero-right");
        const nextText = nextPage.querySelector(".details");
        const body = document.querySelector("body");



        const ti = new TimelineMax({
            onStart: function () {
                dots.forEach((dot) => {
                    dot.style.pointerEvents = "none";
                });
            },
            onComplete: function () {
                dots.forEach((dot) => {
                    dot.style.pointerEvents = "all";
                });
            }
        });

        currentPageNumber = pageNumber;

        ti.fromTo(currentLeft, 0.3, { y: "-10%" }, { y: "-100%" })
            .fromTo(currentRight, 0.3, { y: "10%" }, { y: "-100%" }, "-=0.2")
            .to(body, 0.3, { backgroundImage: backgroundColors[pageNumber] })
            .fromTo(currentPage, 0.3, { opacity: 1, display: "grid" }, { opacity: 0, display: "none" })
            .fromTo(nextPage, 0.3, { opacity: 0, display: "none" }, { opacity: 1, display: "grid" })
            .fromTo(nextLeft, 0.3, { y: "-100%" }, { y: "-10%" }, "-=0.4")
            .fromTo(nextRight, 0.3, { y: "-100%" }, { y: "10%" }, "-=0.2")
            .set(nextLeft, { clearProps: "all" })
            .set(nextRight, { clearProps: "all" })
            .fromTo(nextText, 0.3, { opacity: 0 }, { opacity: 1 });

    }

    function changeAnime(index){
        const hide = document.querySelector(".hide");

        hide.classList.remove("hide");
        animes[index].classList.add("hide");
    }


    // Mouse Scroll Handler

    const throttle = (func, limit) => {
        let inThrottle
        return function () {
            const args = arguments
            const context = this
            if (!inThrottle) {
                func.apply(context, args)
                inThrottle = true
                setTimeout(() => inThrottle = false, limit)
            }
        }
    }

    document.addEventListener("wheel", throttle(scrollChange, 1500));
    document.addEventListener("touchmove", throttle(scrollChange, 1500));

    function scrollChange(e) {
        // console.log(e);

        let scrollPageNumber = currentPageNumber;

        if (e.deltaY < 0) scrollPageNumber = ((scrollPageNumber - 1) + pages.length) % pages.length;
        else scrollPageNumber = (scrollPageNumber + 1) % pages.length;

        const dot = dots[scrollPageNumber];
        changeDots(dot);
        changePage(scrollPageNumber);
        changeAnime(scrollPageNumber);
    }


    //Navbar Handler

    const menu = document.querySelector(".menu");
    const navbar = document.querySelector(".navbar");
    const hiddenmenu = document.querySelector(".hidden");
    const nav = document.querySelector("nav");

    const tl = new TimelineMax({ paused: true, reversed: true });

    tl.to(navbar, 0.3, { opacity: 1, y: "0%" })
        .to(nav, 0.1, {backgroundColor: "black"} , "-=0.2");

    menu.addEventListener("click", function () {
        tl.play();
        menu.classList.add("hidden");
        hiddenmenu.classList.remove("hidden");
    });

    hiddenmenu.addEventListener("click", function() {
        tl.reverse();
        menu.classList.remove("hidden");
        hiddenmenu.classList.add("hidden");
    });
}


init();