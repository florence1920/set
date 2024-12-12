const galleryItems = document.querySelectorAll(".gallery__item");
const reloadBtn = document.querySelector(".reload-button");

let dataArr = [];
let transformedData = {};

async function fetchData() {
  try {
    const response = await fetch("./data/data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! 상태: ${response.status}`);
    }
    dataArr = await response.json();
    transformedData = transformData(dataArr);

    const randomItems = createRandomGallery(transformedData);
    updateGalleryItems(randomItems);
  } catch (error) {
    console.error("JSON을 가져오는 중 오류 발생:", error);
  }
}

function transformData(data) {
  const result = [];

  if (data[0]?.animation) {
    data[0].animation.forEach((anim) => {
      anim.photos?.forEach((photo) => {
        result.push({
          category: "animation",
          title: anim.title,
          photo: photo,
        });
      });
    });
  }

  if (data[1]?.book) {
    data[1].book.forEach((book) => {
      book.photos?.forEach((photo) => {
        result.push({
          category: "book",
          title: book.title,
          photo: photo,
        });
      });
    });
  }

  if (data[2]?.music) {
    data[2].music.forEach((list) => {
      list.songs.forEach((song) => {
        result.push({
          category: "music",
          playlist: list.playlist,
          title: song.title,
          photo: song.photo,
        });
      });
    });
  }

  if (data[3]?.drama) {
    data[3].drama.forEach((drama) => {
      drama.photos?.forEach((photo) => {
        result.push({
          category: "drama",
          title: drama.title,
          photo: photo,
        });
      });
    });
  }

  if (data[4]?.travel) {
    data[4].travel.forEach((travel) => {
      travel.schedule?.forEach((schedule) => {
        if (schedule.gallery && Array.isArray(schedule.gallery)) {
          schedule.gallery.forEach((photo) => {
            result.push({
              category: "travel",
              title: travel.title,
              photo: photo,
            });
          });
        }
      });
    });
  }

  if (data[5]?.etc) {
    data[5].etc.forEach((item) => {
      item.gallery?.forEach((photo) => {
        result.push({
          category: "etc",
          title: item.date,
          photo: photo,
        });
      });
    });
  }

  return result;
}

function getRandomItemsByCategory(data, category, limit) {
  const filteredItems = data.filter((item) => item.category === category); // 카테고리에 맞는 항목만 필터링
  const shuffledItems = shuffleArray(filteredItems); // 항목들을 랜덤으로 섞기
  return shuffledItems.slice(0, limit); // 최대 'limit' 개수만큼 항목 반환
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // 두 항목을 교환
  }
  return array;
}

const categoryLimits = {
  music: 4,
  animation: 4,
  book: 3,
  drama: 4,
  travel: 4,
  etc: 2,
};

function createRandomGallery(data) {
  const randomItems = [];

  // 카테고리별로 랜덤 항목을 추출
  for (const category in categoryLimits) {
    const limit = categoryLimits[category];
    const randomCategoryItems = getRandomItemsByCategory(data, category, limit);
    randomItems.push(...randomCategoryItems); // 랜덤 항목을 결과 배열에 추가
  }

  return shuffleArray(randomItems);
}

function updateGalleryItems(data) {
  data.forEach((item, index) => {
    if (galleryItems[index]) {
      const galleryItem = galleryItems[index];

      const titleElement = galleryItem.querySelector(".gallery__item-title");
      if (titleElement) {
        titleElement.textContent = item.title;
      }

      galleryItem.style.backgroundImage = `url(${item.photo})`;
    }
  });
}

reloadBtn.addEventListener("click", () => {
  const randomItems = createRandomGallery(transformedData);
  updateGalleryItems(randomItems);
});

// 데이터 불러오기
fetchData();
