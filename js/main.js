const getElement = (tagName, classNames, attributes) => {
  const element = document.createElement(tagName);
  if (classNames) {
    element.classList.add(...classNames);
  }
  if (attributes) {
    for (const attribute in attributes) {
      element[attribute] = attributes[attribute];
    }
  }
  return element;
};

const createHeader = ({ title, header: { logo, menu, social } }) => {
  const header = getElement("header");
  const container = getElement("div", ["container"]);
  const wrapper = getElement("div", ["header"]);

  if (logo) {
    const logoElem = getElement("img", ["logo"], {
      src: logo,
      alt: "Логотип " + title,
    });
    wrapper.append(logoElem);
  }

  if (social) {
    const socialWrapper = getElement("div", ["social"]);
    const allSocial = social.map((item) => {
      const socialLink = getElement("a", ["social-link"]);
      socialLink.append(
        getElement("img", [], {
          src: item.image,
          alt: item.title,
        })
      );

      socialLink.href = item.link;

      return socialLink;
    });
    socialWrapper.append(...allSocial);
    wrapper.append(socialWrapper);
  }

  if (menu) {
    //homework
    const nav = getElement("nav", ["menu-list"]);
    const allMenuLink = menu.map((item) => {
      const Link = getElement("a", ["menu-link"], {
        href: item.link,
        textContent: item.title,
      });
      return Link;
    });
    nav.append(...allMenuLink);
    wrapper.append(nav);
    const menuBtn = getElement("button", ["menu-button"]);
    menuBtn.addEventListener("click", () => {
      menuBtn.classList.toggle("menu-button-active");
      wrapper.classList.toggle("header-active");
    });
    container.append(menuBtn);
  }

  header.append(container);
  container.append(wrapper);
  return header;
};

const createMain = ({
  title,
  main: { genre, rating, description, trailer, slider },
}) => {
  const main = getElement("main");
  const container = getElement("div", ["container"]);
  main.append(container);
  const wrapper = getElement("div", ["main-content"]);
  container.append(wrapper);
  const content = getElement("div", ["content"]);
  wrapper.append(content);

  if (genre) {
    const genreSpan = getElement("span", ["genre", "animated", "fadeInRight"], {
      textContent: genre,
    });
    content.append(genreSpan);
  }

  if (rating) {
    const ratingBlock = getElement("div", [
      "rating",
      "animated",
      "fadeInRight",
    ]);
    const ratingStars = getElement("div", ["rating-stars"]);
    const ratingNumber = getElement("div", ["raing-number"], {
      textContent: `${rating}/10`,
    });

    for (let i = 0; i < 10; i++) {
      const star = getElement("img", ["star"], {
        alt: i ? "" : `Рейтинг ${rating} из 10`,
        src: !i || i < rating ? "img/star.svg" : "img/star-o.svg",
      });
      ratingStars.append(star);
    }
    ratingBlock.append(ratingStars, ratingNumber);
    content.append(ratingBlock);
    content.append(
      getElement("h1", ["main-title", "animated", "fadeInRight"], {
        textContent: title,
      })
    );

    if (description) {
      const descriptionElem = getElement(
        "p",
        ["main-description", "animared", "fadeInRight"],
        { textContent: description }
      );
      content.append(descriptionElem);
    }

    if (trailer) {
      const youtubeLink = getElement(
        "a",
        ["button", "animated", "fadeInRight", "youtube-modal"],
        {
          href: trailer,
          textContent: "Смотреть трейлер",
        }
      );

      const youtubeImgLink = getElement("a", ["play", "youtube-modal"], {
        href: trailer,
      });
      const iconPlay = getElement("img", ["play-img"], {
        src: "img/play.svg",
        alt: "",
        ariaHidden: true,
      });
      content.append(youtubeLink);
      youtubeImgLink.append(iconPlay);
      wrapper.append(youtubeImgLink);
    }
  }
  if (slider) {
    const sliderBlock = getElement("div", ["series"]);
    const swiperBlock = getElement("div", ["swiper-container"]);
    const swiperWrapper = getElement("div", ["swiper-wrapper"]);
    const arrow = getElement("button", ["arrow"]);

    const slides = slider.map((item) => {
      const swiperSlide = getElement("div", ["swiper-slide"]);
      const card = getElement("figure", ["card"]);
      const cardImage = getElement("img", ["card-img"], {
        src: item.img,
        alt: (
          (item.title ? item.title + "  " : "") +
          (item.subtitle ? item.subtitle : "")
        ).trim(),
      });
      card.append(cardImage);

      if (item.title || item.subtitle) {
        const cardDescription = getElement("figcaption", ["card-description"]);
        cardDescription.innerHTML = `
        ${item.subtitle ? `${item.subtitle}` : ""}
        ${item.title ? `${item.title}` : ""}
        `;
        card.append(cardDescription);
      }
      swiperSlide.append(card);
      return swiperSlide;
    });
    swiperWrapper.append(...slides);
    swiperBlock.append(swiperWrapper);
    sliderBlock.append(swiperBlock, arrow);
    container.append(sliderBlock);
    new Swiper(swiperBlock, {
      loop: true,
      navigation: {
        nextEl: arrow,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        541: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
      },
    });
  }

  return main;
};
//favicon - homework
// const link = document.createElement("link");
// link.type = "image/png";
// link.rel = "shortcut icon";
// link.href = "witcher/logo.png";
// document.getElementsByTagName("head")[0].appendChild(link);

const movieConstructor = (selector, options) => {
  const app = document.querySelector(selector);
  app.classList.add("body-app");

  app.style.color = options.fontColor || "";
  app.style.backgroundColor = options.backgroundColor || "";

  if (options.subColor) {
    document.documentElement.style.setProperty("--sub-color", options.subColor);
  }
  app.style.backgroundImage = options.background
    ? `url("${options.background}")`
    : "";
  document.title = options.title;

  if (options.favicon) {
    const index = options.favicon.lastIndexOf(".");
    const type = options.favicon.substring(index + 1);

    const favicon = getElement("link", null, {
      rel: "icon",
      href: options.favicon,
      type: "image/ " + (type === "svg" ? "svg-xml" : type),
    });
    document.head.append(favicon);
  }

  if (options.header) {
    header = createHeader(options);
    app.append(header);
  }

  if (options.main) {
    app.append(createMain(options));
  }
};

movieConstructor(".app", {
  title: "Локи",
  favicon: "loki/favicon.png",
  fontColor: "#ffffff",
  backgroundColor: "#00000",
  subColor: "#206",
  background: "loki/background.jpg",
  header: {
    logo: "loki/logo.png",
    social: [
      { title: "Twitter", link: "#", image: "witcher/social/twitter.svg" },
      {
        title: "facebook",
        link: "#",
        image: "witcher/social/facebook.svg",
      },
      {
        title: "Instagram",
        link: "#",
        image: "witcher/social/instagram.svg",
      },
    ],
    menu: [
      { title: "Описание", link: "#" },
      { title: "Трейлер", link: "#" },
      { title: "Отзывы", link: "#" },
    ],
  },
  // main: {
  //   genre: "2019, Fantasy",
  //   rating: "8",
  //   description: `Ведьмак Геральт, мутант и убийца чудовищ, на своей верной лошади по кличке Плотва путешествует по Континенту. За тугой
  //   мешочек чеканных монет этот мужчина избавит вас от всякой настырной нечисти — хоть от чудищ болотных, оборотней и даже
  //   заколдованных принцесс.`,
  //   trailer: "https://www.youtube.com/watch?v=P0oJqfLzZzQ",
  //   slider: [
  //     {
  //       img: "witcher/series/series-1.jpg",
  //       title: "Начало конца",
  //       subtitle: "Серия №1",
  //     },
  //     {
  //       img: "witcher/series/series-2.jpg",
  //       title: "Четыре марки",
  //       subtitle: "Серия №2",
  //     },
  //     {
  //       img: "witcher/series/series-3.jpg",
  //       title: "Предательская луна",
  //       subtitle: "Серия №3",
  //     },
  //     {
  //       img: "witcher/series/series-4.jpg",
  //       title: "Банкеты, ублюдки и похороны",
  //       subtitle: "Серия №4",
  //     },
  //   ],
  main: {
    genre: "2021, фантастика, фэнтези, боевик, приключения",
    rating: "8",
    description:
      "Локи попадает в таинственную организацию «Управление временными изменениями» после того, как он украл Тессеракт, и путешествует во времени, меняя историю.",
    trailer: "https://youtu.be/YrjHcYqe31g",
    slider: [
      {
        img: "loki/series/series-1.jpg",
        title: "Славная миссия",
        subtitle: "Серия №1",
      },
      {
        img: "loki/series/series-2.jpg",
        title: "Вариант",
        subtitle: "Серия №2",
      },
      {
        img: "loki/series/series-3.jpg",
        title: "Ламентис",
        subtitle: "Серия №3",
      },
      {
        img: "loki/series/series-4.jpg",
        title: "Смежное событие",
        subtitle: "Серия №4",
      },
      {
        img: "loki/series/series-5.jpg",
        title: "Путешествие в неизвестность",
        subtitle: "Серия №5",
      },
      {
        img: "loki/series/series-6.jpg",
        title: "На все времена. Всегда",
        subtitle: "Серия №6",
      },
    ],
  },
});
