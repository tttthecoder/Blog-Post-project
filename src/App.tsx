import { ReactNode, useEffect, useState } from "react";
import BlogPosts, { type BlogPost } from "./components/BlogPosts";
import { get } from "./http";
import fetchingImage from '../src/assets/data-fetching.png'
import ErrorMessage from "./components/ErrorMessage";

type rawPost = {
  userId: number,
  id: number,
  title: string,
  body: string,
}

function App() {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>()
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  useEffect(
    () => {
      async function fetchData() {
        setIsFetching(true)
        try {
          // fetch data after mounting and re-render accordingly.
          const data = await get('https://jsonplaceholder.typicode.com/posts') as rawPost[]
          const blogPosts = data.map((post) => {
            return {
              id: post.id,
              title: post.title,
              text: post.body
            }
          }
          )
          setFetchedPosts(blogPosts);
        } catch (e) {
          setError((e as Error).message)
        }
        setIsFetching(false)
      }
      fetchData()
    }
    , [])
  let content: ReactNode
  if (isFetching) {
    content = <p id="loading-fallback">Fetching posts...</p>
  }
  if (fetchedPosts) {
    content = <BlogPosts posts={fetchedPosts} />
  }
  if (error) {
    content = <ErrorMessage text={error} />
  }
  return <main>
    <img src={fetchingImage} alt="An abstract image depicting a data fetching process." />
    {content}
  </main>;
}

export default App;
