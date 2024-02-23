const wrapper = document.querySelector('.wrapper')
const sehirBilgisi = document.getElementById('sehir-bilgisi')

let sehirler=["Adana", "Adıyaman", "Afyon", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
]

sehirler.forEach(sehir =>{
    const option = document.createElement('option')
    option.textContent = sehir
    sehirBilgisi.append(option)
})




// async function getWeather(){
//     let response = await fetch(api)
//     if(response.ok){
//         let data = await response.json()
//         console.log(data)
//     }else{
//         console.log(response.status)
//     }
// }

async function getWeather(city) {
    let key = '00e5b57d10c163d7617146bfd5544134'
    let api = ''
    if(typeof(city) == 'string'){
        api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=tr`
    }else{
        api = `https://api.openweathermap.org/data/2.5/weather?lat=${city.latitude}&lon=${city.longitude}&appid=${key}&units=metric&lang=tr`
    }
    try {
      const response = await axios.get(api);
      ekranaYazdir(response.data);
    } catch (error) {
      console.error(error);
    }
}


function konumaGore(){
    navigator.geolocation.getCurrentPosition(successCallback,errorCallback)
}
konumaGore()


sehirBilgisi.addEventListener('change',()=>{
    getWeather(sehirBilgisi.value)
})

function ekranaYazdir(data){
    wrapper.innerHTML = ''

    let sicaklik = data.main.temp
    let hissedilenSicaklik = data.main.feels_like
    let nem = data.main.humidity
    let bulut = data.weather[0].description
    let resim = data.weather[0].icon
    let card = document.createElement('div')
    card.classList.add('card','p-0','m-auto')
    card.innerHTML = 
    `
    <div class="card-body p-2">
        <div class='d-flex justify-content-between align-items-center'>
            <h5 class="card-title">${data.name}</h5>
            <img src="${resim}.png" class="resim-boyut" alt="...">
        </div>
      
      <p class="card-text">Sıcaklık: ${sicaklik}</p>
      <p class="card-text">Hissedilen sıcaklık: ${hissedilenSicaklik}</p>
      <p class="card-text">Nem oranı: ${nem}</p>
      <p class="card-text">Hava durumu: ${bulut}</p>
      
    </div>
    `
    wrapper.append(card)
}

function successCallback(position){
    getWeather(position.coords)
}

function errorCallback(error){
    console.log(error)
}