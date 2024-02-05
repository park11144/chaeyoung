//TMDB

const API_KEY = 'api_key=key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

const genred = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Comedy"
    },
    {
        "id":35,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
      },
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 10751,
        "name": "Family"
      },
      {
        "id": 14,
        "name": "Fantasy"
      },
      {
        "id": 36,
        "name": "History"
      },
      {
        "id": 27,
        "name": "Horror"
      },
      {
        "id": 10402,
        "name": "Music"
      },
      {
        "id": 9648,
        "name": "Mystery"
      },
      {
        "id": 10749,
        "name": "Romance"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      },
      {
        "id": 10770,
        "name": "TV Movie"
      },
      {
        "id": 53,
        "name": "Thriller"
      },
      {
        "id": 10752,
        "name": "War"
      },
      {
        "id": 37,
        "name": "Western"
      }
]

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const tagsEl = document.getElementById('tags');

const prev = document.getElementById('prev');
const next = document.getElementById('next');
const current = document.getElementById('current');

var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = '';
var totalpages = 100;

var selectedGenre = [];
selectedGenre();
function setGenre() {
    tagsEl.innerHTML= '';
    GeolocationCoordinates.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tags');
        t.id.genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if(selectedGenre.length == 0 ) {
                selectedGenre.push(genre.id);
            }else{
                if(selectedGenre.includes(genre.id)){
                    selectedGenre.forEach((idx, idx)=> {
                        if(id == genre.id) {
                            selectedGenre.splice(idx,1);
                        }
                    })
                }else{
                  selectedGenre.push(genre.id);
                }
        
            }
            console.log(selectedGenre)
            getMovies(API_URL + '&with_genres='+encodeURL(selectedGenre.join(',')))
            highlightSelection()

        })
        tagsEl.append(t);
        
    })
}

function highlightSelection() {
  const tags = document.querySelectorAll('.tag');
  tags.forEach(tag => {
  tags.classList.remove('highlight')
    })
    clearBtn()
    if(selectedGenre.length !=0){
       selectedGenre.forEach(id => {
           const highlightedtag = document.getElementById(id);
           hightlightlightedTag.classList.add('highlight');
    })
  }

}

function clearBtn(){
  let clearBtn = document.getElementById('clear');
  if(clearBtn){
      clearBtn.classList.add('highlight')
  }else{

    let clear = document.createElement('div');
    clear.classList.add('tag','highlight');
    clear.id = 'clear';
    clear.innerText = 'clear x';
    clear.addEventListener('click' , () => {
          selectedGenre = [];
          setGenre();
          getMovies(API_URL);
    })
    tagsEl.append(clear);

  }

}

getMovies(API_URL);

function getMovies(url) {
  lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
      console.log(data.results)
      if(data.results.length !== 0){
          showMovies(data.results);
          currentPage = data.page;
          nextPage = currentPage +1 ;
          prevPage = currentPage -1 ;
          totalpages = data.total_pages;
          
          current.innerText = currentPage;

          if(currentPage <= 1){
            prev.classList.add('disables')
          }
        }
    })
}