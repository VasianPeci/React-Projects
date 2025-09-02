import {useState, useEffect} from "react";

export default function Main() {
    const [meme, setMeme] = useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imageUrl: "http://i.imgflip.com/1bij.jpg"
    });

    const [allMemes, setAllMemes] = useState([]);

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes").then(res => res.json()).then(data => setAllMemes(data.data.memes));
    }, []);

    function handleChange(event) {
        const {value, name} = event.target;
        setMeme(prevMeme => (
            {
                ...prevMeme,
                [name]: value
            }
        ));
    }

    function getMeme() {
        setMeme(prevMeme => ({
            ...prevMeme,
            imageUrl: allMemes[Math.floor(Math.random() * allMemes.length)].url
        }))
    }

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input value={meme.top} onChange={handleChange} type="text" placeholder="One does not simply" name="topText" />
                </label>
                <label>Bottom Text
                    <input value={meme.bottom} onChange={handleChange} type="text" placeholder="Walk into Mordor" name="bottomText" />
                </label>
                <button onClick={getMeme}>Get a new meme image 🖼️</button>
            </div>

            <div className="meme">
                <img src={meme.imageUrl} alt="Meme Image" />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    );
}