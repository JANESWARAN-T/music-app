// Adding the required songs through JSON format
const songData = [
    {
        name: "Attention",
        artist: "Charlie Putt",
        src: "Attention"
    },
    {
        name: "Baby (ft Ludacris)",
        artist: "Justin Bieber",
        src: "Baby (ft Ludacris)"
    },
    {
        name: "Girls Like You (ft. Cardi B)",
        artist: "Maroon 5",
        src: "Girls Like You (ft. Cardi B)"
    }
]

//Variable declerations for the class Elements

const container = document.querySelector(".container")
const songName = document.querySelector(".song-name")
const songArtist = document.querySelector(".song-artist")
const cover = document.querySelector(".cover")
const palyPauseBtn = document.querySelector(".play-pause")
const prevBtn = document.querySelector(".prev-btn")
const nextBtn = document.querySelector(".next-btn")
const audio = document.querySelector(".audio")
const songTime = document.querySelector(".song-time")
const songProgress = document.querySelector(".song-progress")
const coverName = document.querySelector(".cover span:nth-child(2)")
const coverArtist = document.querySelector(".cover span:nth-child(1)")

let songIndex = 0;

//Load Song initial element
window.addEventListener('load', () => {
    loadSong(songIndex)
})


const loadSong = (index) => {
    coverName.textContent = songData[index].name
    coverArtist.textContent = songData[index].artist
    songName.textContent = songData[index].name
    songArtist.textContent = songData[index].artist
    audio.src = `musics/${songData[index].src}.mp3`
}

// Play-Pause functionality
const playSong = () => {
    container.classList.add('pause')
    palyPauseBtn.firstElementChild.className = 'fa-solid fa-pause'
    audio.play()
    cover.classList.add("rotate")
}

const pauseSong = () => {
    container.classList.remove('pause')
    palyPauseBtn.firstElementChild.className = 'fa-solid fa-play'
    audio.pause()
    cover.classList.remove("rotate")
}

palyPauseBtn.addEventListener("click", () => {
    if(container.classList.contains("pause")) {
        pauseSong()
    } else {
        playSong()
    }
}
)

// Prev-song functionality
const prevSongPlay = () => {
    songIndex--
    if(songIndex<0){
        songIndex = songData.length-1
    }
    loadSong(songIndex)
    playSong()
}


// Next-song Functionality
const nextSongPlay = () => {
    songIndex++
    if(songIndex>songData.length-1){
        songIndex = 0
    }
    loadSong(songIndex)
    playSong()
}

//Trigger-Events for previous and next song play
prevBtn.addEventListener("click", prevSongPlay)
nextBtn.addEventListener("click", nextSongPlay)


//Song Progress Bar update
audio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime
    const duration = e.target.duration
    let currentTimeWidth = (currentTime / duration ) *100
    songProgress.style.width = `${currentTimeWidth}%`

    // Showing duration of the songs
    let songCurrentTime = document.querySelector(".time span:nth-child(1)")
    let songDuration = document.querySelector(".time span:nth-child(2)")

    audio.addEventListener("loadeddata", () => {
        let audioDuration = audio.duration

        let totalMins = Math.floor(audioDuration / 60)
        let totalSecs = Math.floor(audioDuration % 60)

        if(totalSecs<10){
            totalSecs = `0${totalSecs}`
        }

        songDuration.textContent = `${totalMins}:${totalSecs}`

    })

    let currentMins = Math.floor(currentTime / 60)
    let currentSecs = Math.floor(currentTime % 60)

    if(currentSecs <10){
        currentSecs = `0${currentSecs}`
    }

    songCurrentTime.textContent = `${currentMins}:${currentSecs}`
})

//Click-Even on progress bar
songTime.addEventListener("click" , (e) => {
    let progressWidth = songTime.clientWidth
    let clickedDiffsetX = e.offsetX
    let songDuration = audio.duration
    audio.currentTime = (clickedDiffsetX / progressWidth) * songDuration
    playSong()
}) 

audio.addEventListener("ended", nextSongPlay)

