import { Sidebar } from "./componentes/sidebar"
import {TwitterForm} from './componentes/TwitteForm'
import { Tweet } from "./componentes/Tweet"
import {v4} from "uuid"
import { getAvatar, getRandomImage } from "./utils/generateimages"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"


function App() {
    const [tweets, setTweets] = useState([])

    useEffect(() => {
      const interval = setInterval(() => {
        addNewRandomTweets()
      }, 9000)
      return () => clearInterval()
    }, [])
  
    const addNewRandomTweets = () => {
      const randomTweets = [
        'Acabei de entrar no clone do Twitter! Aqui não vai ter bloqueio',
        'Faz o L',
        'Sem o X eu nem sabia que ja tinha começado o Rock in Rio',
        'Quero um aumentoooo',
      ]

      const randomTweet = randomTweets[Math.floor(Math.random() * randomTweets.length)]

      addNewTweet(randomTweet, Math.random() > 0.7)
    }
    const addNewTweet = (content, includeImage = false) => {
      const newTweet = {
        id: v4(),
        name: "User",
        username: `user${Math.floor(Math.random()* 1000)}`,
        avatar: getAvatar(`user${Math.floor(Math.random()* 1000)}@email.com`),
        content,
        time: new Date().toLocaleString([],{
          hour: '2-digit',
          minute: '2-digit'
      }),
      image: includeImage ? getRandomImage() : null,
      likes: 0,
      retweets: 0,
      comments: 0
      }

      setTweets((prevTweets) => [newTweet, ...prevTweets])
 
    }

  return (
    
      <div className="flex mx-auto max-w-7xl">
       <Sidebar/>
       <main className="flex-grow border-l border-r border-gray-700 max-w-xl">
        <header className="sticky top-0 z-10 bg-twiter-background bg-opacity-80 backdrop-blur"> 
         
          <h2 className="px-4 py-3 text-xl font-bold">Para Você</h2>
        </header>
        <TwitterForm onTweet={(content)=> addNewTweet(content, Math.random() > 0.6)}/>
        <div>
          {tweets.map(tweet =>(<Tweet key={tweet.id} tweet={tweet}/>))}
          
        </div>

       </main>
       <aside className="hidden xl:block w-80 px-4">
        <div className="sticky top-0 pt-2">
          <div className="relative">
            <FontAwesomeIcon icon={faSearch} className="absolute top-3 left-3 text-gray-500"/>
            <input type="text" placeholder="Pesquisar" className="w-full bg-gray-800 rounded-full outline-none py-2 pl-10 pr-4 text-white" />
          </div>

          <div className="bg-gray-800 rounded-xl mt-4 p-4">
            <h2 className="font-bold text-xl mb-4">
              Seja Premium
            </h2>
            <p className="text-gray-500 mb-4">Seja premium para desbloquear novas funções e ganhar um selo de verificação</p>
            <button className="bg-twitter-blue text-white py-2 px-4 rounded-full hpver:bg-blue-600" >Assinar</button>
          </div>
        </div>
       </aside>
      </div>
    
  )
}

export default App
