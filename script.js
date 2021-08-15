let term=''
const songContainer = document.getElementById('songs')//  linking main in HTML
const updateTerm =() =>{
    term = document.getElementById('searchInput').value;
    if(!term || term=='')
    {
        alert("Please Enter a search term")
    }
    else
    {
        //This while is required because if we search one item then search another item, 
        //then the second earch is added below the first search rather than replacing it, hence this while loop replaces the first search
        while(songContainer.firstChild)
        {
            songContainer.removeChild(songContainer.firstChild);
        }

        const url = `https://itunes.apple.com/search?limit=20&media=music&term=${term}`
        fetch(url)//The.then section of the promise handles what to do when a response is resolved
    .then((response) =>
    {
        return response.json()
    })
    .then((data)=>{
    // console.log(data.results);
    const artists = data.results;
    return artists.map(result => {//to insert the values, according to the tags in HTML file 
       
        const article =document.createElement('article'),
            artist =document.createElement('p'),
            song=document.createElement('p'),
            image=document.createElement('img'),
            audio=document.createElement('audio'),
            audioSource=document.createElement('source')
            //Now from the console log see all the values needed and save them in the  elements you need
            artist.innerHTML = result.artistName
            song.innerHTML=result.trackName
            image.src = result.artworkUrl100
            audioSource.src= result.previewUrl
            audio.setAttribute('controls', '')

            article.appendChild(image)
            article.appendChild(artist)
            article.appendChild(song)
            article.appendChild(audio)
            audio.appendChild(audioSource)
            songContainer.appendChild(article)
    })
    })
    .catch(error => console.log('Request failed', error))
        }
    }
    const searchBtn = document.querySelector('button')
    searchBtn.addEventListener('click', updateTerm)
    //below part is necessary because without it if we play two songs, they start together, 
    //without the other being paused, so to pause other we do this
    document.addEventListener('play', event => {
        const audio = document.getElementsByTagName('audio');
        for(let i=0; i<audio.length; i++)
        {
            if(audio[i]!=event.target)
            {
                audio[i].pause();
            }
        }
    }, true)


