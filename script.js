console.log("welcome to musify");

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterplay');  

let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Can We Kiss Forever - Kina", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "hymn for the weekend - Coldplay", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Mockingbird - Eminem", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Headlights - Alan Walker", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Otnicka - peaky Blinder", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "In The End - Linkin Park", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Tiesto - The Business", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Ilomilo - Billie Eilish", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "In My Mind - Dynoro & Gigi", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Faded - Alan Walker", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"}
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//Handle play/pause click of masterplay button
masterplay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerHTML = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= 9){
        songIndex = 0;
    }
    else{
        songIndex = songIndex + 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerHTML = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    updatePlayPauseIcons();
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = 0;
    }
    else{
        songIndex = songIndex - 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerHTML = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    updatePlayPauseIcons();
})
