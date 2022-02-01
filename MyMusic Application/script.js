console.log("Welcome to MyMusic");
//here we make an array of objects-songs, jiske andr we include key value pairs of songname and filepath of the song

//initialise the variables
let songIndex = 0;//specifies which song is being played, initially 0th song is being played
let audioElement = new Audio('1.mp3');//audioElement.play();
let masterPlay = document.getElementById('masterPlay');//masterplay is our main play circle icon
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');

let songs=[
    {songName: "Tum Se Hi", filePath: "Spotify Clone App/1.mp3", coverPath: "Spotify Clone App/cover_image.jpg"},
    {songName: "Najaa", filePath: "Spotify Clone App/najaa.mp3", coverPath: "Spotify Clone App/cover_image_2.jpg"},
    {songName: "Shubhaarambh", filePath: "Spotify Clone App/shubhaarambh.mp3", coverPath: "Spotify Clone App/cover_image_3.jpg"},
    {songName: "Shayad", filePath: "Spotify Clone App/shayad.mp3", coverPath: "Spotify Clone App/cover_image_4.jpg"},
    {songName: "Khairiyat", filePath: "Spotify Clone App/khairiyat.mp3", coverPath: "Spotify Clone App/cover_image_5.jpg"},
    {songName: "Haareya", filePath: "Spotify Clone App/haareya.mp3", coverPath: "Spotify Clone App/cover_image_6.jpg"}
]

songItems.forEach((element, i)=>{
    console.log(element, i);
    element.getElementByTagName("img")[0].src = songs[i].coverPath;
    element.getElementByClassName("songName")[0].innerText = songs[i].songName;
})

//handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){//means song is not playing rn
        audioElement.play();//mtlb humne check krlia song nhi chl rha, toh ab hum command de rhe hai ki song chlao
        masterPlay.classList.remove('fa-play-circle');//play symbol htao
        masterPlay.classList.add('fa-pause-circle');//pause symbol daalo
        gif.style.opacity = 1;
    }
    //similarly for this
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

//now we will listen an event(time update event)
//we will listen the event on myProgressBar, so at place of document write myProgressBar
//time update is always in audio element
audioElement.addEventListener('timeupdate', ()=>{
    //console.log('timeupdate');//see this timeupdate in consol of inspect element
    //.......ye console waali chise are for ypur understanding
    //update seekbar
    //using parseInt to get only integer values
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    //console.log(progress); .....ye console waali chise are for your understanding
    myProgressBar.value = progress;
})

//now to make functionality of progress bar such that ki agar hum progress bar pe khi bhi click krke aage piche badhae to gaana badh jae acc to our wish
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration / 100);
    //myProgressBar.value--> this is in percentage so we convert it accordingly, see the formula of parseInt

})

//this will make an icon back to play when another icon is pressed to pause, mtlb saare by default play icon hote hai, 
//sivae uske jo play ho rha ho at that instant, vo pause symbol dikhata hai, toh ye function ensure krega ki sirf ek he
//symbol pause state mai ho puri list mai
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.target.classList.remove('fa-pause-circle');
        element.target.classList.add('fa-play-circle');
    })
}

//()=>{} is known as call back function
//to pause and play each song individually in the list
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        //console.log(e.target);//e.target se vo element milega jispe hum click krenge//console function humari understanding ke liye hai bs
        makeAllPlays();
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle')
    })
})